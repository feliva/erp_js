import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SharedModule} from "primeng/api";
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FieldsetModule} from "primeng/fieldset";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ListarOperacoesComuns} from "../shared/ListarOperacoesComuns";
import {FiltroServices} from "../service/FiltroServices";
import {Funcionario} from "../model/Funcionario";
import {FuncionarioService} from "./FuncionarioService";
import {AutoComplete, AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {InputNumber} from "primeng/inputnumber";
import {CidadeService} from "../service/cidade.service";
import {Cidade} from "../model/Cidade";


@Component({
    selector: 'funcionario-list',
    template: `

        <div class="div-btn-novo">
            <a class="p-ripple p-element p-button p-component p-button-icon-only p-button-rounded"
               routerLink="/minhaEmpresa/funcionarios/novo" aria-label="Novo">
                <i class="pi pi-plus"></i>
            </a>
        </div>

        <p-panel header="Filtros">
            <div class="grid gap-4  text-sm grid-cols-1 lg:grid-cols-3" [formGroup]="this.formGroupFilter" >
                <div class="md:col-span-1">
                    <label>Id</label>
                    <p-inputNumber class="w-full" formControlName="id" />
                </div>
                <div class="md:col-span-1">
                    <label>Nome</label>
                    <input pInputText type="text" formControlName="nome" class="w-full">
                </div>
                <div class="md:col-span-1">
                    <label>Cidade</label>
                    <p-autoComplete styleClass="w-full" formControlName="cidade"/>
                </div>
            </div>
            
            <div class="mt-3 inline-flex">
                <div class="mr-3">
                    <p-button label="Filtrar" (click)="this.filterFormGroup()"/>
                </div>
                <div class="mr-3">
                    <p-button label="Cancelar"  severity="secondary"/>
                </div>
            </div>

        </p-panel>

        <p-panel header="Lista de Funcionarios" styleClass="mt-2">
            <p-table [value]="entitys" [tableStyle]="{'min-width': '60rem'}"
                     [lazy]="true"
                     [paginator]="true"
                     [totalRecords]="totalRegistros"
                     [first]="this.tablePageEvent.first"
                     [rows]="this.tablePageEvent.rows"
                     [showCurrentPageReport]="true"
                     (onLazyLoad)="onLazyLoadFilterForm($event)"
                     (onPage)="onPage($event)"
                     currentPageReportTemplate="{first} para {last} de {totalRecords}"
                     [rowsPerPageOptions]="[30, 60, 120]"
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
                                            ariaLabel="Filtro Nome" display="menu" showMenu="true"></p-columnFilter>
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
                            <p-columnFilter type="text" field="cidade" placeholder="Cidade" ariaLabel="Filter cidade"
                                            display="menu"></p-columnFilter>
                        </th>
                        <th></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-entity>
                    <tr>
                        <th>{{ entity.idFuncionario }}</th>
                        <th>{{ entity.pessoa.nome }}</th>
                        <th>{{ entity.email }}</th>
                        <th>{{ entity.celular }}</th>
                        <th>{{ entity.endereco?.cidade?.nome }}</th>
                        <th>
                            <a class="p-ripple p-element p-button p-component p-button-icon-only p-button-rounded p-button-text"
                               routerLink="/crm/contato/editar/{{entity.idFuncionario}}" aria-label="Novo">
                                <i class="pi pi-pencil"></i>
                            </a>
                            <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" (onClick)="confirmExcluir(entity,entity.idFuncionario,$event)"></p-button>
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
    imports: [PanelModule, TableModule, SharedModule, ButtonModule, InputTextModule, PaginatorModule, FieldsetModule, ReactiveFormsModule, RouterLink, ConfirmDialogModule, AutoComplete, InputNumber]
})
export class FuncionarioListComponent extends ListarOperacoesComuns<Funcionario> implements OnInit {

    service: FuncionarioService = inject(FuncionarioService);
    cidadeService:CidadeService = inject(CidadeService)
    ss = inject(ActivatedRoute)

    cidadeList?:Cidade[] = []

    constructor() {
        super();
        this.formGroupFilter = new FormGroup({
            id: new FormControl(null),
            nome: new FormControl(''),
            cidade: new FormControl(''),
        });
    }

    ngOnInit(): void {

    }

    filterContato(event:AutoCompleteCompleteEvent) {
        this.cidadeList = [];
        this.cidadeService.autocomplete(event.query).subscribe(res => {
            this.cidadeList = res.dados;
        });
    }

    filterFormGroup() {
        this.service.formFilter({
            first:this.tablePageEvent.first,
            rows:this.tablePageEvent.rows,
            listFilter: this.formGroupFilter?.getRawValue(),
            listSort:{}
        }).subscribe(teste=>{
            this.entitys = teste;
        });
    }

    override getService(): FiltroServices<Funcionario> {
        return this.service;
    }

    override getMessageExcluir(entity: Funcionario): string {
        return `Você tem certeza que deseja excluir o funcionario ${entity.idFuncionario} - ${entity.pessoa?.nome}  ?`;
    }
}
