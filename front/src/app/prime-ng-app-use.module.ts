import {NgModule} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService, DynamicDialogConfig} from "primeng/dynamicdialog";

@NgModule({
  declarations: [],
  imports: [
  ],
  exports:[
  ],
  providers:[MessageService,ConfirmationService,DialogService, DynamicDialogConfig]
})
export class PrimeNGAppUse { }
