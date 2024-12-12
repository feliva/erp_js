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
import {TableModule} from "primeng/table";
import {Dialog} from "primeng/dialog";

@Component({
    selector: 'crm-contato-form',
    template: `
        <div>
            <p-panel header="{{labelForm}} Empresa">
                <ng-template pTemplate="header"></ng-template>
                <form autocomplete="off" [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
                    <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-4">
                        <div class="md:col-span-2">
                            <app-react-message-validation label="Nome Fantasia">
                                <input pInputText type="text" formControlName="nomeFantasia" class="w-full">
                            </app-react-message-validation>
                        </div>
                        <div class=" md:col-span-2">
                            <app-react-message-validation label="E-mail">
                                <input pInputText type="email" class="w-full" formControlName="email"/>
                            </app-react-message-validation>
                        </div>
                        <div class=" md:col-span-2">
                            <app-react-message-validation label="Razão Social">
                                <input pInputText type="text" formControlName="razaoSocial" class="w-full"/>
                            </app-react-message-validation>
                        </div>
                        <div class="md:col-span-1">
                            <app-react-message-validation  label="Telefone">
                                <p-inputMask mask="(99)99999-9999"   formControlName="telefone" class="grid w-full"/>
                            </app-react-message-validation>
                        </div>
                        <div class="md:col-span-1 ">
                            <app-react-message-validation label="Inscrisão Estadual">
                                <input pInputText type="text" formControlName="inscricaoEstadual" class="w-full"/>
                            </app-react-message-validation>
                        </div>                        
                    </div>
                    <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-4 pt-4" formGroupName="endereco">
                        <div class="md:col-span-1">
                            <app-react-message-validation label="Cep">
                                <input pInputText type="text" formControlName="cep" class="w-full"/>
                            </app-react-message-validation>
                        </div>
                        <div class="md:col-span-1">
                            <label>Estado</label>
                            <p-dropdown [options]="listEstados" formControlName="estado" optionLabel="nome"
                                        (onChange)="changeEstado($event.value)"/>
                        </div>
                        <div class="md:col-span-1">
                            <app-react-message-validation label="Cidade">
                                <p-dropdown [options]="listCidades" formControlName="cidade" optionLabel="nome"
                                            [filter]="true"
                                            filterBy="nome" placeholder=""/>
                            </app-react-message-validation>
                        </div>
                        <div class="md:col-span-1">
                            <app-react-message-validation label="Bairro">
                                <input pInputText type="text" formControlName="bairro" class="w-full"/>
                            </app-react-message-validation>
                        </div>
                        <div class="md:col-span-2">
                            <app-react-message-validation label="Logradouro">
                                <input pInputText type="text" formControlName="logradouro" class="w-full"/>
                            </app-react-message-validation>
                        </div>
                        <div class="md:col-span-1">
                            <app-react-message-validation label="Numero">
                                <input pInputText type="text" formControlName="numero" class="w-full"/>
                            </app-react-message-validation>
                        </div>
                        <div class="md:col-span-1">
                            <app-react-message-validation label="Complemento">
                                <input pInputText type="text" formControlName="complemento" class="w-full"/>
                            </app-react-message-validation>
                        </div>
                    </div>
                    <p-table [value]="this.entity.setContatos || []">
                        <ng-template pTemplate="caption">
                            <div class="flex items-center justify-between">
                                <span class="text-xl font-bold">Contatos</span>
                            </div>
                        </ng-template>
                        <ng-template #header let-columns>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Celular</th>
                            </tr>
                        </ng-template>
                        <ng-template #body let-contato>
                            <tr>
                                <td>{{ contato.idContato }}</td>
                                <td>{{ contato.nome }}</td>
                                <td>{{ contato.email }}</td>
                                <td>{{ contato.celular }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                    
                    
                    <div class="flex pt-10">
                        <div class="pr-5">
                            <p-button [raised]="true" type="submit" [disabled]="!formGroup.valid">
                                <i class="pi pi-check mr-2"></i>
                                <span>Enviar</span>
                            </p-button>
                        </div>
                        <div class="">
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
        InputMaskModule,
        TableModule,
        Dialog
    ],
})
export class CrmEmpresasFormComponent extends FormOperacoesComuns<Empresa> implements OnInit {

    serviceF: CrmEmpresaService = inject(CrmEmpresaService);
    cidadeService: CidadeService = inject(CidadeService);

    estado: Estado | undefined;
    listCidades: Cidade[] = [];
    listEstados: Estado[] = [];

    listContatos:Contato[] = [];

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

    public formToObject(): Empresa {
        // this.entity.idEmpresa = this.formGroup.controls['idEmpresa'].value;
        // this.entity.nomeFantasia = this.formGroup.controls['nomeFantasia'].value;
        // this.entity.email = this.formGroup.controls['email'].value;
        // this.entity.razaoSocial = this.formGroup.controls['razaoSocial'].value;
        // this.entity.telefone = this.formGroup.controls['telefone'].value;
        // this.entity.inscricaoEstadual = this.formGroup.controls['inscricaoEstadual'].value;

        this.entity = this.formGroup.getRawValue();
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
                idEndereco : new FormControl('', []),
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
