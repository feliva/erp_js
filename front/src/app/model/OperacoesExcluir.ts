import {Produto} from "./Produto";

export interface OperacoesExcluir<T> {
  reloadResultSearch():void;
  confirmExcluir(excluir:T,event:Event):void;
}
