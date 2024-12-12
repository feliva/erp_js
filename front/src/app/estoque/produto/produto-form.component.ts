import {
  Component,
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
import {AutoCompleteModule} from "primeng/autocomplete";
import {Categoria} from "../../model/Categoria";
import {CategoriaService} from "../../service/categoria.service";
import {Marca} from "../../model/Marca";
import {MarcaService} from "../../service/marca.service";
import {Status} from "../../model/Status";
import {StatusService} from "../../service/status.service";

@Component({
  selector: 'produto-busca',
  template: `
    <div>
      <p-panel header="{{labelForm}} Produto">
        <form autocomplete="off" [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
          <div class="formgrid grid grid-cols-12 gap-4 grid-cols-12 gap-6">
            <div class="field col-span-12 md:col-span-6">
              <app-react-message-validation >
                <label>Nome</label>
                <input pInputText type="text" formControlName="nome" class="full">
              </app-react-message-validation>
            </div>
            <div class="field col-span-12 md:col-span-6">
              <app-react-message-validation >
                <label>Valor de Venda</label>
                <p-inputNumber [minFractionDigits]="2" class="full" inputId="locale-brasil" mode="decimal" locale="pt-br"
                               formControlName="valorVenda"/>
              </app-react-message-validation>
            </div>
            <div class="field col-span-12 md:col-span-6">
              <app-react-message-validation>
                <label>Valor</label>
                <p-inputNumber [minFractionDigits]="2" class="full" inputId="locale-brasil" mode="decimal" locale="pt-br"formControlName="valorCusto"/>
              </app-react-message-validation>
            </div>

            <div class="field col-span-12 md:col-span-6">
              <app-react-message-validation >
                <label>Codígo de barras</label>
                <p-inputNumber class="full" inputId="locale-brasil" locale="pt-br"
                               formControlName="codigoBarras"/>
              </app-react-message-validation>
            </div>

            <div class="field col-span-12 md:col-span-12">
              <!-- //    "quill": "^2.0.2", aguarta o primeng 18 e atualizar o quill-->
              <app-react-message-validation>
                <label>Descrição</label>
                <p-editor formControlName="descricao"  />
              </app-react-message-validation>
            </div>

            <div class="field col-span-12 md:col-span-6">
              <app-react-message-validation>
                <label>Unidade Venda</label>
                <p-dropdown [options]="listaUnidades" optionLabel="descricao" formControlName="unidadeVenda">
                </p-dropdown>
              </app-react-message-validation>
            </div>

            <div class="field col-span-12 md:col-span-6">
              <app-react-message-validation>
                <label>Unidade Compra</label>
                <p-dropdown [options]="listaUnidades" optionLabel="descricao" formControlName="unidadeCompra">
                </p-dropdown>
              </app-react-message-validation>
            </div>


            <div class="field col-span-12 md:col-span-6">
              <app-react-message-validation >
                <label>Categoria</label>
                <p-dropdown [options]="listaCategorias" optionLabel="nome" formControlName="categoria" filter="true"/>
              </app-react-message-validation>
            </div>

            <div class="field col-span-12 md:col-span-6">
              <app-react-message-validation>
                <label>Marca</label>
                <p-dropdown [options]="listaMarcas" optionLabel="nome" formControlName="marca" filter="true"/>
              </app-react-message-validation>
            </div>

            <div class="field col-span-12 md:col-span-6">
              <app-react-message-validation>
                <label>Status</label>
                <p-dropdown [options]="listaStatus" optionLabel="descricao" formControlName="status">
                </p-dropdown>
              </app-react-message-validation>
            </div>

          </div>

          <div class="grid grid-cols-12 gap-4 grid-cols-12 gap-6 mt-2 ">
            <div class="col-fixed">
              <p-button [raised]="true" type="submit" [disabled]="!formGroup.valid">
                <i class="pi pi-check mr-2"></i>
                <span>Enviar</span>
              </p-button>
            </div>
            <div class="col-fixed">
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
    AutoCompleteModule
  ],
})
export class ProdutoFormComponent implements OnInit {

  produto: Produto = new Produto();

  formGroup: FormGroup = Produto.createFormGoup();

  labelForm = 'Editar';

  listaUnidades: Unidade[] = [];
  listaCategorias: Categoria[] = []
  listaMarcas: Marca[] = []
  listaStatus: Status[] = []

  router: Router = inject(Router);
  unidadeService: UnidadeService = inject(UnidadeService);
  produtoCS: ProdutoControlService = inject(ProdutoControlService);
  produtoService: ProdutoService = inject(ProdutoService);
  categoriaService: CategoriaService = inject(CategoriaService);
  marcaService: MarcaService = inject(MarcaService);
  statusService: StatusService = inject(StatusService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  appMessage: AppMessageService = inject(AppMessageService);

  constructor() {
  }

  initForm() {
    forkJoin({
      lUnidade: this.unidadeService.listAll(),
      lCategoria: this.categoriaService.listAll(),
      lMArca: this.marcaService.listAll(),
      lStatus: this.statusService.listAll(),
    }).subscribe(({lUnidade,lCategoria,lMArca,lStatus}) => {
      this.listaUnidades = lUnidade;
      this.listaCategorias = lCategoria;
      this.listaMarcas = lMArca;
      this.listaStatus = lStatus
    });
    console.log(this.produto);
    this.formGroup.patchValue(this.produto);

    this.formGroup.valueChanges.subscribe((teste) => {
      console.log(teste);
    })
  }

  onCancelarForm(event: any) {
    this.produtoCS.onCancelaForm();
  }

  onSubmit(event: SubmitEvent) {
    if (!this.formGroup.valid) {
      this.appMessage.addError('', 'Existem pendencias no cadastro.')
      return;
    }

    this.produtoService.save(this.formGroup.value).subscribe(resp => {
      this.produtoCS.telaBuscar();
      this.appMessage.addSuccess('', 'Produto salvo com sucesso.')
    })
  }

  ngOnInit() {
    this.produtoCS.reInit(this.activatedRoute)
    if (this.produtoCS.isNovo()) {
      this.labelForm = 'Novo';
      this.initForm();
      return;
    }

    //para o acesso direto pela url
    if (this.produtoCS.produto) {
      this.produto = this.produtoCS.produto;
      this.initForm();
    } else {
      this.produtoService.findById(this.activatedRoute.snapshot.params['idProduto']).subscribe((result) => {
        this.produto = result;
        this.initForm();
      })
    }
  }
}
