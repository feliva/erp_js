
import {BuilderRoute} from "../../util/RouteUtil";
import {ProdutoBuscaComponent} from "./produto-busca.component";
import {ProdutoListarComponent} from "./produto-listar.component";
import {ProdutoFormComponent} from "./produto-form.component";

export const BUILDER_MENU_PRODUTO:BuilderRoute = new BuilderRoute('estoque/produto/')
  .redirectOfTo('produto','buscar')
    .localToRoot()
  .navOpen('Produto')
    .associateWithRote()
  .createLocal('Buscar Produto', 'buscar', ProdutoBuscaComponent, ['produto'])
    .first()
    .localToRoot()
  .createLocal('Lista de Produtos',  'listar/:termoBusca', ProdutoListarComponent, ['produto'])
    .localToRoot()
  .createLocal('Editar Produto','editar/:idProduto', ProdutoFormComponent, ['produto'])
    .localToRoot()
  .createLocal('Novo Produto','novo', ProdutoFormComponent, ['produto'])
    .addRouteData({ehNovo:true})
    .localToRoot()
;
