import {CrmContatoListComponent} from "./crm-contato-list.component";
import {BuilderRoute} from "../util/RouteUtil";

export const BUILDER_MENU_MINHA_EMPRESA:BuilderRoute = new BuilderRoute('crm/minhaEmpresa/')
  .redirectOfTo('','listar').localToRoot()
  .navOpen('Minha Empresa').associateWithRote()
        .createLocal('Lista de Funcionário',  'listarFuncionario', CrmContatoListComponent, ['minhaEmpresa']).resetFlag().localToRoot()
        // .createLocal('Novo Funcionário',  'novo', FuncionarioFormComponent, ['minhaEmpresa']).addRouteData({ehNovo:true}).localToRoot()
        // .createLocal('Editar Funcionário',  'editar/:id', FuncionarioFormComponent, ['minhaEmpresa']).addRouteData({ehNovo:false}).localToRoot()
    // .createLocal('Editar Unidade', 'unidade/editar/:idUnidade', UnidadeFormComponent, ['unidade']).localToRoot()
;
