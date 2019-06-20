import {
  NgModule,
  ModuleWithProviders,
  Type,
  InjectionToken,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatExpansionModule,
  MatChipsModule,
  MatAutocompleteModule,
} from '@angular/material'

import { ControlComponent } from './components/control/control.component'
import { ArrayComponent } from './components/array/array.component'
import { GroupComponent } from './components/group/group.component'
import { MaterialFormComponent } from './components/material-form/material-form.component'

import {
  HA4US_FORM_CONTROLS,
  FormbuilderService,
} from './services/formbuilder.service'
import { DynamicControlComponent } from './components/dynamic-control/dynamic-control.component'
import { TagInputComponent } from './components/tag-input/tag-input.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
  declarations: [
    ControlComponent,
    ArrayComponent,
    GroupComponent,
    MaterialFormComponent,
    DynamicControlComponent,
    TagInputComponent,
  ],
  exports: [
    MaterialFormComponent,
    ControlComponent,
    GroupComponent,
    ArrayComponent,
    TagInputComponent,
  ],
  entryComponents: [TagInputComponent],
  providers: [
    {
      provide: HA4US_FORM_CONTROLS,
      useValue: [TagInputComponent],
      multi: true,
    },
  ],
})
export class UsFormsModule {
  static forProvider(controls: Type<any>[] = []): ModuleWithProviders {
    return {
      ngModule: UsFormsModule,
      providers: [
        {
          provide: HA4US_FORM_CONTROLS,
          useValue: controls,
          multi: true,
        },
      ],
    }
  }
  static forFeature(controls: Type<any>[] = []): ModuleWithProviders {
    return {
      ngModule: UsFormsModule,
      providers: [
        {
          provide: HA4US_FORM_CONTROLS,
          useValue: controls,
          multi: true,
        },
        FormbuilderService,
      ],
    }
  }
}
