import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from 'src/app/model/Usuario';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {TipoBusca} from "../util/constantes.util";
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-list-usuarios',
  template: `
    <p-panel header="Lista de Usuários">
      <p-table [value]="this.listUsuarios">
        <!--ng-template pTemplate="caption">
          Lista de Usuários
        </ng-template-->
        <ng-template pTemplate="header">
          <tr>
            <th>Nome</th>
            <th>Username</th>
            <th>E-mail</th>
            <th></th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-usuario>
          <tr>
            <td>{{usuario.nome}}</td>
            <td>{{usuario.username}}</td>
            <td>{{usuario.email}}</td>
            <td>
              <div class="ui-panelmenu flex justify-content-center flex-wrap gap-3 mb-4">
                <div icon="pi pi-check" styleclass="p-button-rounded p-button-text" class="p-element">
                  <a class="p-ripple p-element p-button-rounded p-button-text p-button p-component p-button-icon-only" ro >
                    <span class="pi pi-check p-button-icon ng-star-inserted"></span>
                    <span class="p-ink" ></span>
                  </a>
                </div>
                <p-button styleClass="p-button-rounded p-button-text" icon="pi pi-pencil" (click)="this.editar(usuario)"></p-button>
                <!--p-button styleClass="p-button-rounded p-button-text" icon="pi pi-trash" (click)="confirm($event)" ></p-button-->
              </div>
            </td>
          </tr>
      </ng-template>
      </p-table>
      <p-confirmPopup ></p-confirmPopup>
      <p-toast></p-toast>
    </p-panel>

  `,
  styles: [`

  `],
  providers: [ConfirmationService,MessageService]
})
export class UserListComponent implements OnInit{

  @Input() listUsuarios:Usuario[] = [];

  constructor(private router:Router,
              private activateRoute: ActivatedRoute,
              private userService:UserService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    console.log(activateRoute)
    let tipo:TipoBusca = this.activateRoute.snapshot.params['tipo'];
    let busca = this.activateRoute.snapshot.params['busca'];

    switch (tipo){
      case TipoBusca.NOME:
        this.userService.findByName(busca,(response)=>{this.listUsuarios = response})
        break;
      case TipoBusca.CPF:
        this.userService.findByName(busca,(response)=>{this.listUsuarios = response})
        break;
    }
  }

  ngOnInit(): void {
  }

  editar(usuario:Usuario){
    this.router.navigate(['/user/editar',usuario.idUsuario], { relativeTo: this.activateRoute });
    console.log(usuario);
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza disso?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Sim',
      rejectLabel:'Não',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
