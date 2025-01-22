// import {
//     Component,
//     inject, Input,
//     OnInit
// } from '@angular/core';
// import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
// import {ButtonModule} from 'primeng/button';
// import {DropdownModule} from 'primeng/dropdown';
// import {InputNumberModule} from 'primeng/inputnumber';
// import {InputTextModule} from 'primeng/inputtext';
// import {PanelModule} from 'primeng/panel';
// import {EditorModule} from "primeng/editor";
// import {AutoCompleteModule} from "primeng/autocomplete";
// import {Contato} from "../../../model/Contato";
// import {ReactMessageValidationComponent} from "../../../shared/message-validation/react-message-validation.component";
// import {InputMaskModule} from "primeng/inputmask";
// import {CrmContatoService} from "../services/crm-contato.service";
// import {Location} from "@angular/common";
// import {FormOperacoesComuns} from "../../../shared/FormOperacoesComuns";
// import {FiltroServices} from "../../../service/FiltroServices";
// import {forkJoin} from "rxjs";
// import {CidadeService} from "../../../service/cidade.service";
// import {Cidade, Estado} from "../../../model/Cidade";
// import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
// import {FormDynamicDialogOperacoesComuns} from "../../../shared/FormDynamicDialogOperacoesComuns";
// import {Resposta} from "../../../model/Resposta";
// import {Select} from "primeng/select";
// import {ActivatedRoute} from "@angular/router";
// import {ContatoEmpresa} from "../../../model/ContatoEmpresa";
// import {CrmContatoEmpresaService} from "../services/crm-contato-empresa.service";
//
// @Component({
//     selector: 'crm-contato-form-dd',
//     template: `
//         <div>
//             <p-panel header="{{labelForm}} Contato">
//                 <form autocomplete="off" [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
//                     <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-2">
//                         <div class="md:col-span-1">
//                             <app-react-message-validation label="Nome">
//                                 <input pInputText type="text" formControlName="nome" class="w-full">
//                             </app-react-message-validation>
//                         </div>
//                         <div class="md:col-span-1">
//                             <app-react-message-validation label="E-mail">
//                                 <input pInputText type="email" class="w-full" formControlName="email"/>
//                             </app-react-message-validation>
//                         </div>
//                         <div class="md:col-span-1">
//                             <app-react-message-validation label="Celular">
//                                 <p-inputMask mask="(99) 9999-9999" formControlName="celular"
//                                              placeholder="(99) 9999-9999" class="grid"/>
//                             </app-react-message-validation>
//                         </div>
//                         <div class="md:col-span-1">
//                             <label>Estado</label>
//                             <p-select [options]="listEstados" formControlName="estado" optionLabel="nome" class="w-full" (onChange)="changeEstado($event.value)"/>
//                         </div>
//                         <div class="md:col-span-1">
//                             <app-react-message-validation label="Cidade">
//                                 <p-select [options]="listCidades" formControlName="cidade" optionLabel="nome" [filter]="true" filterBy="nome" placeholder="Selecione uma cidade" class="w-full"/>
//                             </app-react-message-validation>
//                         </div>
//                     </div>
//                     <div class="flex pt-10">
//                         <div class="pr-5">
//                             <p-button [raised]="true" type="submit" [disabled]="!formGroup.valid">
//                                 <i class="pi pi-check mr-2"></i>
//                                 <span>Enviar</span>
//                             </p-button>
//                         </div>
//                         <div class="">
//                             <p-button severity="secondary" [raised]="true" (onClick)="onCancelarForm($event)">
//                                 <i class="pi pi-times mr-2"></i>
//                                 <span>Cancelar</span>
//                             </p-button>
//                         </div>
//                     </div>
//                 </form>
//             </p-panel>
//         </div>
//     `,
//     styles: [`
//
//     `],
//     standalone: true,
//     imports: [
//         PanelModule,
//         FormsModule,
//         ReactiveFormsModule,
//         InputTextModule,
//         ReactMessageValidationComponent,
//         InputNumberModule,
//         DropdownModule,
//         ButtonModule,
//         EditorModule,
//         AutoCompleteModule,
//         InputMaskModule,
//         Select
//     ]
// })
// export class CrmContatoEmpresaFormComponent extends FormDynamicDialogOperacoesComuns<ContatoEmpresa> implements OnInit {
//
//     contatoEmpresaService:CrmContatoEmpresaService =  inject(CrmContatoEmpresaService);
//
//     constructor() {
//         super();
//     }
//
//     public override getService(): FiltroServices<ContatoEmpresa> {
//         return this.contatoEmpresaService;
//     }
//
//     getUrlOnCancelarForm(): string {
//         return '/crm/contato/listar';
//     }
//
//     getMensagemSucessoSubmit(): string {
//         return 'Contato salvo com sucesso.';
//     }
//
//     teste(){
//         this.getService().findById(1).subscribe((result) => {
//             this.entity = result;
//             this.inicializaCamposForm(false);
//         })
//     }
//
//     public inicializaCamposForm(ehNovo: boolean) {
//         // if (ehNovo) {
//         //     forkJoin({
//         //         lEstado: this.cidadeService.listAllEstados(),
//         //     }).subscribe(({lEstado}) => {
//         //         this.listEstados = lEstado;
//         //     });
//         // } else {
//         //     forkJoin({
//         //         lEstado: this.cidadeService.listAllEstados(),
//         //         lCidade: this.cidadeService.listAllByEstado(this.entity.cidade?.estado?.idEstado),
//         //     }).subscribe(({lEstado,lCidade}) => {
//         //         this.listEstados = lEstado;
//         //         this.listCidades = lCidade;
//         //         this.inicializaFormGroup(false);
//         //     });
//         // }
//     }
//
//     public formToObject(): ContatoEmpresa {
//         // let contatoForm: Contato = new Contato();
//         // this.entity.idContato = this.formGroup.controls['idContato'].value;
//         // this.entity.nome = this.formGroup.controls['nome'].value;
//         // this.entity.email = this.formGroup.controls['email'].value;
//         // this.entity.celular = this.formGroup.controls['celular'].value;
//         // this.entity.cidade = this.formGroup.controls['cidade'].value;
//         return this.entity;
//     }
//
//     ngOnInit() {
//         super.onInit()
//     }
//
//     public inicializaFormGroup(clean:boolean): void{
//         if(clean){
//             this.entity = new Contato();
//         }
//         this.formGroup =  new FormGroup({
//             // idContato: new FormControl(this.entity?.idContato),
//             // nome:new FormControl(this.entity?.nome, [Validators.required]),
//             // email:new FormControl(this.entity?.email, [Validators.required,Validators.email]),
//             // celular:new FormControl(this.entity?.celular, [Validators.required]),
//             // cidade:new FormControl(this.entity?.cidade, []),
//             // estado:new FormControl(this.entity?.cidade?.estado, []),
//         });
//     }
// }
