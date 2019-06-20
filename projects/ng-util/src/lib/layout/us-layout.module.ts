import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { CardGridComponent } from './card-grid/card-grid.component'

import { CardComponent } from './card/card.component'

import { MasonryComponent } from './masonry/masonry.component'
import { MasonryItemDirective } from './masonry/masonry-item.directive'
import { PopupDirective } from './popup/popup.directive'
import { PortalDirective } from './popup/popup-portal.directive'
@NgModule({
  declarations: [
    CardGridComponent,
    CardComponent,
    PopupDirective,
    PortalDirective,
    MasonryComponent,
    MasonryItemDirective,
  ],
  imports: [CommonModule, OverlayModule, PortalModule],
  exports: [
    CardGridComponent,
    CardComponent,
    PopupDirective,
    PortalDirective,
    MasonryComponent,
    MasonryItemDirective,
  ],
})
export class UsLayoutModule {}
