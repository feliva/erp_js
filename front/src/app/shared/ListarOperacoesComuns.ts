import {inject} from "@angular/core";
import {ConfirmationService} from "primeng/api";
import {AppMessageService} from "../service/app-message.service";
import {TableLazyLoadEvent, TablePageEvent} from "primeng/table";
import {FiltroServices} from "../service/FiltroServices";
import {forkJoin} from "rxjs";

export abstract class ListarOperacoesComuns<T> {

    protected confirmationService: ConfirmationService = inject(ConfirmationService);
    protected appMessage:AppMessageService = inject(AppMessageService);
    protected expandFiltro:boolean = false;
    protected totalRegistros:number = 0;

    protected entitys:T[] = [];
    protected tablePageEvent:TablePageEvent = {first:0,rows:20};
    protected lastTableLazyLoadEvent:TableLazyLoadEvent = {};

    constructor() {
    }

    abstract getService():FiltroServices<T>;
    abstract getMessageExcluir(entity:T):string;

    toggle(event:any){
        this.expandFiltro = !this.expandFiltro;
    }

    onLazyLoad(event: TableLazyLoadEvent){
        this.lastTableLazyLoadEvent = event;
        console.log(event)

        forkJoin({
            lCount:this.getService().tableLazyLoadCount(event),
            lPaginado: this.getService().tableLazyLoad(event)
        }).subscribe(({lCount,lPaginado}) => {
            this.totalRegistros = lCount;
            this.entitys = lPaginado;
        });
    }

    confirmExcluir(entity:T,id:number,event:Event){
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: this.getMessageExcluir(entity),
            header: 'Excluir',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel:"Excluir",
            rejectLabel:"Cancelar",
            rejectButtonStyleClass:"p-button-text",
            acceptButtonStyleClass:"p-button-danger",
            accept: () => {
                if(id)
                    this.excluir(id);
            }
        });
    }

    filtrarBusca() {
        //remover depois
        // forkJoin({
        //     lCount:this.getService().paginadoCount(this.criaQueryParams()),
        //     lPaginado: this.getService().paginado(this.criaQueryParams())
        // }).subscribe(({lCount,lPaginado}) => {
        //     this.totalRegistros = lCount;
        //     this.entitys = lPaginado;
        // });
    }

    excluir(id:number){
        this.getService().delete(id).subscribe(()=>{
            this.appMessage.addSuccess('Contato excluído com sucesso.')
            this.onLazyLoad(this.lastTableLazyLoadEvent)
        });
    }

    limpaFiltros(){
        // this.getService().limpaFiltros();
        // this.filtrarBusca();
    }

    onPage(event:TablePageEvent){
        this.tablePageEvent = event
    }
}