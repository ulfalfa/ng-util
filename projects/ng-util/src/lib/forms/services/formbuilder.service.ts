import {
  Injectable,
  Optional,
  Inject,
  InjectionToken,
  Type,
} from '@angular/core'

import {
  ControlContainer,
  FormControl,
  AbstractControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  FormArray,
  Validators,
  ValidatorFn,
  FormBuilder,
  ValidationErrors,
} from '@angular/forms'

import {
  DynamicForm,
  DynamicFormControl,
  DynamicFormGroup,
  DynamicFormArray,
} from '../models/forms'
// @dynamic
export const HA4US_FORM_CONTROLS: InjectionToken<string> = new InjectionToken(
  'Ha4usFormControls',
  {
    providedIn: 'root',
    factory: () => {
      const result = []
      return result
    },
  }
)

import {
  METADATA_KEY,
  PARAM_MATCH,
  DynamicFormControlDescription,
} from './form.decorator'
// @dynamic
@Injectable({ providedIn: 'root' })
export class FormbuilderService {
  static count = 0

  validationMessages: any = {}

  controlDict = new Map<string, DynamicFormControlDescription>()
  constructor(
    protected fb: FormBuilder,
    @Optional()
    @Inject(HA4US_FORM_CONTROLS)
    customControls: Type<any>[][]
  ) {
    this.registerControls(customControls)
  }

  registerControls(customControlsSet: Type<any>[][]) {
    customControlsSet.forEach((set: Type<any>[]) =>
      set.forEach(control => {
        const metadata = Reflect.get(control, METADATA_KEY)
        if (!metadata) {
          throw new Error(`No metadata for control ${control.name}`)
        }

        this.controlDict.set(metadata.name, {
          param: metadata.param,
          component: control,
        })
      })
    )
  }

  control(
    formDefinition: DynamicFormControl,
    parent: FormGroup,
    data?: any
  ): FormControl {
    const validators: ValidatorFn[] = []

    if (formDefinition.required === true) {
      validators.push(Validators.required)
    }

    const control = this.fb.control(data || formDefinition.default, validators)

    if (parent) {
      parent.setControl(formDefinition.id, control)
    }

    return control
  }

  group(
    groupDefinition: DynamicFormGroup,
    parent: FormGroup,
    data: any
  ): FormGroup {
    let group: FormGroup

    if (groupDefinition.id && parent.contains(groupDefinition.id)) {
      group = parent.get(groupDefinition.id) as FormGroup
      data = data && data[groupDefinition.id]
    } else {
      if (groupDefinition.id) {
        group = new FormGroup({})
        parent.addControl(groupDefinition.id, group)
        data = data && data[groupDefinition.id]
      } else {
        group = parent
      }
    }

    this.form(groupDefinition.controls, group, data)

    return group
  }

  newArrayGroup(controls: DynamicFormControl[], data?: any) {
    const group = new FormGroup({})
    controls.forEach(control => {
      this.control(control, group, data && data[control.id])
    })
    return group
  }

  array(
    arrayDefinition: DynamicFormArray,
    parent: FormGroup,
    data?: any[]
  ): FormArray {
    const formArray = new FormArray([])

    if (data) {
      for (const item of data) {
        formArray.push(this.newArrayGroup(arrayDefinition.controls, item))
      }
    } else {
      arrayDefinition.min = arrayDefinition.min || 1
      for (let i = 0; i < arrayDefinition.min; i++) {
        formArray.push(this.newArrayGroup(arrayDefinition.controls))
      }
    }

    parent.setControl(arrayDefinition.id, formArray)

    return formArray
  }

  form(formDefinition: DynamicForm, parent?: FormGroup, data?: any): FormGroup {
    parent = parent || new FormGroup({})

    formDefinition.forEach(formElement => {
      switch (formElement.type) {
        case 'group':
          this.group(formElement as DynamicFormGroup, parent, data)
          break
        case 'array':
          this.array(
            formElement as DynamicFormArray,
            parent,
            data && data[formElement.id]
          )
          break
        default:
          this.control(
            formElement as DynamicFormArray,
            parent,
            data && data[formElement.id]
          )
      }
    })

    return parent
  }

  getCustomControl(config: DynamicFormControl): DynamicFormControlDescription {
    const match = PARAM_MATCH.exec(config.type)

    if (!match) {
      throw new Error(`control of type ${config.type} does not exist`)
    }
    const [_, name, param] = match

    const description = this.controlDict.get(name)
    if (!description) {
      throw new Error(`control of type ${name} does not exist`)
    }

    description.value = param
    return description
  }

  getErrors(container: FormGroup): any {
    let messages = {}
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey]
        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {
          const childMessages = this.getErrors(c)
          messages = { ...messages, ...childMessages }
        } else {
          // Oly validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = ''
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] +=
                    this.validationMessages[controlKey][messageKey] + ' '
                }
              })
            }
          }
        }
      }
    }
    return messages
  }
}
