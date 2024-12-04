
import {inject, OnInit} from "@angular/core";
import {ConfirmationService} from "primeng/api";
import {AppMessageService} from "../service/app-message.service";
import {TableLazyLoadEvent, TablePageEvent} from "primeng/table";
import {FiltroServices} from "../service/FiltroServices";
import {BreadcrumbService} from "../components/breadcrumb/breadcrumb.service";
import {Contato} from "../model/Contato";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Resposta} from "../model/Resposta";

export abstract class FormOperacoesComuns<T>{
    protected appMessage: AppMessageService = inject(AppMessageService);
    protected breadservice:BreadcrumbService = inject(BreadcrumbService);
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    protected router: Router = inject(Router);

    protected entity!:T;

    protected labelForm = 'Editar';
    protected formGroup!: FormGroup;

    constructor() {
        this.inicializaFormGroup(true);
    }

    //faz as chamada ajax necessrias
    // public abstract carregaDadosForm():void;
    public abstract getService():FiltroServices<T>;
    public abstract inicializaCamposForm(ehNovo:boolean):void;
    public abstract getUrlOnCancelarForm():string;
    public abstract getMensagemSucessoSubmit():string;
    public abstract formToObject():T;
    public abstract inicializaFormGroup(clean:boolean): void;


    isNovo(){
        return (!!this.activatedRoute?.snapshot.data['ehNovo']);
    }

    /**
     * Chamar este metodo no ngOnInit
     */
    onInit() {
        if(this.isNovo()){
            this.labelForm = 'Novo';
            this.inicializaCamposForm(true);
        }else{
            this.getService().findById(this.activatedRoute.snapshot.params['id']).subscribe((result) => {
                this.entity = result;
                this.inicializaCamposForm(false);
            })
        }
    }

    onSubmit(event: SubmitEvent) {
        if (!this.formGroup.valid) {
            this.appMessage.addError('', 'Existem pendências no cadastro.')
            return;
        }
        this.getService().save(this.formToObject()).subscribe((resp:Resposta<Contato>) => {
            this.onCancelarForm(null);
            this.appMessage.addSuccess('', this.getMensagemSucessoSubmit())
        })
    }

    onCancelarForm(event: any) {
        if(!this.breadservice.back()){
            this.router.navigate([this.getUrlOnCancelarForm()]);
        }
    }
}