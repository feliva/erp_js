import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {EditorModule} from "primeng/editor";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputMaskModule} from "primeng/inputmask";
import {ActivatedRoute} from "@angular/router";
import {ReactMessageValidationComponent} from "../shared/message-validation/react-message-validation.component";
import {FormDynamicDialogOperacoesComuns} from "../shared/FormDynamicDialogOperacoesComuns";
import {Funcionario} from "../model/Funcionario";
import {FuncionarioService} from "./FuncionarioService";
import {FiltroServices} from "../service/FiltroServices";
import {EnderecoFormComponent} from "../crm/views/empresas/endereco-form.component";
import {TabPanel, TabsModule} from "primeng/tabs";

@Component({
    selector: 'minha-emprsa-form',
    template: `
        <div class="p-panel p-component ">
            <div class="p-panel-content-container">
                <div class=" ">
                    <form autocomplete="off" [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
                        
                        <p-tabs>
                            <p-tablist>
                                <p-tab value="0">Dados Funcionais</p-tab>
                                <p-tab value="1">Dados Pessoas</p-tab>
                                <p-tab value="5">Contato</p-tab>
                                <p-tab value="2">Endereço</p-tab>
                                <p-tab value="3">Permissões</p-tab>
                            </p-tablist>
                            <p-tabpanels>
                                <p-tabpanel value="0"></p-tabpanel>
                                <p-tabpanel value="1"></p-tabpanel>
                                <p-tabpanel value="2">
                                    <endereco-form fgName="endereco" [formGroup]="formGroup" />
                                </p-tabpanel>
                                <p-tabpanel value="5">
                                    <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-2">
                                    </div>
                                </p-tabpanel>
                            </p-tabpanels>
                        </p-tabs>
                        
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
        EnderecoFormComponent,
        TabPanel,
        TabsModule
    ]
})
export class FuncionarioFormComponent extends FormDynamicDialogOperacoesComuns<Funcionario> implements OnInit {

    funcionarioService: FuncionarioService = inject(FuncionarioService);

    ss = inject(ActivatedRoute)

    constructor() {
        super();
    }


    public override getService(): FiltroServices<Funcionario> {
        return this.funcionarioService;
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
            // forkJoin({
            //     lEstado: this.cidadeService.listAllEstados(),
            // }).subscribe(({lEstado}) => {
            //     this.listEstados = lEstado;
            // });
        } else {
            // forkJoin({
            //     lEstado: this.cidadeService.listAllEstados(),
            //     lCidade: this.cidadeService.listAllByEstado(this.entity?.endereco?.cidade?.estado?.idEstado),
            // }).subscribe(({lEstado,lCidade}) => {
            //     this.listEstados = lEstado;
            //     this.listCidades = lCidade;
                this.inicializaFormGroup(false);
            // });
        }
    }

    public formToObject(): Funcionario {
        // let contatoForm: Contato = new Contato();
        return this.formGroup.getRawValue();
    }

    ngOnInit() {
        super.onInit()
    }

    public inicializaFormGroup(clean:boolean): void{
        if(clean){
            this.entity = new Funcionario();
        }
        this.formGroup = Funcionario.CreateFormGroup(this.entity);
        this.formGroup.patchValue(this.entity);
    }
}
