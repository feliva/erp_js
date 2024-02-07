import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../model/Usuario";
import {UserService} from "../service/user.service";
import {PermissaoService} from 'src/app/service/permissao.service';
import {Permissao} from 'src/app/model/Permissao';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";
import {ShowMessageService} from '../components/show-message/show-message.service';

@Component({
  selector: 'app-form-user',
  template: `
    <div>
      <p-toast [life]="200000"  ></p-toast>
      <p-panel header="Dados usuário">
        <form [formGroup]="form" (ngSubmit)="submit()" autocomplete="off">
          <div class="card">
            <div class="formgrid grid">
              <div class="field col-12 md:col-6">
                <label>Nome:</label>
                <input [(ngModel)]="this.user.nome" formControlName="nome" placeholder="Digíte um nome" pInputText
                       class="w-full" autocomplete="false"/>
                <app-react-message-validation [fGroup]="form" field="nome" label="Nome"></app-react-message-validation>
              </div>
              <div class="field col-12 md:col-6">
                <label>E-mail:</label>
                <input [(ngModel)]="this.user.email" type="text" pInputText formControlName="email" class="w-full"
                       placeholder="Inform um e-mail." autocomplete="false"/>
                <app-react-message-validation [fGroup]="form" field="email" label="E-mail"></app-react-message-validation>
              </div>
              <div class="field col-12 md:col-6">
                <label class="w-full">Senha:</label>
                <p-password [(ngModel)]="this.user.password" formControlName="password" class="w-full"
                            autocomplete="false"></p-password>
              </div>
              <div class="field col-12 md:col-6">

              </div>
            </div>
          </div>
          <p>Form Status: {{ form.status }}</p>

          <div>
            <p-pickList [source]="this.listPermissao" [target]="this.user.listPermissoes" sourceHeader="Disponiveis"
                        targetHeader="Selecionadas"
                        [showTargetControls]="false" [showSourceControls]="false">
              <ng-template let-permissao pTemplate="item">
                {{permissao.nome}}
              </ng-template>
            </p-pickList>

          </div>
          <div class="pt-3">
            <p-button label="Salvar" icon="pi pi-save" (click)="this.submit()" class="pr-3"></p-button>
            <p-button label="Cancelar" icon="pi pi-times-circle" (click)="this.cancelar()" class="pr-3"></p-button>
          </div>
        </form>
      </p-panel>
    </div>
  `,
  styles: [`
  `],
  providers: [MessageService]
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;

  listPermissao?: Permissao[];
  user: Usuario = new Usuario();

  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              private userService: UserService,
              private permService: PermissaoService,
              private messageService: MessageService,
              private showMessageService:ShowMessageService) {

  }

  ngOnInit() {
    let idUser = this.activateRoute.snapshot.params['idUsuario'];
    if(idUser !== undefined){
      this.userService.findById(idUser, (response) => {
        this.user = response
      })
    }

    //remove permissoes já add ao usuario
    this.permService.listAlla((resp) => {
      this.listPermissao = [];
      for (let perm of resp){
        let add = true;
        for(let pu of this.user.listPermissoes){
          if(pu.idPermissao === perm.idPermissao){
            console.log(pu.idPermissao +" -- "+ perm.idPermissao)
            add = false;
            break;
          }
        }
        if (add) {
          this.listPermissao.push(perm)
        }
      }
    });

    this.form = new FormGroup({
      // username:new FormControl('',[Validators.required]),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public submit(): void {
    this.showMessageService.addSuccess("Sucesso","Sucesso.");
    this.showMessageService.addError("Erro","Erro.");
    this.showMessageService.addWarn("Warni","dsadsa");
    this.showMessageService.addInfo("info","dsadsa");
    console.log(this.user.listPermissoes);
    if (!this.form.valid) {
      return;
    }

    if (this.user.listPermissoes.length == 0) {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Selecione Uma Permissão'});
      return;
    }

    this.userService.save(this.user);
    this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Selecione'});
    return;
  }

  cancelar(){
    window.history.back();
  }

}
