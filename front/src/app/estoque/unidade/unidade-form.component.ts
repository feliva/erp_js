import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UnidadeService} from "../../service/unidade.service";
import {Unidade} from "../../model/Unidade";
import {forkJoin, Observable} from "rxjs";
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'unidade-form',
  template: `
    <p-panel header="Editar Unidade">
      <form  autocomplete="off">
        <label>Sigla</label>
        <input pInputText  type="text" formControlName="sigla" >
      </form>
    </p-panel>
  `,
  styles:[`

  `]
})
export class UnidadeFormComponent implements OnInit{

  input:any
  unidadeForm!:FormGroup;
  unidade!:Unidade;



  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  unidadeService:UnidadeService = inject(UnidadeService);

  formGroup!:FormGroup;

  mostra(){
    console.log(this.input)
  }

  ngOnInit(): void {
    //https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin
    let idUnidade: number = this.activatedRoute.snapshot.params['idUnidade'];

    forkJoin({
      unidade:this.unidadeService.findById(idUnidade)
    }).subscribe((unidade) => {
      this.unidade = unidade.unidade;
      this.poulaForm();
    });
  }

  poulaForm(){
    console.log(this.unidade)
    this.formGroup  = new FormGroup({
      sigla: new FormControl(this.unidade.sigla,[Validators.required]),
      descricao: new FormControl(this.unidade.descicao,[Validators.required]),
      status: new FormControl(this.unidade.status,[Validators.required])
    })
  }

}
