
import {Component, inject, OnInit} from "@angular/core";
import {AppMessageService} from "../service/app-message.service";
import {FiltroServices} from "../service/FiltroServices";
import {BreadcrumbService} from "../components/breadcrumb/breadcrumb.service";
import {Contato} from "../model/Contato";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Resposta} from "../model/Resposta";


export abstract class FormOperacoesComuns<T>{
    protected appMessage: AppMessageService = inject(AppMessageService);
    protected breadservice:BreadcrumbService = inject(BreadcrumbService);
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    protected router: Router = inject(Router);

    protected entity!:T;

    protected labelForm = 'Editar';
    protected formGroup!: FormGroup;
    protected formBuilder!: FormBuilder;

    protected ehNovo:boolean = false;

    constructor() {
        this.inicializaFormGroup(true);
    }

    onInit(): void {
        this.setEhNovo(!!this.activatedRoute?.snapshot.data['ehNovo'])

        if(this.isNovo()){
            this.inicializaCamposForm(true);
        }else{
            this.getService().findById(this.activatedRoute.snapshot.params['id']).subscribe((result) => {
                this.entity = result;
                this.inicializaCamposForm(false);
            })
        }
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
        return this.ehNovo;
    }

    setEhNovo(ehNovo:boolean){
        this.ehNovo = ehNovo;
        if(this.ehNovo){
            this.labelForm = 'Novo'
        }else{
            this.labelForm = 'Editar'
        }
    }

    onSubmit(event: SubmitEvent) {
        if (!this.formGroup.valid) {
            this.appMessage.addError('Existem pendências no cadastro.')
            return;
        }
        this.getService().save(this.formToObject()).subscribe((resp:Resposta<Contato>) => {
            this.onCancelarForm(null);
            this.appMessage.addSuccess(this.getMensagemSucessoSubmit())
        })
    }

    onCancelarForm(event: any) {
        if(!this.breadservice.back()){
            this.router.navigate([this.getUrlOnCancelarForm()]);
        }
    }
}