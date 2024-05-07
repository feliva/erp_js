import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PickListModule} from 'primeng/picklist';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {MessageService} from 'primeng/api';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DropdownModule} from "primeng/dropdown";
import {AnimateOnScrollModule} from "primeng/animateonscroll";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    InputTextModule,
    ButtonModule,
    PickListModule,
    PasswordModule,
    RadioButtonModule,
    InputMaskModule,
    CalendarModule,
    PanelModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    DropdownModule,
    AnimateOnScrollModule,
    AvatarModule,
    BadgeModule
    //BreadcrumbModule// não funciona nao atualiza
  ],
  providers:[MessageService]
})
export class PrimeNGAppUse { }
