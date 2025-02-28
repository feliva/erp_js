import {Routes} from '@angular/router';


export const APP_ROUTES: Routes = [
  {path:'crm/contato', loadChildren: () => import('./crm/views/contato/contato.router').then(m => m.BUILDER_MENU_CONTATO.getRoutes())},
  {path:'crm/empresa', loadChildren: () => import('./crm/views/empresas/empresas.router').then(m => m.BUILDER_MENU_EMPRESAS.getRoutes())},
  {path:'', loadChildren: () => import('./minhaEmpresa/minhaEmpresa.router').then(m => m.BUILDER_MENU_MINHA_EMPRESA.getRoutes())},

];
