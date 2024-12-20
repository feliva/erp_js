import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ConfirmationService, LazyLoadEvent, MessageService, SharedModule} from "primeng/api";
import { ButtonModule } from 'primeng/button';
import {TableLazyLoadEvent, TableModule, TablePageEvent} from 'primeng/table';
import { NgIf, AsyncPipe } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import {CrmContatoService} from "../services/crm-contato.service";
import {Contato} from "../../../model/Contato";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FieldsetModule} from "primeng/fieldset";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DataRowOutlet} from "@angular/cdk/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ListarOperacoesComuns} from "../../../shared/ListarOperacoesComuns";
import {FiltroServices} from "../../../service/FiltroServices";

@Component({
    selector: 'crm-contato-list',
    template: `

        <div class="div-btn-novo">
            <a class="p-ripple p-element p-button p-component p-button-icon-only p-button-rounded"
               routerLink="/crm/contato/novo" aria-label="Novo">
                <i class="pi pi-plus"></i>
            </a>
        </div>

        <div class="pb-2">
            <p-fieldset styleClass="m-0 mb-2 filter-fildset" [collapsed]="!expandFiltro">
                <ng-template pTemplate="header">

                    <a pRipple tabindex="0" role="button" (click)="toggle($event)" (keydown)="toggle($event)">
                        Filtros <i class="pi pi-filter"></i>
                    </a>
                </ng-template>
                <div class="pt-5">
                    @if (expandFiltro) {
                        <form [formGroup]="contatoService.getFiltrosForm()" (ngSubmit)="filtrarBusca()">
                            <div class="rid gap-4  text-sm grid-cols-1 lg:grid-cols-2">
                                <div class="md:col-span-1">
                                    <label>Nome</label>
                                    <input type="text" pInputText formControlName="nome" class="w-full"/>
                                </div>
                            </div>
                            <div class="flex pt-5">
                                <div class="pr-3">
                                    <p-button label="Filtrar" icon="pi pi-filter" class="pr-6" type="submit"></p-button>
                                </div>
                                <div class="">
                                    <p-button label="Limpar" [outlined]="true" icon="pi pi-filter-slash" class="pr-6"
                                              (onClick)="limpaFiltros()"></p-button>
                                </div>
                            </div>
                        </form>
                    }
                </div>
            </p-fieldset>
        </div>

        <p-panel header="Lista de Contatos">
            <p-table [value]="entitys" [tableStyle]="{'min-width': '60rem'}"
                     [lazy]="true"
                     [paginator]="true"
                     [totalRecords]="totalRegistros"
                     [first]="this.tablePageEvent.first"
                     [rows]="this.tablePageEvent.rows"
                     [showCurrentPageReport]="true"
                     (onLazyLoad)="onLazyLoad($event)"
                     (onPage)="onPage($event)"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                     [rowsPerPageOptions]="[20, 40, 80,160]">
                <!--                   "-->
                <ng-template pTemplate="header">
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Celular</th>
                        <th>Cidade</th>
                        <th></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-contato>
                    <tr>
                        <th>{{ contato.idContato }}</th>
                        <th>{{ contato.nome }}</th>
                        <th>{{ contato.email }}</th>
                        <th>{{ contato.celular }}</th>
                        <th>{{ contato.cidade?.nome }}</th>
                        <th>
                            <a class="p-ripple p-element p-button p-component p-button-icon-only p-button-rounded p-button-text"
                               routerLink="/crm/contato/editar/{{contato.idContato}}" aria-label="Novo">
                                <i class="pi pi-pencil"></i>
                            </a>
                            <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger"
                                      (onClick)="confirmExcluir(contato,contato.idContato,$event)"></p-button>
                        </th>
                    </tr>
                </ng-template>
            </p-table>
            <p-confirmDialog/>
        </p-panel>
    `,
    styles: [`

    `],
    standalone: true,
    imports: [PanelModule, TableModule, SharedModule, ButtonModule, InputTextModule, PaginatorModule, FieldsetModule, ReactiveFormsModule, RouterLink, ConfirmDialogModule]
})
export class CrmContatoListComponent extends ListarOperacoesComuns<Contato> implements OnInit{

  contatoService:CrmContatoService = inject(CrmContatoService);

  constructor(){
    super();
  }

  ngOnInit(): void {
    this.filtrarBusca()
  }

  override getService(): FiltroServices<Contato> {
    return this.contatoService;
  }

  override getMessageExcluir(entity:Contato): string {
    return 'Você tem certeza que deseja excluir o contato ' + entity.nome+' ?';
  }
}
