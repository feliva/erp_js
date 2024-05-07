import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UnidadeService} from "../../service/unidade.service";
import {Unidade} from "../../model/Unidade";
import {forkJoin, Observable} from "rxjs";
import {waitForAsync} from "@angular/core/testing";
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/Status";
import {Location} from "@angular/common";
import {MessageService} from "primeng/api";

@Component({
  selector: 'unidade-form',
  template: `
    <div class="">
      <p-panel header="Editar Unidade" >
        <form  autocomplete="off" [formGroup]="formGroup" (ngSubmit)="onSubmit()" >
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label>Sigla</label>
              <input pInputText  type="text" formControlName="sigla" >
              <app-react-message-validation [fGroup]="formGroup" field="sigla" ></app-react-message-validation>
            </div>
            <div class="field col-12 md:col-6">
              <label>Descrição</label>
              <input pInputText  type="text" formControlName="descricao" >
              <app-react-message-validation [fGroup]="formGroup" field="descricao" ></app-react-message-validation>
            </div>
            <div class="field col-12 md:col-6">
              <label>Status</label>
              <p-dropdown [options]="statusList" optionLabel="descricao" formControlName="status">
              </p-dropdown>
              <app-react-message-validation [fGroup]="formGroup" field="status" ></app-react-message-validation>
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
              <p-button severity="secondary" [raised]="true" (onClick)="onCancelar()" >
                <i class="pi pi-times mr-2"></i>
                <span>Cancelar</span>
              </p-button>
            </div>
          </div>
        </form>
      </p-panel>
    </div>
  `,
  styles:[`

  `]
})
export class UnidadeFormComponent implements OnInit{

  unidade!:Unidade;
  statusList:Status[]|undefined;

  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  unidadeService:UnidadeService = inject(UnidadeService);
  statusService:StatusService = inject(StatusService);
  router:Router = inject(Router);
  location:Location =  inject(Location);
  message:MessageService = inject(MessageService)

  formGroup:FormGroup = new FormGroup({
    sigla: new FormControl('',[Validators.required]),
    descricao: new FormControl('',[Validators.required]),
    status: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {

    let idUnidade: number = this.activatedRoute.snapshot.params['idUnidade'];

    forkJoin({
      unidade:this.unidadeService.findById(idUnidade),
      statusDisponiveis: this.statusService.listAll()
    }).subscribe(({unidade,statusDisponiveis}) => {
      this.unidade = unidade;
      this.statusList = statusDisponiveis
      this.populaForm();
    });
  }

  populaForm(){
    console.log(this.unidade)
    this.formGroup.patchValue(this.unidade)
  }

  onCancelar(){
    this.location.back();
  }

  onSubmit(){

    this.unidade.descricao = this.formGroup.controls['descricao'].value;
    this.unidade.status = this.formGroup.controls['status'].value;
    this.unidade.sigla = this.formGroup.controls['sigla'].value;

    console.log(this.unidade)
    this.unidadeService.send(this.unidade).subscribe({
      next:(resp)=>{
        console.log('deu' + this.unidade.descricao);
        this.router.navigateByUrl('/unidade/buscar');
        this.message.add({severity:'success',detail:'Unidada salva com sucesso.'})
      },
      // error:(error)=>{ // erros sao tratados no global error intercept
      //   console.log('error' + this.unidade.descricao);
      // }
    });
  }

}
