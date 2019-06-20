import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormsModule as NgFormsModule,
  ReactiveFormsModule,
} from '@angular/forms'

import { MatSelectModule } from '@angular/material/select'

import { FlexLayoutModule } from '@angular/flex-layout'

import { UsFormsModule } from '@ulfalfa/ng-util'
import { FormsRoutingModule } from './forms-routing.module'
import { FormsComponent } from './forms/forms.component'

@NgModule({
  declarations: [FormsComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    NgFormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UsFormsModule.forFeature([]),
  ],
})
export class FormsModule {}
