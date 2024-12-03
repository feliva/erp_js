export class Resposta<T>{
  dados:T|undefined;
  erro:any;
  mensagenErros:string[]|undefined;
}
