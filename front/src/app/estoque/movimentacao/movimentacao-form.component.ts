import {
  Component, ElementRef, Inject,
  inject,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Route, Router, RouterPreloader} from "@angular/router";
import {ProdutoService} from "../../service/produto.service";
import {forkJoin, Observable} from "rxjs";
import {Produto} from "../../model/Produto";
import {FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UnidadeService} from "../../service/unidade.service";
import {Unidade} from "../../model/Unidade";
import {ProdutoControlService} from "../../controllers/produto-control.service";
import {MessageService} from "primeng/api";
import {AppMessageService} from "../../service/app-message.service";
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {ReactMessageValidationComponent} from '../../shared/message-validation/react-message-validation.component';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {EditorModule} from "primeng/editor";
import {AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent} from "primeng/autocomplete";
import {Categoria} from "../../model/Categoria";
import {CategoriaService} from "../../service/categoria.service";
import {Marca} from "../../model/Marca";
import {MarcaService} from "../../service/marca.service";
import {Status} from "../../model/Status";
import {StatusService} from "../../service/status.service";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {TipoMovimentacao} from "../../model/TipoMovimentacao";
import {TipoMovimentacaoService} from "../../service/tipo-movimentacao.service";
import {ItemMovimentacao, Movimentacao} from "../../model/Movimentacao";
import {Armazenagem} from "../../model/Armazenagem";
import {ArmazenagemService} from "../../service/armazenagem.service";
import {TipoJustufucativaMovimentacao} from "../../model/TipoJustufucativaMovimentacao";
import {TipoJstificativaMovimentacaoService} from "../../service/TipoJustificativaMovimentacao.service";
import {TableModule} from "primeng/table";
import {MovimentacaoService} from "../../service/movimentacao.service";
import {DialogModule} from "primeng/dialog";
import {DOCUMENT, NgIf} from "@angular/common";
import {FormUtil} from "../../util/FormUtil";
import {MovimentacaoControlService} from "./movimentacao-control.service";

