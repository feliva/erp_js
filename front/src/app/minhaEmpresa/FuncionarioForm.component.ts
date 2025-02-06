import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {FiltroServices} from "../../../service/FiltroServices";
import {forkJoin} from "rxjs";
import {CidadeService} from "../../../service/cidade.service";
import {Cidade, Estado} from "../../../model/Cidade";
import {FormDynamicDialogOperacoesComuns} from "../../../shared/FormDynamicDialogOperacoesComuns";
import {Select} from "primeng/select";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'minha-emprsa-form',
    template: `
        <div class="p-panel p-component ">
            <div class="p-panel-content-container">
                <div class=" ">
                    <form autocomplete="off" [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
                        <p-panel header="{{labelForm}} Contato" styleClass="not-border">

                            <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-2">
                                <div class="md:col-span-1">
                                    <app-react-message-validation label="Nome">
                                        <input pInputText type="text" formControlName="nome" class="w-full">
                                    </app-react-message-validation>
                                </div>
                                <div class="md:col-span-1">
                                    <app-react-message-validation label="E-mail">
                                        <input pInputText type="email" class="w-full" formControlName="email"/>
                                    </app-react-message-validation>
                                </div>
                                <div class="md:col-span-1">
                                    <app-react-message-validation label="Celular">
                                        <p-inputMask mask="(99) 9999-9999" formControlName="celular"
                                                     placeholder="(99) 9999-9999" class="grid"></p-inputMask>
                                    </app-react-message-validation>
                                </div>
                            </div>

                        </p-panel>

                        <p-panel header="Endereço" styleClass="mt-2 not-border">
                            <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-2" formGroupName="endereco">
                                <div class="md:col-span-1">
                                    <label>Estado</label>
                                    <p-select [options]="listEstados" formControlName="estado" optionLabel="nome"
                                              class="w-full" (onChange)="changeEstado($event.value)"/>
                                </div>
                                <div class="md:col-span-1">
                                    <app-react-message-validation label="Cidade">
                                        <p-select [options]="listCidades" formControlName="cidade" optionLabel="nome"
                                                  [filter]="true" filterBy="nome" placeholder="Selecione uma cidade"
                                                  class="w-full"/>
                                    </app-react-message-validation>
                                </div>
                                <div class="md:col-span-1">
                                    <label>Cep</label>
                                    <p-inputMask mask="99999-999" formControlName="cep" class="grid"></p-inputMask>
                                </div>

                                <div class="md:col-span-1">
                                    <label>Bairro</label>
                                    <input pInputText type="text" class="w-full" formControlName="bairro"/>
                                </div>
                                <div class="md:col-span-1">
                                    <label>Logradouro</label>
                                    <input pInputText type="text" class="w-full" formControlName="logradouro"/>
                                </div>

                                <div class="md:col-span-1">
                                    <label>Número</label>
                                    <input pInputText type="text" class="w-full" formControlName="numero"/>
                                </div>
                                <div class="md:col-span-1">
                                    <label>Complemento</label>
                                    <input pInputText type="text" class="w-full" formControlName="complemento"/>
                                </div>
                            </div>
                        </p-panel>


                        <div class="p-panel p-component mt-2 not-border">
                            <div class="p-panel-content-container">
                                <div class="p-panel-content ">
                                    <div class="flex pt-6">
                                        <div class="pr-5">
                                            <p-button [raised]="true" type="submit" [disabled]="!formGroup.valid">
                                                <i class="pi pi-check mr-2"></i>
                                                <span>Enviar</span>
                                            </p-button>
                                        </div>
                                        <div class="">
                                            <p-button severity="secondary" [raised]="true"
                                                      (onClick)="onCancelarForm($event)">
                                                <i class="pi pi-times mr-2"></i>
                                                <span>Cancelar</span>
                                            </p-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
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
        Select,
    ]
})
export class FuncionarioFormComponent extends FormDynamicDialogOperacoesComuns<Contato> implements OnInit {

    contatoService: CrmContatoService = inject(CrmContatoService);
    cidadeService: CidadeService = inject(CidadeService);

    estado: Estado | undefined;
    listCidades: Cidade[] = [];
    listEstados: Estado[] = [];

    ss = inject(ActivatedRoute)

    constructor() {
        super();
    }

    changeEstado(estado: Estado | undefined) {
        this.cidadeService.listAllByEstado(estado?.idEstado).subscribe(data => {
            this.listCidades = data;
        });
    }

    public override getService(): FiltroServices<Contato> {
        return this.contatoService;
    }

    getUrlOnCancelarForm(): string {
        return '/crm/contato/listar';
    }

    getMensagemSucessoSubmit(): string {
        return 'Contato salvo com sucesso.';
    }

    teste(){
        this.getService().findById(1).subscribe((result) => {
            this.entity = result;
            this.inicializaCamposForm(false);
        })
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
                lCidade: this.cidadeService.listAllByEstado(this.entity?.endereco?.cidade?.estado?.idEstado),
            }).subscribe(({lEstado,lCidade}) => {
                this.listEstados = lEstado;
                this.listCidades = lCidade;
                this.inicializaFormGroup(false);
            });
        }
    }

    public formToObject(): Contato {
        // let contatoForm: Contato = new Contato();
        return this.formGroup.getRawValue();
    }

    ngOnInit() {
        super.onInit()
    }

    public inicializaFormGroup(clean:boolean): void{
        if(clean){
            this.entity = new Contato();
        }
        this.formGroup = Contato.CreateFormGroup(this.entity);
        this.formGroup.patchValue(this.entity);
    }
}
