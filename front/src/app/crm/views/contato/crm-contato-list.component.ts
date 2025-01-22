import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SharedModule} from "primeng/api";
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {CrmContatoService} from "../services/crm-contato.service";
import {Contato} from "../../../model/Contato";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FieldsetModule} from "primeng/fieldset";
import {ReactiveFormsModule} from "@angular/forms";
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
                     [rowsPerPageOptions]="[20, 40, 80,160]"
                     sortField="nome" [sortOrder]="-1"
                     sortMode="multiple"
            >
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width:75px" class="p-0">
                            <span pSortableColumn="id">
                                Id
                                <p-sortIcon field="id"/>
                            </span>
                        </th>
                        <th>
                            <span pSortableColumn="nome">
                                Nome
                                <p-sortIcon field="nome"/>
                            </span>
                            <p-columnFilter type="text" field="nome" placeholder="Nome"
                                    ariaLabel="Filtro Nome" display="menu" showMenu="true" ></p-columnFilter>
                        </th>
                        <th>
                            <span pSortableColumn="email">
                                E-mail
                                <p-sortIcon field="email"/>
                            </span>
                            <p-columnFilter type="text" field="email" placeholder="E-mail"
                                            ariaLabel="Filter email" display="menu"></p-columnFilter>
                        </th>
                        <th>Celular</th>
                        <th>
                            <span pSortableColumn="cidade">
                                Cidade
                                <p-sortIcon field="cidade"/>
                            </span>
                            <p-columnFilter type="text" field="cidade" placeholder="Cidade" ariaLabel="Filter cidade" display="menu"></p-columnFilter>
                        </th>
                        <th></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-contato>
                    <tr>
                        <th>{{ contato.idContato }}</th>
                        <th>{{ contato.nome }}</th>
                        <th>{{ contato.email }}</th>
                        <th>{{ contato.celular }}</th>
                        <th></th>
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
  ss = inject(ActivatedRoute)

  constructor(){
    super();
  }

  ngOnInit(): void {

  }

  override getService(): FiltroServices<Contato> {
    return this.contatoService;
  }

  override getMessageExcluir(entity:Contato): string {
    return 'Você tem certeza que deseja excluir o contato ' + entity.nome+' ?';
  }
}
