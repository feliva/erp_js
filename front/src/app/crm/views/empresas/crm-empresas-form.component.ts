import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {EditorModule} from "primeng/editor";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ReactMessageValidationComponent} from "../../../shared/message-validation/react-message-validation.component";
import {InputMaskModule} from "primeng/inputmask";
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
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Select} from "primeng/select";
import {ContatoEmpresa} from "../../../model/ContatoEmpresa";
import {CrmContatoEmpresasForm} from "./CrmContatoEmpresaForm";

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
                            <app-react-message-validation label="Telefone">
                                <p-inputMask mask="(99)99999-9999" formControlName="telefone" class="grid w-full"/>
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
                            <p-select [options]="listEstados" formControlName="estado" optionLabel="nome"
                                      (onChange)="changeEstado($event.value)"/>
                        </div>
                        <div class="md:col-span-1">
                            <app-react-message-validation label="Cidade">
                                <p-select [options]="listCidades" formControlName="cidade" optionLabel="nome"
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
                    <p-table [value]="this.entity.listContatosEmpresa || []">
                        <ng-template pTemplate="caption">
                            <div class="flex items-center justify-items-start">
                                <p-button  [rounded]="true" icon="pi pi-plus" styleClass="mr-3"/>
                                <span class="text-xl font-bold">Contatos</span>
                            </div>
                        </ng-template>
                        <ng-template #header let-columns>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Celular</th>
                                <th>Tipo/Função</th>
                            </tr>
                        </ng-template>
                        <ng-template #body let-contatoE let-index>
                            <tr>
                                <td>{{ contatoE.contato.idContato }}</td>
                                <td>{{ contatoE.contato.nome }}</td>
                                <td>{{ contatoE.contato.email }}</td>
                                <td>{{ contatoE.contato.celular }}</td>
                                <td>{{ contatoE.tipoContatoEmpresa.descrisao }}</td>
                                <td>
                                    <a class="p-ripple p-element p-button p-component p-button-icon-only p-button-rounded p-button-text"
                                       aria-label="Novo"
                                       (click)="editarConato(contatoE,$event)">
                                        <i class="pi pi-pencil"></i>
                                    </a>
                                    <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger"
                                              (onClick)="removerContato(contatoE,$event)"></p-button>
                                </td>
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
            <p-dialog>
            </p-dialog>
        </div>
    `,
    styles: [`

    `],
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
        Dialog,
        Select
    ],
    standalone: true,
    providers: [DialogService, DynamicDialogConfig]
})
export class CrmEmpresasFormComponent extends FormOperacoesComuns<Empresa> implements OnInit,OnDestroy {

    serviceF: CrmEmpresaService = inject(CrmEmpresaService);
    cidadeService: CidadeService = inject(CidadeService);

    dialogService: DialogService = inject(DialogService);
    dynamicDialogConfig:DynamicDialogConfig = inject(DynamicDialogConfig);

    estado: Estado | undefined;
    listCidades: Cidade[] = [];
    listEstados: Estado[] = [];

    ref: DynamicDialogRef | undefined;

    constructor(private location: Location) {
        super();
    }

    changeEstado(estado: Estado | undefined) {
        console.log(estado)
        this.cidadeService.listAllByEstado(estado?.idEstado).subscribe(data => {
            this.listCidades = data;
        });
    }

    removerContato(contatoEmpresa:ContatoEmpresa,$event:any) {
        let lista = this.entity.listContatosEmpresa ?? [];
        // this.entity.listContatosEmpresa = lista.filter((cont:ContatoEmpresa)=>{
        //     return contato.idContato !== cont.idContato;
        // })
    }

    editarConato(contato:ContatoEmpresa,event:any){
        this.ref = this.dialogService.open(CrmContatoEmpresasForm, {
            data:{
                idEntity:contato.idContatoEmpresa
            },
            modal:true
        });

        this.ref.onClose.subscribe((data: any) => {
            console.log("this.ref.onClose.")
            console.log(data)
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
        super.onInit();
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
            listContatosEmpresa : new FormControl([],[]),
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
        console.log(this.entity)
        this.formGroup.patchValue(this.entity);
    }

    ngOnDestroy(){
        if(this.ref){
            this.ref.close()
        }
    }

    protected readonly console = console;
}
