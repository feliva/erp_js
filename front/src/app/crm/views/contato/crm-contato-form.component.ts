import {
    Component,
    inject,
    OnInit
} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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

@Component({
    selector: 'crm-contato-form',
    template: `
        <div>
            <p-panel header="{{labelForm}} Contato">
                <form autocomplete="off" [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
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
                                <p-inputMask mask="(99) 9999-9999" formControlName="celular" placeholder="(99) 9999-9999" class="grid"/>
                            </app-react-message-validation>
                        </div>
                        <div class="md:col-span-1">
                            <label>Estado</label>
                            <p-dropdown [options]="listEstados" formControlName="estado" optionLabel="nome" class="w-full"
                                        (onChange)="changeEstado($event.value)"/>
                        </div>
                        <div class="md:col-span-1">
                            <app-react-message-validation label="Cidade">
                                <p-dropdown [options]="listCidades" formControlName="cidade" optionLabel="nome"
                                            [filter]="true"
                                            filterBy="nome" placeholder="Selecione uma cidade"/>
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
        InputMaskModule
    ]
})
export class CrmContatoFormComponent extends FormOperacoesComuns<Contato> implements OnInit {

    contatoService: CrmContatoService = inject(CrmContatoService);
    cidadeService: CidadeService = inject(CidadeService);

    estado: Estado | undefined;
    listCidades: Cidade[] = [];
    listEstados: Estado[] = [];

    constructor(private location: Location) {
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
                lCidade: this.cidadeService.listAllByEstado(this.entity.cidade?.estado.idEstado),
            }).subscribe(({lEstado,lCidade}) => {
                this.listEstados = lEstado;
                this.listCidades = lCidade;
                this.inicializaFormGroup(false);
            });
        }
    }

    public formToObject(): Contato {
        // let contatoForm: Contato = new Contato();
        this.entity.idContato = this.formGroup.controls['idContato'].value;
        this.entity.nome = this.formGroup.controls['nome'].value;
        this.entity.email = this.formGroup.controls['email'].value;
        this.entity.celular = this.formGroup.controls['celular'].value;
        this.entity.cidade = this.formGroup.controls['cidade'].value;
        return this.entity;
    }

    ngOnInit() {
        super.onInit()
    }

    public inicializaFormGroup(clean:boolean): void{
        if(clean){
            this.entity = new Contato();
        }
        this.formGroup =  new FormGroup({
            idContato: new FormControl(this.entity?.idContato),
            nome:new FormControl(this.entity?.nome, [Validators.required]),
            email:new FormControl(this.entity?.email, [Validators.required,Validators.email]),
            celular:new FormControl(this.entity?.celular, [Validators.required]),
            cidade:new FormControl(this.entity?.cidade, []),
            estado:new FormControl(this.entity?.cidade?.estado, []),
        });
    }
}
