import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbService} from "../components/breadcrumb/breadcrumb.service";
import {BreadMenuItem} from "../components/breadcrumb/BreadcrumbMenuItem.class";
import {ConstantesUtil, TipoBusca} from "../util/constantes.util";


@Component({
  selector: 'app-user-busca',
  template: `

      <p-panel header="Busca de Usuários">
      <form></form>
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <div class="flex flex-wrap gap-3">
            <div class="flex align-items-center">
              <p-radioButton  value="{{TipoBusca.NOME}}" [(ngModel)]="this.tipoBusca" required minlength="4"></p-radioButton>
              <label class="ml-2">Nome</label>
            </div>

            <div class="flex align-items-center">
              <p-radioButton  value="{{TipoBusca.CPF}}" [(ngModel)]="this.tipoBusca"></p-radioButton>
              <label class="ml-2">CPF</label>
            </div>
          </div>
        </div>
          <div class="field col-12 md:col-6">

              <p-inputMask mask="999.999.999-99" name="sdas" [(ngModel)]="this.busca"   placeholder="999.999.999-99" *ngIf="this.tipoBusca == TipoBusca.CPF" class="w-full" ></p-inputMask>
              <input type="text" pInputText [(ngModel)]="this.busca" *ngIf="this.tipoBusca == TipoBusca.NOME" placeholder="Nome" class="w-full"/>
          </div>
      </div>
      <div>
        <p-button label="Buscar" (click)="this.buscar()" icon="pi pi-search" class="pr-3"></p-button>
        <p-button label="Novo" routerLink="/user/novo" icon="pi pi-plus"></p-button>
      </div>
    </p-panel>
  `,
  styles: [`
    input[type=radio] {
    border: 0px;
    width: 1.5em;
    height: 2em;
    }
  `]
})
export class UserBuscaComponent {
  tipoBusca:TipoBusca = TipoBusca.NOME;
  busca:string='';

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private messageService:MessageService, private breadservice:BreadcrumbService ){
  }

  public buscar():void{
    this.router.navigate(['../listar/',this.tipoBusca,this.busca], { relativeTo: this.activatedRoute });
  }

  protected readonly BreadMenuItem = BreadMenuItem;
  protected readonly ConstantesUtil = ConstantesUtil;
  protected readonly TipoBusca = TipoBusca;
}
