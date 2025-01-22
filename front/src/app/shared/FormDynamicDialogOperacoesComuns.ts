import {Component, inject} from "@angular/core";
import {Contato} from "../model/Contato";
import {Resposta} from "../model/Resposta";
import {FormOperacoesComuns} from "./FormOperacoesComuns";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    template: '',
    standalone: false
})
export abstract class FormDynamicDialogOperacoesComuns<T> extends FormOperacoesComuns<T>{

    editando:boolean = false;

    ref: DynamicDialogRef | null = inject(DynamicDialogRef,{ optional: true })
    dynamicDialogConfig:DynamicDialogConfig = inject(DynamicDialogConfig)

    constructor() {
        super()
    }

    /**
     * Chamar este metodo no ngOnInit
     */
    override onInit() {
        if(this.ref){
            let idEntity = this.dynamicDialogConfig.data?.idEntity;
            this.setEhNovo((!idEntity));
            if(this.ehNovo) {
                this.inicializaCamposForm(true);
            }else{
                // setInterval(()=> {
                    this.getService().findById(idEntity).subscribe((result) => {
                        this.entity = result;
                        this.inicializaCamposForm(false);
                    // }),0
                })
            }
        }else{
            super.onInit();
        }
    }

    select(){
        this.ref?.close(this.entity);
    }

    override onSubmit(event: SubmitEvent) {
        if (!this.formGroup.valid) {
            this.appMessage.addError('Existem pendências no cadastro.')
            return;
        }
        this.getService().save(this.formToObject()).subscribe((resp:Resposta<Contato>) => {
            this.onCancelarForm(null);
            this.ref?.close(this.entity);
            this.appMessage.addSuccess(this.getMensagemSucessoSubmit())
        })
    }

    override onCancelarForm(event: any) {
        if(!this.ref){
            super.onCancelarForm(event);
            return
        }

    }

}