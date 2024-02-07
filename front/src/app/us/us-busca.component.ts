import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../service/user.service'
import {Usuario} from 'src/app/model/Usuario';


@Component({
  selector: 'app-us-busca',
  template: `
    <div *ngIf="this.isRendTelaBusca()">
      <p-panel header="Busca de Usuários us">
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <div class="flex flex-wrap gap-3">
              <div class="flex align-items-center">
                <p-radioButton  value="0" [(ngModel)]="this.tipoBusca"></p-radioButton>
                <label class="ml-2">Nome</label>
              </div>

              <div class="flex align-items-center">
                <p-radioButton  value="1" [(ngModel)]="this.tipoBusca"></p-radioButton>
                <label class="ml-2">CPF</label>
              </div>
            </div>
          </div>
            <div class="field col-12 md:col-6">

                <p-inputMask mask="999.999.999-99" name="sdas" [(ngModel)]="this.busca"   placeholder="999.999.999-99" *ngIf="this.tipoBusca == 1" class="w-full" ></p-inputMask>
                <input type="text" pInputText [(ngModel)]="this.busca" *ngIf="this.tipoBusca == 0" placeholder="Nome" class="w-full"/>

            </div>
        </div>
        <div>
          <p-button label="Buscar" (click)="this.buscarRedirect()" icon="pi pi-search" class="pr-3"></p-button>
          <p-button label="Novo" (click)="this.buscar()" icon="pi pi-plus"></p-button>
        </div>
      </p-panel>
    </div><!-- fim busca -->
    <div>

      <p-panel header="Lista de Usuários do buscar">
        <p-table [value]="this.listUsuarios">
          <ng-template pTemplate="caption">
            Lista de Usuários
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th>Nome</th>
              <th>Username</th>
              <th>E-mail</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-usuario>
            <tr>
              <td>{{usuario.nome}}</td>
              <td>{{usuario.username}}</td>
              <td>{{usuario.email}}</td>
              <td>

              </td>
            </tr>
        </ng-template>
        </p-table>
      </p-panel>
    </div>
  `,
  styles: [`
    input[type=radio] {
    border: 0px;
    width: 1.5em;
    height: 2em;
    }
  `]
})
export class UsBuscaComponent implements OnInit{
  tipoBusca:number = 0;
  busca:string='';
  paramBusca?:string;

  rendTelaBusca = true;
  rendTelaLista = false;

  listUsuarios:Usuario[] = [];

  constructor(private userService:UserService,private router: Router,private activatedRoute: ActivatedRoute ){
    // this.activatedRoute.
    // this.telaBusca();
    // this.inicializaTeste();
    console.log("Constrrutor");
    console.log(this.busca);
  }
  ngOnInit(): void {
      this.activatedRoute.params.subscribe((params: Params) =>{
        this.paramBusca = params['busca']
      });
  }

  public inicializaTeste(){
    this.busca = "darlan";
    this.buscar();
  }

  public buscarRedirect(){
    this.router.navigate(['../listar',this.busca], { relativeTo: this.activatedRoute });
  }

  public buscar():void{
    if(this.tipoBusca == 0){
      console.log(this.busca)
      this.userService.findByName(this.busca,((resp)=> this.listUsuarios = resp));
      console.log(this.listUsuarios);
    }

    if(this.listUsuarios != null && this.listUsuarios.length > 0){
      // this.telaLista();
      // this.router.navigate([`usuarios/list/${this.busca}`]);
      // this.router.navigate(['../list',this.busca], { relativeTo: this.activatedRoute });
    }else{

    }
  }

  public isRendTelaBusca():boolean{
    console.log(((this.paramBusca == null || this.paramBusca.trim().length == 0 )?true:false))
    return((this.paramBusca == null || this.paramBusca.trim().length == 0 )?true:false);
  }

  // public telaLista():void{
  //   this.rendTelaBusca = false;
  //   this.rendTelaLista = true;
  // }
}
