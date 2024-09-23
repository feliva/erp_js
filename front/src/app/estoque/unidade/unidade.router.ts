import {BuilderRoute} from "../../util/RouteUtil";
import {UnidadeBuscaComponent} from "./unidade-busca.component";
import {UnidadeListComponent} from "./unidade-list.component";
import {UnidadeFormComponent} from "./unidade-form.component";

export const BUILDER_MENU_UNIDADE:BuilderRoute = new BuilderRoute('')
  .redirectOfTo('unidade','estoque/unidade/buscar').localToRoot()
  .navOpen('Unidade').associateWithRote()
    .createLocal('Buscar Unidade', 'unidade/buscar', UnidadeBuscaComponent, ['unidade']).localToRoot()
    .createLocal('Lista Unidades',  'unidade/listar/:termoBusca', UnidadeListComponent, ['unidade']).localToRoot()
    .createLocal('Editar Unidade', 'unidade/editar/:idUnidade', UnidadeFormComponent, ['unidade']).localToRoot()
;