@Component({
  selector: 'movimentacao-form',
  template: `
    <div>
      <p-panel header="{{labelForm}} Movimentação">
        <form autocomplete="off" [formGroup]="formGroupMovimentacao" (ngSubmit)="onSubmit($event)">
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
                <app-react-message-validation >
                  <label>Data da movimentação<span class="obrigatorio">*</span></label>
                  <p-calendar class="w-full" formControlName="dtMovimentacao"  dateFormat="dd/MM/yy"/>
                </app-react-message-validation>
            </div>

            <div class="field col-12 md:col-6">
              <app-react-message-validation >
                <label>Tipo de Movimentação<span class="obrigatorio">*</span></label>
                <p-dropdown [options]="this.listaTipoMobilidade" optionLabel="descricao" formControlName="tipoMovimentacao">
                </p-dropdown>
              </app-react-message-validation>
            </div>

            <div class="field col-12 md:col-6">
              <app-react-message-validation>
                <label>Armazenagem<span class="obrigatorio">*</span></label>
                <p-dropdown [options]="this.listaArmazenagem" optionLabel="descricao" formControlName="armazenagem" >
                </p-dropdown>
              </app-react-message-validation>
            </div>

            <div class="field col-12 md:col-6">
              <app-react-message-validation>
                <label>Tipo justificativa<span class="obrigatorio">*</span></label>
                <p-dropdown [options]="this.listaTipoJustufucativa" optionLabel="descricao" formControlName="tipoJustificativaMovimentacao">
                </p-dropdown>
              </app-react-message-validation>
            </div>

            <div class="field col-12 md:col-12">
              <label>Descrição</label>
              <textarea pInputTextarea rows="2" cols="60" formControlName="descricao" class="w-full"></textarea>
            </div>

            <div class="field col-12 md:col-12">

            </div>

            <div class="field col-12 md:col-12">
              <p-table [value]="this.itensMovimentacao" dataKey="produto.idProduto"  [tableStyle]="{ 'min-width': '50rem' }" >
                <ng-template pTemplate="caption">
                  <div class="flex flex-wrap justify-content-between ">
                    <span class="text-xl">Item da movimentação</span>
                    <p-button icon="pi pi-plus-circle"  label="Adicional produto" (onClick)="novoItemMovimentacao($event)" *ngIf="this.movimentacaoCS.isNovo()"/>
                  </div>
                </ng-template>
                <ng-template pTemplate="header">
                  <tr>
                    <th style="width:60%">
                      Produto
                    </th>
                    <th style="width:10%">
                      Estoque
                    </th>
                    <th style="width:30%">
                      Quantidade
                    </th>
                  </tr>
                </ng-template>
                <ng-template pTemplate="body" let-item let-editing="editing">
                  <tr>
                    <td >{{item.produto.nome}}</td>
                    <td>{{item.emEstoque}}</td>
                    <td>{{item.quantidade}}</td>
                  </tr>
                </ng-template>
              </p-table>
            </div>

          </div>
          <div class="flex justify-content-start gap-2">
              <p-button [raised]="true" type="submit" [disabled]="!formGroupMovimentacao.valid"  icon="pi pi-check" label="Enviar" *ngIf="this.movimentacaoCS.isNovo()"/>
              <p-button severity="secondary" [raised]="true" (onClick)="onCancelarForm($event)" icon="pi pi-times" label="Cancelar" />
          </div>
        </form>


      </p-panel>

      <div #mydiv></div>
      <p-dialog
        [modal]="true"
        [(visible)]="visivel"
        position="top"
        maximizable="true"
        [style]="{ width: '600px' }">
        <span class="p-text-secondary block mb-5">
          <b>
            Adiciona produto a movimentadao(E/S)
            </b>
        </span>
        <form autocomplete="off" [formGroup]="formGroupItemMovimentacao" (ngSubmit)="onSubmitItemMovimentacao($event)">
          <div class="formgrid grid">
            <div class="field col-12 md:col-12">
              <app-react-message-validation >
                <label for="dlgAutProduto">Produto<span class="obrigatorio">*</span></label>
                <p-autoComplete id="dlgAutProduto" name="dlgAutProduto" [suggestions]="this.listaProdutos"
                                (completeMethod)="filterAutoCompleteProduto($event)" (onSelect)="onSelectFilterAutoCompleteProduto($event)"
                                class="w-full" [optionLabel]="Produto.getOptionLabel" formControlName="produto">
                  <ng-template let-auProdut pTemplate="item">
                    <div class="flex align-items-center gap-2">
                      <div>{{auProdut.idProduto}} - {{auProdut.nome }} - {{auProdut.unidadeCompra.sigla}}</div>
                    </div>
                  </ng-template>
                </p-autoComplete>
              </app-react-message-validation>
            </div>

            <div class="field col-12 md:col-12">
              <app-react-message-validation >
                <label>Quantidade<span class="obrigatorio">*</span></label>
                <p-inputNumber formControlName="quantidade" class="w-full"/>
              </app-react-message-validation>
            </div>

            <div class="field col-12 md:col-6">
                <label>Em estoque</label>
                <p-inputNumber class="w-full" formControlName="emEstoque"/>
            </div>
          </div>

          <div class="flex justify-content-end gap-2">
            <p-button label="Cancelar" severity="secondary" (onClick)="visivel = false" icon="pi pi-times"/>
            <p-button type="submit" label="ok" icon="pi pi-check"  />
          </div>
        </form>
      </p-dialog>
    </div>
  `,
  styles: [`

  `],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    InputTextModule,
    ReactMessageValidationComponent,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    EditorModule,
    AutoCompleteModule,
    InputTextareaModule,
    CalendarModule,
    TableModule,
    DialogModule,
    NgIf
  ],
})
export class MovimentacaoFormComponent implements OnInit {

  movimentacao: Movimentacao = new Movimentacao();
  itemMovimentacao:ItemMovimentacao = new ItemMovimentacao();
  itensMovimentacao:ItemMovimentacao[] = [];
  produto!:Produto;

  formGroupMovimentacao!: FormGroup;
  formGroupItemMovimentacao:FormGroup = ItemMovimentacao.createFormGroup();

  labelForm = 'Editar';

  visivel = false;

  listaTipoMobilidade: TipoMovimentacao[] = [];
  listaArmazenagem: Armazenagem[] = [];
  listaTipoJustufucativa: TipoJustufucativaMovimentacao[] = [];
  listaProdutos:Produto[] = []

  tipoMobilidadeService: TipoMovimentacaoService = inject(TipoMovimentacaoService)
  armazenagemService: ArmazenagemService = inject(ArmazenagemService)
  tipoJustufucativaService: TipoJstificativaMovimentacaoService = inject(TipoJstificativaMovimentacaoService)
  produtoService: ProdutoService = inject(ProdutoService);
  movimentacaoService:MovimentacaoService = inject(MovimentacaoService);

  movimentacaoCS:MovimentacaoControlService = inject(MovimentacaoControlService);

  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  appMessage: AppMessageService = inject(AppMessageService);

  constructor() {
  }

  initForm() {
    forkJoin({
      lTipoMobilidade: this.tipoMobilidadeService.listAll(),
      lArmazenagem: this.armazenagemService.listAll(),
      lTipoJustificativa : this.tipoJustufucativaService.listAll(),
    }).subscribe(({lTipoMobilidade, lArmazenagem,lTipoJustificativa}) => {
      this.listaTipoMobilidade = lTipoMobilidade
      this.listaArmazenagem = lArmazenagem
      this.listaTipoJustufucativa = lTipoJustificativa
    });

    this.formGroupMovimentacao.patchValue(this.movimentacao);
    console.log('dtMovimentacao -->')
    console.log(this.formGroupMovimentacao.controls['dtMovimentacao'].value)
  }

