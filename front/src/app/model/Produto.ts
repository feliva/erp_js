import {Unidade} from "./Unidade";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Marca} from "./Marca";
import {Categoria} from "./Categoria";
import {Status} from "./Status";

export class Produto{
// export class Produto{
  idProduto: number | undefined ;
  nome:string| undefined ;
  valorVenda:number = 0;
  valorCusto:number = 0;
  unidadeVenda:Unidade | undefined = undefined;
  unidadeCompra:Unidade | undefined = undefined;
  marca:Marca |undefined = undefined
  categoria:Categoria |undefined = undefined
  codigoBarras:number|undefined = undefined;
  descricao:string | undefined = undefined;
  status:Status | undefined = undefined;

  getOptionDescricao(){
    console.log('getOptionDescricao()')
    return ''+ this.idProduto + this.nome;
  }

  static getOptionLabel(item:Produto):string {
       return '' + item.idProduto + ' - ' +item.nome+ '-' + item?.unidadeCompra?.sigla;
  }

  static createFormGoup() {
    return new FormGroup({
      idProduto:      new FormControl(''),
      nome:           new FormControl('', [Validators.required]),
      valorVenda:     new FormControl('', [Validators.required]),
      valorCusto:     new FormControl('', [Validators.required]),
      unidadeVenda:   new FormControl('', [Validators.required]),
      unidadeCompra:  new FormControl('', [Validators.required]),
      marca:          new FormControl('', [Validators.required]),
      categoria:      new FormControl('', [Validators.required]),
      codigoBarras:   new FormControl('', [Validators.required]),
      descricao:      new FormControl('', []),
      status:         new FormControl('', [Validators.required]),
    });
  }
}

