import {
  Component,
  Optional,
  Host,
  Self,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  ControlContainer,
} from '@angular/forms'

import { ReplaySubject } from 'rxjs'

import { DynamicForm, DynamicFormGroup } from '../../models/forms'
import { FormbuilderService } from '../../services/formbuilder.service'
import Debug from 'debug'
const debug = Debug('ha4us:material:form')

@Component({
  selector: 'us-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss'],
  exportAs: 'ha4usMatForm',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MaterialFormComponent implements OnInit {
  _controls: DynamicFormGroup[]
  @Input()
  set controls(val: DynamicFormGroup[]) {
    if (val && val.length > 0) {
      this._controls = val
      this.form = this.controlContainer.control as FormGroup

      this.cdr.detectChanges()
    }
  }

  @Input() data: any

  form: FormGroup = new FormGroup({})

  constructor(
    @Host() protected controlContainer: ControlContainer,
    protected cdr: ChangeDetectorRef,
    protected fbs: FormbuilderService
  ) {}

  ngOnInit() {}
}
