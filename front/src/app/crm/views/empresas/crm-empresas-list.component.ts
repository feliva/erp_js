import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {SharedModule} from "primeng/api";
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {Contato} from "../../../model/Contato";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FieldsetModule} from "primeng/fieldset";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ListarOperacoesComuns} from "../../../shared/ListarOperacoesComuns";
import {FiltroServices} from "../../../service/FiltroServices";
import {Empresa} from "../../../model/Empresa";
import {CrmEmpresaService} from "../services/crm-empresa.service";

@Component({
    selector: 'crm-contato-list',
    template: `

        <div class="div-btn-novo">
            <a class="p-ripple p-element p-button p-component p-button-icon-only p-button-rounded"
               routerLink="/crm/empresa/novo" aria-label="Novo">
                <i class="pi pi-plus"></i>
            </a>
        </div>

        <div class="pb-2">
            <p-fieldset styleClass="filter-fildset" [collapsed]="!expandFiltro">
                <ng-template pTemplate="header">

                    <a pRipple tabindex="0" role="button" (click)="toggle($event)" (keydown)="toggle($event)">
                        Filtros <i class="pi pi-filter"></i>
                    </a>
                </ng-template>
                <div class="pt-5">
                    @if (expandFiltro) {
                        <form [formGroup]="serviceL.getFiltrosForm()" (ngSubmit)="filtrarBusca()">
                            <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-2">
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

        <p-panel header="Lista de Empresas">
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
                     sortField="nomeFantasia" [sortOrder]="-1"
                     sortMode="multiple">
                <!--                   "-->
                <ng-template pTemplate="header">
                    <tr>
                        <th>id</th>
                        <th>
                            <span pSortableColumn="nomeFantasia">
                                Nome Fantasia
                                <p-sortIcon field="nomenomeFantasia"/>
                            </span>
                            <p-columnFilter type="text" field="nomeFantasia" placeholder="Nome"
                                            ariaLabel="Filtro Nome" display="menu" showMenu="true" ></p-columnFilter></th>
                        <th>E-mail</th>
                        <th>Razao Social</th>
                        <th></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-entity>
                    <tr>
                        <th>{{ entity.idEmpresa }}</th>
                        <th>{{ entity.nomeFantasia }}</th>
                        <th>{{ entity.email }}</th>
                        <th>{{ entity.razaoSocial }}</th>
                        <th>
                            <a class="p-ripple p-element p-button p-component p-button-icon-only p-button-rounded p-button-text"
                               routerLink="/crm/empresa/editar/{{entity.idEmpresa}}" aria-label="Novo">
                                <i class="pi pi-pencil"></i>
                            </a>
                            <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger"
                                      (onClick)="confirmExcluir(entity,entity.idEmpresa,$event)"></p-button>
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
export class CrmEmpresasListComponent extends ListarOperacoesComuns<Empresa> implements OnInit {

    serviceL: CrmEmpresaService = inject(CrmEmpresaService);

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.filtrarBusca()
    }

    override getService(): FiltroServices<Empresa> {
        return this.serviceL;
    }

    override getMessageExcluir(entity: Contato): string {
        return 'Você tem certeza que deseja excluir a empresa ' + entity.nome + ' ?';
    }
}
