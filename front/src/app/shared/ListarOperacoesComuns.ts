
import {inject} from "@angular/core";
import {ConfirmationService} from "primeng/api";
import {AppMessageService} from "../service/app-message.service";
import {TableLazyLoadEvent, TablePageEvent} from "primeng/table";
import {FiltroServices} from "../service/FiltroServices";

export abstract class ListarOperacoesComuns<T> {

    protected confirmationService: ConfirmationService = inject(ConfirmationService);
    protected appMessage:AppMessageService = inject(AppMessageService);

    protected expandFiltro:boolean = false;

    protected totalRegistros:number = 0;

    protected rowsPage = 10;

    protected entitys:T[] = [];

    constructor() {
    }

    abstract getService():FiltroServices<T>;
    abstract getMessageExcluir(entity:T):string;


    toggle(event:any){
        this.expandFiltro = !this.expandFiltro;
        console.log(this.expandFiltro)
    }

    onLazyLoad(event: TableLazyLoadEvent){
        this.totalRegistros = this.getService().paginadoCount();
        this.getService().listAll().subscribe((dados)=>{
            this.entitys = dados;
            this.totalRegistros += this.entitys.length;
        });
    }

    onPage(event:TablePageEvent){
        this.rowsPage = event.rows;
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
        this.totalRegistros = this.getService().paginadoCount();
        this.getService().paginado1((data)=>{ this.entitys = data})
    }

    excluir(id:number){
        this.getService().delete(id).subscribe(()=>{
            this.appMessage.addSuccess('','Contato excluído com sucesso.')
            this.filtrarBusca();
        });
    }

    limpaFiltros(){
        this.getService().limpaFiltros();
        this.filtrarBusca();
    }
}