import { Component, OnInit } from '@angular/core'

import { FormBuilder, FormGroup } from '@angular/forms'

import { safeLoad } from 'js-yaml'

import {
  DynamicFormControl,
  FormbuilderService,
  DynamicFormGroup,
} from '@ulfalfa/ng-util'

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  data = {
    textfield: 'HELLO WORD',
  }

  controlSets = [
    [
      {
        type: 'text',
        id: 'textfield',
        label: 'SimpleFormField',
        required: true,
        pattern: /[a-z].*/,
      },
    ],
    [
      {
        type: 'text',
        id: 'textfield',
        label: 'Singlefield',
        required: true,
        pattern: /[a-z].*/,
      },
      {
        type: 'tags',
        id: 'mytags',
        label: 'Enter tags',
        required: true,
        values: ['test', 'hello', 'world'],
        default: [],
      },
      {
        label: 'Expandable Group',
        type: 'group',
        expandable: true,
        controls: [
          {
            id: 'counter',
            type: 'number',
            label: 'Item Count',
          },
        ],
      },
      {
        label: '2. Expandable Group',
        type: 'group',
        expandable: true,
        controls: [
          {
            id: 'counter',
            type: 'number',
            label: 'Item Count',
            flex: 100,
          },
        ],
      },
      {
        id: 'group',
        type: 'group',
        label: 'Non Expandable Group With Label',

        controls: [
          {
            id: 'test',
            type: 'string',
            // values: ['Ein', 'Zwei', 'Drei'],
            label: 'TESTINPUT',
            flex: 50,
          },
          {
            id: 'check',
            type: 'boolean',
            label: 'Check!',
            flex: 50,
          },
        ],
      },
      {
        id: 'group2',
        type: 'group',

        controls: [
          {
            id: 'test',
            type: 'string',
            // values: ['Ein', 'Zwei', 'Drei'],
            label: 'TESTINPUT',
            flex: 100,
          },
          {
            id: 'check',
            type: 'boolean',
            label: 'Check!',
          },
        ],
      },
      {
        type: 'array',
        id: 'topics',
        min: 2,
        max: 5,
        label: 'Topics',
        controls: [
          {
            id: 'topic',
            label: 'Topic',
            type: 'string',
            flex: 80,
            required: true,
          },
          {
            id: 'hide',
            type: 'boolean',
            label: 'Hidden',
          },
        ],
      },
    ],
  ]

  _form: FormGroup
  set form(val: FormGroup) {
    if (val) {
      this._form = val
    }
  }
  get form(): FormGroup {
    return this._form
  }
  constructor(protected fb: FormBuilder, protected fbs: FormbuilderService) {}

  ngOnInit() {}

  formChanged(form: FormGroup) {
    form.valueChanges.subscribe(data => {
      console.log('Form', form.value)
    })
  }
}
