
import {BuilderRoute} from "../../util/RouteUtil";
import {MovimentacaoBuscaComponent} from "./movimentacao-busca.component";
import {MovimentacaoListarComponent} from "./movimentacao-listar.component";
import {MovimentacaoFormComponent} from "./movimentacao-form.component";

export const BUILDER_MENU_MOVIMENTACAO:BuilderRoute = new BuilderRoute('estoque/movimentacao/')

  .navOpen('Movimentação(E/S)')
    .associateWithRote()
  .createLocal('Buscar movimentação', 'buscar', MovimentacaoBuscaComponent, [])
    .first()
    .localToRoot()
  .createLocal('Lista de movimentações',  'listar/:termoBusca', MovimentacaoListarComponent, [])
    .localToRoot()
  .createLocal('Editar Movimentação','editar/:idMovimentacao', MovimentacaoFormComponent, [])
    .addRouteData({ehNovo:false})
    .localToRoot()
  .createLocal('Nova movimentação','novo', MovimentacaoFormComponent, [])
    .addRouteData({ehNovo:true})
    .localToRoot()
;
