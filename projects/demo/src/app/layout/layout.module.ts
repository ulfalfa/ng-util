import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LayoutRoutingModule } from './layout-routing.module'

import { UsLayoutModule } from '@ulfalfa/ng-util'
import { MasonryComponent } from './masonry/masonry.component'

@NgModule({
  declarations: [MasonryComponent],
  imports: [CommonModule, LayoutRoutingModule, UsLayoutModule],
})
export class LayoutModule {}
