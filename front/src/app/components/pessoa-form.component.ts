import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {EditorModule} from "primeng/editor";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputMaskModule} from "primeng/inputmask";
import {TableModule} from "primeng/table";
import {Select} from "primeng/select";
import {ReactMessageValidationComponent} from "../shared/message-validation/react-message-validation.component";
import {Cidade, Estado} from "../model/Cidade";
import {LoadEnd} from "../model/events/LoadEnd";

@Component({
    selector: 'pessoa-form',
    template: `
		<div [formGroup]="formGroup">
			<div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-2 pt-4">
				<div class="md:col-span-1">
					<app-react-message-validation label="Nome">
						<input pInputText type="text" formControlName="nome" class="w-full"/>
					</app-react-message-validation>
				</div>
				<div class="md:col-span-1">
					<app-react-message-validation label="E-mail">
						<input pInputText type="text" formControlName="email" class="w-full"/>
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
export class PessoaFormComponent implements OnInit {

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

    public ngOnInit() {
        this.formGroup = this.formGroupDirective.control.get(this.fgName) as FormGroup;


        this.loadEmitter?.subscribe(()=>{
            console.log("pessoad load")
        })
    }

}
