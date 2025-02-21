import {BuilderRoute} from "../util/RouteUtil";
import {FuncionarioListComponent} from "./FuncionarioListComponent";
import {FuncionarioFormComponent} from "./FuncionarioForm.component";

export const BUILDER_MENU_MINHA_EMPRESA:BuilderRoute = new BuilderRoute('minhaEmpresa/')
  .redirectOfTo('','listar').localToRoot()
  .navOpen('Funcionários').associateWithRote()
        .createLocal('Lista de Funcionário',  'funcionarios/listar', FuncionarioListComponent, ['minhaEmpresa']).resetFlag().localToRoot()
        .createLocal('Novo Funcionário',  'funcionarios/novo', FuncionarioFormComponent, ['minhaEmpresa']).addRouteData({ehNovo:true}).localToRoot()
        // .createLocal('Editar Funcionário',  'editar/:id', FuncionarioFormComponent, ['minhaEmpresa']).addRouteData({ehNovo:false}).localToRoot()
    // .createLocal('Editar Unidade', 'unidade/editar/:idUnidade', UnidadeFormComponent, ['unidade']).localToRoot()
;
