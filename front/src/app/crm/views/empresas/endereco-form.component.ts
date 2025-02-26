import {Component, EventEmitter, inject, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {EditorModule} from "primeng/editor";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ReactMessageValidationComponent} from "../../../shared/message-validation/react-message-validation.component";
import {InputMaskModule} from "primeng/inputmask";
import {CidadeService} from "../../../service/cidade.service";
import {Cidade, Estado} from "../../../model/Cidade";
import {TableModule} from "primeng/table";
import {Select} from "primeng/select";
import {LoadEnd} from "../../../model/events/LoadEnd";

@Component({
    selector: 'endereco-form',
    template: `
        <div [formGroup]="formGroup">
        <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-4 pt-4">
            <div class="md:col-span-1">
                <app-react-message-validation label="Cep">
                    <input pInputText type="text" formControlName="cep" class="w-full"/>
                </app-react-message-validation>
            </div>
            <div class="md:col-span-1">
                <label>Estado</label>
                <p-select [options]="listEstados" formControlName="estado" optionLabel="nome" styleClass="w-full"
                          (onChange)="changeEstado($event.value)"/>
            </div>
            <div class="md:col-span-1">
                <app-react-message-validation label="Cidade">
                    <p-select [options]="listCidades" formControlName="cidade" optionLabel="nome"
                              [filter]="true" styleClass="w-full"
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
        Select
    ],
    standalone: true,
})
export class EnderecoFormComponent implements OnInit {

    cidadeService: CidadeService = inject(CidadeService);
    // formGroupDirective:FormGroupDirective = inject(FormGroupDirective)

    @Input({required:true})
    loadEmitter ?: EventEmitter<LoadEnd>;

    listCidades?: Cidade[] = []
    listEstados?: Estado[] = []

    formGroup!: FormGroup;

    @Input({required: true})
    fgName:string = ""

    constructor(private formGroupDirective:FormGroupDirective) {
    }

    changeEstado(estado: Estado | undefined) {
        this.cidadeService.listAllByEstado(estado?.idEstado).subscribe(data => {
            this.listCidades = data;
        });
    }


    public ngOnInit() {
        this.formGroup = this.formGroupDirective.control.get(this.fgName) as FormGroup;

        this.cidadeService.listAllEstados().subscribe((lEstado) => {
            this.listEstados = lEstado;
        });


        this.loadEmitter?.subscribe(()=>{
            let cidade = this.formGroup.get('cidade')?.value;

            if (cidade) {
                this.formGroup.get('estado')?.setValue(cidade.estado);
                this.cidadeService.listAllByEstado(cidade.estado?.idEstado).subscribe((lCidade) => {
                    this.listCidades = lCidade;
                });
            }
        })
    }

}
