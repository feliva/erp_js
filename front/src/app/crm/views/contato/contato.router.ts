import {BuilderRoute} from "../../../util/RouteUtil";
import {CrmContatoListComponent} from "./crm-contato-list.component";
import {CrmContatoFormComponent} from "./crm-contato-form.component";

export const BUILDER_MENU_CONTATO:BuilderRoute = new BuilderRoute('crm/contato/')
  .redirectOfTo('','listar').localToRoot()
  .navOpen('Contato').associateWithRote()
        .createLocal('Lista de Contatos',  'listar', CrmContatoListComponent, ['contato']).resetFlag().localToRoot()
        .createLocal('Lista de Contatos',  'listar/:termoBusca', CrmContatoListComponent, ['contato']).localToRoot()
        .createLocal('Novo Contato',  'novo', CrmContatoFormComponent, ['contato']).addRouteData({ehNovo:true}).localToRoot()
        .createLocal('Editar Contato',  'editar/:id', CrmContatoFormComponent, ['contato']).addRouteData({ehNovo:false}).localToRoot()
    // .createLocal('Editar Unidade', 'unidade/editar/:idUnidade', UnidadeFormComponent, ['unidade']).localToRoot()
;
