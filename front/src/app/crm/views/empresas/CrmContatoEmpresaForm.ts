import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {EditorModule} from "primeng/editor";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {Contato} from "../../../model/Contato";
import {ReactMessageValidationComponent} from "../../../shared/message-validation/react-message-validation.component";
import {InputMaskModule} from "primeng/inputmask";
import {CrmContatoService} from "../services/crm-contato.service";
import {Location} from "@angular/common";
import {FiltroServices} from "../../../service/FiltroServices";
import {forkJoin} from "rxjs";
import {TableModule} from "primeng/table";
import {Dialog} from "primeng/dialog";
import {DialogService, DynamicDialogConfig} from "primeng/dynamicdialog";
import {Select} from "primeng/select";
import {ContatoEmpresa} from "../../../model/ContatoEmpresa";
import {CrmContatoEmpresaService} from "../services/CrmContatoEmpresaService";
import {CrmTipoContatoEmpresaService} from "../services/CrmTipoContatoEmpresaService";
import {TipoContatoEmpresa} from "../../../model/TipoContatoEmpresa";
import {FormDynamicDialogOperacoesComuns} from "../../../shared/FormDynamicDialogOperacoesComuns";

@Component({
    selector: 'CrmContatoEmpresasForm',
    template: `
        <div>
            <p-panel header="{{labelForm}} Empresa">
                <ng-template pTemplate="header"></ng-template>
                <form autocomplete="off" [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
                    <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-4">
                        <div class="md:col-span-2">
                            <app-react-message-validation label="Tipo/Função Contato">
                                <p-select [options]="this.lTipoCE" optionLabel="descrisao" formControlName="tipoContatoEmpresa">
                                </p-select>
                            </app-react-message-validation>
                        </div>
                    </div>

                    <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-4">
                        <div class="md:col-span-2">
                            <app-react-message-validation label="Contato">
                                <p-autocomplete [suggestions]="lConatos" (completeMethod)="filterContato($event)" optionLabel="label" formControlName="contato">
                                </p-autocomplete>
                            </app-react-message-validation>
                        </div>
                    </div>

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
export class CrmContatoEmpresasForm extends FormDynamicDialogOperacoesComuns<ContatoEmpresa> implements OnInit,OnDestroy {


    service:CrmContatoEmpresaService = inject(CrmContatoEmpresaService);
    tipoCEService:CrmTipoContatoEmpresaService = inject(CrmTipoContatoEmpresaService);
    contatoService:CrmContatoService =  inject(CrmContatoService);

    lTipoCE?:TipoContatoEmpresa[] = []
    lConatos:Contato[] = [];

    constructor(private location: Location) {
        super();
    }

    filterContato(event:AutoCompleteCompleteEvent) {
        this.lConatos = [];
        this.contatoService.listByNome(event.query).subscribe(res => {
            this.lConatos = res;
        });
    }

    display(contato:Contato){
        return contato.idContato;
    }

    public override getService(): FiltroServices<ContatoEmpresa> {
        return this.service;
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
                lTipoCE: this.tipoCEService.listAll(),
            }).subscribe(({lTipoCE}) => {
                this.lTipoCE = lTipoCE;
            });
        } else {
            forkJoin({
                lTipoCE: this.tipoCEService.listAll(),
            }).subscribe(({lTipoCE}) => {
                this.lTipoCE = lTipoCE;
            });
        }
    }

    public formToObject(): ContatoEmpresa {

        this.entity = this.formGroup.getRawValue();
        return this.entity;
    }

    ngOnInit() {
        super.onInit();
    }

    public inicializaFormGroup(clean:boolean): void{
        if(clean){
            this.entity = new ContatoEmpresa();
        }

        this.formGroup = new FormGroup({
            idConstatoEmpresa : new FormControl(''),
            empresa : new FormControl(''),
            contato : new FormControl('',[Validators.required]),
            tipoContatoEmpresa : new FormControl('',[Validators.required]),

        })

        this.formGroup.patchValue(this.entity);
    }

    ngOnDestroy(){

    }

    protected readonly console = console;
}