  onCancelarForm(event: any) {
     this.movimentacaoCS.onCancelaForm();
  }

  onSubmit(event: SubmitEvent) {

    this.movimentacao.dtMovimentacao = new Date();
    if (!this.formGroupMovimentacao.valid) {
      this.appMessage.addError('', 'Existem pendências no cadastro.')
      return;
    }

    if (this.itensMovimentacao.length == 0) {
      this.appMessage.addError('', 'Informe ao menos um produto e a sua quantidade.')
      return;
    }

    let movimentacoes:Movimentacao[] = [];

    this.itensMovimentacao.forEach((item,index)=>{
      let movimentacao = new Movimentacao();
      movimentacao.produto = item.produto;
      movimentacao.quantidade = item.quantidade;

      // movimentacao.idMovimentacao = this.formGroupMovimentacao.controls['idMovimentacao'].value;
      movimentacao.descricao = this.formGroupMovimentacao.controls['descricao'].value;
      movimentacao.dtMovimentacao = this.formGroupMovimentacao.controls['dtMovimentacao'].value;
      movimentacao.tipoMovimentacao = this.formGroupMovimentacao.controls['tipoMovimentacao'].value;
      movimentacao.armazenagem = this.formGroupMovimentacao.controls['armazenagem'].value;
      movimentacao.tipoJustificativaMovimentacao = this.formGroupMovimentacao.controls['tipoJustificativaMovimentacao'].value;
      movimentacoes.push(movimentacao);
      console.log('loop')
    })
    console.log('fim')
    console.log(movimentacoes)

    this.movimentacaoService.saveArray(movimentacoes).subscribe(resp => {
      this.appMessage.addSuccess('', 'Produto salvo com sucesso.')
      this.onCancelarForm(null)
    })
  }

  ngOnInit() {
    this.movimentacaoCS.reInit(this.activatedRoute)
    this.formGroupMovimentacao = Movimentacao.createFormGroup(!this.movimentacaoCS.isNovo())
    if (this.movimentacaoCS.isNovo()) {
      this.labelForm = 'Novo';
      this.initForm();
    }else{
      this.movimentacaoService.findById(this.activatedRoute.snapshot.params['idMovimentacao']).subscribe(resuld =>{
        this.movimentacao = resuld;
        this.initForm();
        this.telaEditView()
      })
    }
  }

  telaEditView(){
    let item = new ItemMovimentacao()
    item.produto = this.movimentacao.produto
    item.quantidade = this.movimentacao.quantidade
    item.emEstoque = 0;
    // this.loadQuantEstoque(item,()=>{})
    this.itensMovimentacao.push(item)
  }

  filterAutoCompleteProduto(event: AutoCompleteCompleteEvent) {
    this.produtoService.findByIdOrName(event.query).subscribe(resp=>{
      this.listaProdutos = resp
    })
  }

  onSelectFilterAutoCompleteProduto(event:AutoCompleteSelectEvent){
    this.itemMovimentacao.produto = event.value;
    this.loadQuantEstoque(this.itemMovimentacao,(result:number)=>{
      this.formGroupItemMovimentacao.controls['emEstoque'].setValue(result);
    });
  }

  loadQuantEstoque(item:ItemMovimentacao, func:(result:number)=> void){
    if(item.produto?.idProduto) {
      this.movimentacaoService.getEstoqueProduto(item.produto?.idProduto).subscribe(result => {
        item.emEstoque = result;
        func(result)
      })
    }
  }

  novoItemMovimentacao(event:any){
    this.itemMovimentacao = new ItemMovimentacao();
    FormUtil.resetValidations(this.formGroupItemMovimentacao);
    this.visivel = true;
  }

  onSubmitItemMovimentacao(event:any){
    if(this.formGroupItemMovimentacao.valid) {
      this.itemMovimentacao.produto = this.formGroupItemMovimentacao.controls['produto'].value
      this.itemMovimentacao.quantidade = this.formGroupItemMovimentacao.controls['quantidade'].value
      this.itensMovimentacao.push(this.itemMovimentacao);
      FormUtil.resetValidations(this.formGroupItemMovimentacao);
      this.visivel = false;
    }else{
      FormUtil.showAllErrorValidation(this.formGroupItemMovimentacao);
      this.appMessage.addError('','Verifique os campos do formulário antes de enviar.')
    }
  }

  protected readonly Produto = Produto;
  protected readonly Math = Math;
}
