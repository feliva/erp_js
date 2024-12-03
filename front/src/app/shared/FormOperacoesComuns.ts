
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

export abstract class FormOperacoesComuns<T> {
    protected appMessage: AppMessageService = inject(AppMessageService);
    protected breadservice:BreadcrumbService = inject(BreadcrumbService);
    activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    router: Router = inject(Router);

    protected entity!:T;

    labelForm = 'Editar';
    formGroup!: FormGroup;

    constructor() {
        //para inicializar o formFroup, sen essa call ele da erro
        this.inicializaFormGroup(undefined);
    }

    //faz as chamada ajax necessrias
    public abstract carregaDadosForm():void;
    public abstract getService():FiltroServices<T>;
    public abstract inicializaFormGroup(entity:T|undefined):void;
    public abstract getUrlOnCancelarForm():string;
    public abstract getMensagemSucessoSubmit():string;


    isNovo(){
        return (!!this.activatedRoute?.snapshot.data['ehNovo']);
    }

    /**
     * Chamar este metodo no ngOnInit
     */
    init() {
        if(this.isNovo()){
            this.labelForm = 'Novo';
            this.inicializaFormGroup(undefined);
        }else{
            this.getService().findById(this.activatedRoute.snapshot.params['id']).subscribe((result) => {
                this.entity = result;
                this.inicializaFormGroup(result);
            })
        }
        this.carregaDadosForm();
    }

    onSubmit(event: SubmitEvent) {
        if (!this.formGroup.valid) {
            this.appMessage.addError('', 'Existem pendências no cadastro.')
            return;
        }
        this.getService().save(this.formGroup.value).subscribe((resp:Resposta<Contato>) => {
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