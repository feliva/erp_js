import {Unidade} from "./Unidade";
import {
  AsyncValidatorFn,
  FormControl,
  FormControlOptions,
  FormControlState,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {TipoMovimentacao} from "./TipoMovimentacao";
import {Armazenagem} from "./Armazenagem";
import {TipoJustufucativaMovimentacao} from "./TipoJustufucativaMovimentacao";
import {Produto} from "./Produto";

export class Movimentacao {
  idMovimentacao!: number;
  descricao!: string ;
  dtMovimentacao!: Date ;
  tipoMovimentacao!: TipoMovimentacao;
  armazenagem: Armazenagem = new Armazenagem();
  tipoJustificativaMovimentacao!: TipoJustufucativaMovimentacao;
  produto!: Produto;
  quantidade!: number;


  getDtMovimentacao():string{
    return 'formatter.format(this.dtMovimentacao)';
  }

  static converteToInstance(obj:any):Movimentacao{
    let mov = new Movimentacao()
    mov.idMovimentacao = Number.parseInt(obj?.idMovimentacao)
    mov.descricao = obj?.descricao
    mov.dtMovimentacao = new Date(obj?.dtMovimentacao)
    mov.tipoMovimentacao = obj?.tipoMovimentacao
    mov.armazenagem = obj?.armazenagem
    mov.tipoJustificativaMovimentacao = obj?.tipoJustificativaMovimentacao
    mov.quantidade = Number.parseInt(obj?.quantidade)
    mov.produto = obj?.produto

    return mov;
  }

  static createFormGroup(disabled:boolean) {
    return new FormGroup({
      idProduto: new FormControl({value:'', disabled:disabled}),
      descricao: new FormControl({value:'', disabled:disabled}),
      dtMovimentacao: new FormControl({value:'', disabled:disabled}, [Validators.required]),
      tipoMovimentacao: new FormControl({value:'', disabled:disabled}, [Validators.required]),
      armazenagem: new FormControl({value:'', disabled:disabled}, [Validators.required]),
      tipoJustificativaMovimentacao: new FormControl({value:'', disabled:disabled}, [Validators.required]),
      // produto: new FormControl<object|null>(null,[Validators.required]),
      // quantidade: new FormControl('', [Validators.required]),
      // itensMovimentacao: new FormControl('', [Validators.required]),
    });
  }
}


export class LFormControl<T = any> extends FormControl{

  label:string|undefined;

  constructor(label:string,value: FormControlState<T> | T, validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(value,validatorOrOpts,asyncValidator);
    this.label = label;
  }
}

export class ItemMovimentacao {
  produto!: Produto;
  quantidade!: number;

  /**
   * emEstque o preenchimento é a apicação que faz
   */
  emEstoque!: number;

  static createFormGroup() {
    return new FormGroup({
      produto: new FormControl<object|null>(null,[Validators.required]),
      quantidade: new FormControl('', [Validators.required,Validators.min(1)]),
      emEstoque: new FormControl({value:0,disabled:true}, Validators.required),
    });
  }
}

