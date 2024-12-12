import {importProvidersFrom, NgModule} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports:[
  ],
  providers:[MessageService,ConfirmationService]
})
export class PrimeNGAppUse { }
