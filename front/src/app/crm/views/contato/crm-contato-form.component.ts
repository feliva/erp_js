import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import {FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {EditorModule} from "primeng/editor";
import {AutoCompleteModule} from "primeng/autocomplete";
import {Contato} from "../../../model/Contato";
import {ReactMessageValidationComponent} from "../../../shared/message-validation/react-message-validation.component";
import {InputMaskModule} from "primeng/inputmask";
import {CrmContatoService} from "../services/crm-contato.service";
import {Location} from "@angular/common";
import {FormOperacoesComuns} from "../../../shared/FormOperacoesComuns";
import {FiltroServices} from "../../../service/FiltroServices";

@Component({
  selector: 'crm-contato-form',
  template: `
    <div>
      <p-panel header="{{labelForm}} Contato">
        <form autocomplete="off" [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <app-react-message-validation >
                <label>Nome</label>
                <input pInputText type="text" formControlName="nome" class="full">
              </app-react-message-validation>
            </div>
            <div class="field col-12 md:col-6">
              <app-react-message-validation >
                <label>E-mail</label>
                <input pInputText type="email" class="full"  formControlName="email"/>
              </app-react-message-validation>
            </div>
            <div class="field col-12 md:col-6">
              <app-react-message-validation>
                <label>Celular</label>
                <p-inputMask mask="(99) 9999-9999" formControlName="celular" placeholder="(99) 9999-9999" />
              </app-react-message-validation>
            </div>
          </div>
          <div class="grid mt-2 ">
            <div class="col-fixed">
              <p-button [raised]="true" type="submit" [disabled]="!formGroup.valid">
                <i class="pi pi-check mr-2"></i>
                <span>Enviar</span>
              </p-button>
            </div>
            <div class="col-fixed">
              <p-button severity="secondary" [raised]="true" (onClick)="onCancelarForm($event)">
                <i class="pi pi-times mr-2"></i>
                <span>Cancelar</span>
              </p-button>
            </div>
          </div>
        </form>
      </p-panel>
    </div>
  `,
  styles: [`

  `],
  standalone: true,
  imports: [
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ReactMessageValidationComponent,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    EditorModule,
    AutoCompleteModule,
    InputMaskModule
  ],
})
export class CrmContatoFormComponent extends FormOperacoesComuns<Contato> implements OnInit {

  contatoService:CrmContatoService = inject(CrmContatoService);

  constructor(private location: Location) {
    super();
  }

  carregaDadosForm():void {
  }

  public override getService(): FiltroServices<Contato> {
    return this.contatoService;
  }

  getUrlOnCancelarForm():string{
    return '/crm/contato/listar';
  }

  getMensagemSucessoSubmit():string{
    return 'Contato salvo com sucesso.';
  }

  public inicializaFormGroup(entity:Contato|undefined){
      this.formGroup = Contato.createFormGoup((entity?entity:new Contato()) as Contato);
  }

  ngOnInit() {
    this.init();
  }
}
