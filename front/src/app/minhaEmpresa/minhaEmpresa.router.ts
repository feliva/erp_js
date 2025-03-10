import {BuilderRoute} from "../util/RouteUtil";
import {FuncionarioListComponent} from "./FuncionarioListComponent";
import {FuncionarioFormComponent} from "./FuncionarioForm.component";

export const BUILDER_MENU_MINHA_EMPRESA:BuilderRoute = new BuilderRoute('')
  .redirectOfTo('','listar').localToRoot()
  .navOpen('Funcionário').associateWithRote()
        .createLocal('Lista de Funcionário',  'funcionarios/listar', FuncionarioListComponent, ['minhaEmpresa']).resetFlag().localToRoot()
        .createLocal('Novo Funcionário',  'funcionarios/novo', FuncionarioFormComponent, ['minhaEmpresa']).addRouteData({ehNovo:true}).localToRoot()
        .createLocal('Editar Funcionário',  'funcionarios/editar/:id', FuncionarioFormComponent, ['minhaEmpresa']).addRouteData({ehNovo:false}).localToRoot()
  .navOpen('Minhas Empresas').associateWithRote()
        .createLocal('Lista de Empresas',  'minhasempresas/listar', FuncionarioListComponent, ['minhaEmpresa']).resetFlag().localToRoot()
        // .navCloseChildren()
        // .navOpenChildren('1')
        // .createLocal('Editar Funcionário',  'editar/:id', FuncionarioFormComponent, ['minhaEmpresa']).addRouteData({ehNovo:false}).localToRoot()
    // .createLocal('Editar Unidade', 'unidade/editar/:idUnidade', UnidadeFormComponent, ['unidade']).localToRoot()
;
