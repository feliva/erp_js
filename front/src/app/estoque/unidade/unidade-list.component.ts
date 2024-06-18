import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { MessageService, SharedModule } from "primeng/api";
import {BreadcrumbService} from "../../components/breadcrumb/breadcrumb.service";
import {UnidadeService} from "../../service/unidade.service";
import {TipoBusca} from "../../util/constantes.util";
import {UnidadeControlService} from "../../controllers/unidade-control.service";
import {Unidade} from "../../model/Unidade";
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgIf, AsyncPipe } from '@angular/common';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'unidade-list',
    template: `
      <p-panel header="Lista de Unidade">
        <div *ngIf="(unidadeControl.unidades$ | async) as unidades">
          <p-table [value]="unidades"  [tableStyle]="{'min-width': '60rem'}">
            <ng-template pTemplate="header">
                <tr>
                  <th>id</th>
                  <th>descreicao</th>
                  <th>sigla</th>
                  <th>Status</th>
                  <th></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-unidade>
              <tr>
                <th>{{unidade.idUnidade}}</th>
                <th>{{unidade.descricao}}</th>
                <th>{{unidade.sigla}}</th>
                <th>{{unidade.status}}</th>
                <th>
                  <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" (click)="editar(unidade)"></p-button>
                  <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger "></p-button>
                </th>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </p-panel>
  `,
    styles: [`

  `],
    standalone: true,
    imports: [PanelModule, NgIf, TableModule, SharedModule, ButtonModule, AsyncPipe]
})
export class UnidadeListComponent implements OnInit{

  unidadeControl:UnidadeControlService = inject(UnidadeControlService);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  constructor(){
  }

  ngOnInit(): void {
    this.unidadeControl.listar()
  }

  editar(unidade:Unidade){
    this.unidadeControl.editar(unidade);

  }
}
