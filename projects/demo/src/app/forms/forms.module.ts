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
import { TestcontrolComponent } from './testcontrol/testcontrol.component'

@NgModule({
  declarations: [FormsComponent, TestcontrolComponent],
  entryComponents: [TestcontrolComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    NgFormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UsFormsModule.forFeature([TestcontrolComponent]),
  ],
})
export class FormsModule {}
