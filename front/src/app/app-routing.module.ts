import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'us/',loadChildren: () => import('./us/us.module').then(m => m.UsModule)},
  {path:'user/', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
