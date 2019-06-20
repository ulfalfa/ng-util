import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from './forms/forms.module';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/forms',
    pathMatch: 'full',
  },
  {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
