import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ComponentFactory,
  ViewContainerRef,
  ViewChild,
  forwardRef,
  ComponentRef,
  Optional,
  Host,
  Self,
} from '@angular/core'

import {
  ControlValueAccessor,
  DefaultValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms'

import { DynamicFormControl } from '../../models/forms'

import { FormbuilderService } from '../../services/formbuilder.service'

@Component({
  selector: 'us-dynamic-control',
  templateUrl: './dynamic-control.component.html',
  styleUrls: ['./dynamic-control.component.scss'],
  providers: [
    /* {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicControlComponent),
      multi: true,
    },*/
  ],
})
export class DynamicControlComponent implements OnInit, ControlValueAccessor {
  @Input() control: DynamicFormControl

  @ViewChild('controlplaceholder', { read: ViewContainerRef })
  vcr: ViewContainerRef
  componentRef: any

  component: any

  constructor(
    protected resolver: ComponentFactoryResolver,
    protected fbs: FormbuilderService,
    @Optional() protected ngControl: NgControl
  ) {
    if (ngControl) {
      this.ngControl.valueAccessor = this
    }
  }

  ngOnInit() {
    if (this.control) {
      const descriptor = this.fbs.getCustomControl(this.control)

      const componentFactory: ComponentFactory<
        any
      > = this.resolver.resolveComponentFactory(descriptor.component)

      const componentRef: ComponentRef<
        DefaultValueAccessor
      > = this.vcr.createComponent(componentFactory)

      this.component = componentRef.instance

      if (descriptor.param) {
        this.component[descriptor.param] = descriptor.value
      }

      componentFactory.inputs.forEach(input => {
        if (this.control.hasOwnProperty(input.propName)) {
          this.component[input.propName] = this.control[input.propName]
        }
      })
    }
  }
  public writeValue(value: string) {}
  public registerOnChange(fn) {}
  public registerOnTouched(fn) {}
  public setDisabledState(isDisabled: boolean) {}
}
