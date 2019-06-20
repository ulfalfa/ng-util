import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MasonryComponent } from './masonry/masonry.component'
const routes: Routes = [
  {
    path: '',
    component: MasonryComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
