import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Route, Router, RouterPreloader} from "@angular/router";
import {ProdutoService} from "../../service/produto.service";
import {forkJoin, Observable} from "rxjs";
import {Produto} from "../../model/Produto";
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {UnidadeService} from "../../service/unidade.service";
import {Unidade} from "../../model/Unidade";
import {ProdutoControlService} from "../../controllers/produto-control.service";
import {MessageService} from "primeng/api";
import {AppMessageService} from "../../service/app-message.service";
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactMessageValidationComponent } from '../../shared/message-validation/react-message-validation.component';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'produto-busca',
    template: `
    <div >
      <p-panel header="{{labelForm}} Produto">
        <form  autocomplete="off" [formGroup]="formGroup"  (ngSubmit)="onSubmit($event)" >
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label>Nome</label>
              <input pInputText  type="text" formControlName="nome" class="full">
              <app-react-message-validation [fGroup]="formGroup" field="nome" ></app-react-message-validation>
            </div>
            <div class="field col-12 md:col-6">
              <label>Valor de Venda</label>
              <p-inputNumber  [minFractionDigits]="2"  class="full" inputId="locale-brasil" mode="decimal" locale="pt-br" formControlName="valorVenda"/>
              <app-react-message-validation [fGroup]="formGroup" field="valorVenda" ></app-react-message-validation>
            </div>
            <div class="field col-12 md:col-6">
              <label>Valor</label>
              <p-inputNumber  [minFractionDigits]="2"  class="full" inputId="locale-brasil" mode="decimal" locale="pt-br"
                              formControlName="valor"/>
              <app-react-message-validation [fGroup]="formGroup" field="valor" ></app-react-message-validation>
            </div>
            <div class="field col-12 md:col-6">
              <label>Unidade</label>
              <p-dropdown [options]="listaUnidades" optionLabel="descricao" formControlName="unidade" >
              </p-dropdown>
              <app-react-message-validation [fGroup]="formGroup" field="unidade" ></app-react-message-validation>
            </div>
          </div>

          <div class="grid mt-2 ">
            <div class="col-fixed">
              <p-button [raised]="true" type="submit" [disabled]="!formGroup.valid" >
                <i class="pi pi-check mr-2"></i>
                <span>Enviar</span>
              </p-button>
            </div>
            <div class="col-fixed">
              <p-button severity="secondary" [raised]="true" (onClick)="onCancelarForm($event)" >
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
    ],
})
export class ProdutoFormComponent implements OnInit{

  produto:Produto = new Produto();

  formGroup:FormGroup = Produto.createFormGoup();

  labelForm = 'Editar';

  listaUnidades:Unidade[] = [];


  router:Router = inject(Router);
  unidadeService:UnidadeService = inject(UnidadeService);
  produtoCS:ProdutoControlService = inject(ProdutoControlService);
  produtoService:ProdutoService = inject(ProdutoService);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  appMessage:AppMessageService = inject(AppMessageService);


  constructor(){
  }


  initForm(){

    forkJoin({
      lUnidade:this.unidadeService.listAll()
    }).subscribe(({lUnidade}) => {
      this.listaUnidades = lUnidade;
    });
    this.formGroup.patchValue(this.produto);
    this.formGroup.valueChanges.subscribe((teste)=>{
      console.log(teste);
    })

  }

  onCancelarForm(event:any){
    this.produtoCS.onCancelaForm();
  }

  onSubmit(event:SubmitEvent){
    if(!this.formGroup.valid){
      this.appMessage.addError('','Existem pendencias no cadastro.')
      return;
    }

    this.produtoService.save(this.formGroup.value).subscribe(resp =>{
      this.produtoCS.telaBuscar();
      this.appMessage.addSuccess('','Produto salvo com sucesso.')
    })
  }

  ngOnInit() {
    this.produtoCS.reInit(this.activatedRoute)

    if(this.produtoCS.isNovo()){
      this.labelForm = 'Novo';
      this.initForm();
      return;
    }

    //para o acesso direto pela url
    if(this.produtoCS.produto){
      this.produto =  this.produtoCS.produto;
      this.initForm();
    }else{
      this.produtoService.findById(this.activatedRoute.snapshot.params['idProduto']).subscribe((result)=>{
        this.produto = result;
        this.initForm();
      })
    }
  }
}
