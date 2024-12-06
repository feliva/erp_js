import {
    Component,
    inject,
    OnInit
} from '@angular/core';
import {
    EmailValidator,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
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
import {forkJoin} from "rxjs";
import {CidadeService} from "../../../service/cidade.service";
import {Cidade, Estado} from "../../../model/Cidade";
import {Empresa} from "../../../model/Empresa";
import {CrmEmpresaService} from "../services/crm-empresa.service";

@Component({
    selector: 'crm-contato-form',
    template: `
        <div>
            <p-panel header="{{labelForm}} Empresa">
                <form autocomplete="off" [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>Nome Fantasia</label>
                                <input pInputText type="text" formControlName="nomeFantasia" class="full">
                            </app-react-message-validation>
                        </div>
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>E-mail</label>
                                <input pInputText type="email" class="full" formControlName="email"/>
                            </app-react-message-validation>
                        </div>
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>Razão Social</label>
                                <input pInputText type="text" formControlName="razaoSocial"/>
                            </app-react-message-validation>
                        </div>
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>Telefone</label>
                                <p-inputMask mask="(99)99999-9999"   formControlName="telefone" />
                            </app-react-message-validation>
                        </div>
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>Inscrisão Estadual</label>
                                <input pInputText type="text" formControlName="inscricaoEstadual"/>
                            </app-react-message-validation>
                        </div>                        
                    </div>
                    <div class="formgrid grid" formGroupName="endereco">
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>Cep</label>
                                <input pInputText type="text" formControlName="cep"/>
                            </app-react-message-validation>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label>Estado</label>
                            <p-dropdown [options]="listEstados" formControlName="estado" optionLabel="nome"
                                        (onChange)="changeEstado($event.value)"/>
                        </div>
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>Cidade</label>
                                <p-dropdown [options]="listCidades" formControlName="cidade" optionLabel="nome"
                                            [filter]="true"
                                            filterBy="nome" placeholder=""/>
                            </app-react-message-validation>
                        </div>
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>Bairro</label>
                                <input pInputText type="text" formControlName="bairro"/>
                            </app-react-message-validation>
                        </div>
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>Logradouro</label>
                                <input pInputText type="text" formControlName="logradouro"/>
                            </app-react-message-validation>
                        </div>
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>Numero</label>
                                <input pInputText type="text" formControlName="numero"/>
                            </app-react-message-validation>
                        </div>
                        <div class="field col-12 md:col-6">
                            <app-react-message-validation>
                                <label>Complemento</label>
                                <input pInputText type="text" formControlName="complemento"/>
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
export class CrmEmpresasFormComponent extends FormOperacoesComuns<Empresa> implements OnInit {

    serviceF: CrmEmpresaService = inject(CrmEmpresaService);
    cidadeService: CidadeService = inject(CidadeService);

    estado: Estado | undefined;
    listCidades: Cidade[] = [];
    listEstados: Estado[] = [];

    constructor(private location: Location) {
        super();
    }

    changeEstado(estado: Estado | undefined) {
        console.log(estado)
        this.cidadeService.listAllByEstado(estado?.idEstado).subscribe(data => {
            this.listCidades = data;
        });
    }

    public override getService(): FiltroServices<Empresa> {
        return this.serviceF;
    }

    getUrlOnCancelarForm(): string {
        return '/crm/empresa/listar';
    }

    getMensagemSucessoSubmit(): string {
        return 'Empresa salva com sucesso.';
    }

    public inicializaCamposForm(ehNovo: boolean) {
        if (ehNovo) {
            forkJoin({
                lEstado: this.cidadeService.listAllEstados(),
            }).subscribe(({lEstado}) => {
                this.listEstados = lEstado;
            });
        } else {
            forkJoin({
                lEstado: this.cidadeService.listAllEstados(),
                lCidade: this.cidadeService.listAllByEstado(this.entity.endereco?.cidade?.estado.idEstado),
            }).subscribe(({lEstado,lCidade}) => {
                this.listEstados = lEstado;
                this.listCidades = lCidade;
                this.inicializaFormGroup(false);
            });
        }
    }

    public formToObject(): Contato {
        this.entity.idEmpresa = this.formGroup.controls['idEmpresa'].value;
        this.entity.nomeFantasia = this.formGroup.controls['nomeFantasia'].value;
        this.entity.email = this.formGroup.controls['email'].value;
        this.entity.razaoSocial = this.formGroup.controls['razaoSocial'].value;
        this.entity.telefone = this.formGroup.controls['telefone'].value;
        this.entity.inscricaoEstadual = this.formGroup.controls['inscricaoEstadual'].value;
        return this.entity;
    }

    ngOnInit() {
        this.onInit();
    }

    public inicializaFormGroup(clean:boolean): void{
        if(clean){
            this.entity = new Empresa();
        }

        this.formGroup = new FormGroup({
            idEmpresa : new FormControl(''),
            nomeFantasia : new FormControl('', Validators.required),
            email : new FormControl('', [Validators.required, Validators.email]),
            razaoSocial : new FormControl('', []),
            telefone : new FormControl('', []),
            inscricaoEstadual : new FormControl('', []),
            endereco : new FormGroup({
                cep : new FormControl('', [Validators.required]),
                estado : new FormControl(this.entity.endereco?.cidade?.estado, [Validators.required]),
                cidade : new FormControl('', [Validators.required]),
                bairro : new FormControl('', [Validators.required]),
                logradouro : new FormControl('', [Validators.required]),
                numero : new FormControl('', [Validators.required]),
                complemento : new FormControl('', [Validators.required]),
            })
        })

        this.formGroup.patchValue(this.entity);
    }
}
