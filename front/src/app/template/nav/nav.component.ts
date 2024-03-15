import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {BUILDER_MENU_UNIDADE} from "../../estoque/unidade/unidade-routing.module";

@Component({
  selector: 'app-nav',
  template: `
    <div class="ui-panelmenu">
      <h3 class="ui-panelmenu-header">
        <a href="#" class="ui-menuitem-link">
          <span class="ui-menuitem-icon ui-icon pi pi-angle-down"></span>
          <span class="ui-menuitem-text">Grupo</span>
        </a>
      </h3>
      <div class="ui-panelmenu-content ">
        <ul class="ui-menu-list">
          <li >
            <a class="ui-menuitem-link" routerLink="/user/buscar">
              <span class="ui-menuitem-icon ui-icon pi pi-user"></span>
              <span class="ui-menuitem-text">Usuários</span>
            </a>
          </li>
          <li >
            <a class="ui-menuitem-link" routerLink="/usuarios/form">
              <span class="ui-menuitem-icon ui-icon pi pi-refresh"></span>
              <span class="ui-menuitem-text">User form</span>
            </a>
          </li>
          <li>
            <a class="ui-menuitem-link ui-corner-all" href="#">
              <span class="ui-menuitem-icon ui-icon pi pi-times"></span>
              <span class="ui-menuitem-text">Link 3</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="ui-panelmenu">
      <h3 class="ui-panelmenu-header">
        <a href="#" class="ui-menuitem-link">
          <span class="ui-menuitem-icon ui-icon pi pi-angle-down"></span>
          <span class="ui-menuitem-text">Estoque</span>
        </a>
      </h3>
      <div class="ui-panelmenu-content ">
        <ul class="ui-menu-list">
          <li >
            <a class="ui-menuitem-link" routerLink="/user/buscar">
              <span class="ui-menuitem-icon ui-icon pi pi-user"></span>
              <span class="ui-menuitem-text">Consulta</span>
            </a>
          </li>
          <li >
            <a class="ui-menuitem-link" routerLink="/usuarios/form">
              <span class="ui-menuitem-icon ui-icon pi pi-refresh"></span>
              <span class="ui-menuitem-text">Entrada/Saída</span>
            </a>
          </li>
          <li>
            <a class="ui-menuitem-link ui-corner-all" href="#">
              <span class="ui-menuitem-icon ui-icon pi pi-times"></span>
              <span class="ui-menuitem-text">Transferência</span>
            </a>
          </li>
          <li>
            <a class="ui-menuitem-link ui-corner-all" href="#">
              <span class="ui-menuitem-icon ui-icon pi pi-times"></span>
              <span class="ui-menuitem-text">Produtos</span>
            </a>
          </li>
          <li>
            <a class="ui-menuitem-link ui-corner-all" href="#">
              <span class="ui-menuitem-icon ui-icon pi pi-times"></span>
              <span class="ui-menuitem-text">Transferência</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <p-panelMenu [model]="menus"></p-panelMenu>
  `,
  styles: [`
     .ui-panelmenu > a, span{
      color: rgb(65, 58, 58);
    }
     .ui-panelmenu h3.ui-panelmenu-header a {
      padding: 0;
      outline: 0 none;
      vertical-align: middle;
    }

     .ui-panelmenu h3.ui-panelmenu-header {
      border: 1px solid #dee2e6;
      background: #f8f9fa;
      padding: 1rem;
      font-weight: 700;
      font-size: 1rem;
    }

     .ui-panelmenu .ui-menuitem-link {
      padding: 0.75rem 0 0.75rem 2rem;
      transition: background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s;
    }

    .ui-panelmenu .ui-menuitem-link {
      display: block;
      text-decoration: none;
      font-weight: 400;
      border: solid 1px transparent;
      line-height: 10px;
      cursor: pointer;
    }


    .ui-panelmenu .ui-panelmenu-content {
      padding: 0.25rem 0;
      background: #fff;
      border: 1px solid #dee2e6;
      margin-top: 0;
      position: static;
      border-top: 0 none;
    }

     .ui-panelmenu .ui-panelmenu-content .ui-menuitem-link span {
      vertical-align: middle;
      margin-right: 0.5rem;
    }

     .ui-panelmenu h3.ui-panelmenu-header span{
      margin-right: 0.5rem;
      font-weight: 700;
    }
  `]
})
export class NavComponent implements OnInit{

  menus:MenuItem[] = [BUILDER_MENU_UNIDADE.getMenuItems()];
  //   [
  //   {
  //     label:'Estoque',
  //     expanded:true,
  //     // icon: 'pi pi-fw pi-plus',
  //     items:[
  //       {
  //         label:'Consulta',
  //         routerLink:'/user/buscar'
  //       },
  //       {
  //         label: 'Entrada/Saída'
  //       },
  //       {
  //         label:'Locais'
  //       },
  //       {
  //         label:'Tranferência'
  //       },
  //       {
  //         label:'Configurações',
  //         expanded:true,
  //         items:[
  //           {
  //             label:'Unidades',
  //             routerLink:'/estoque/unidades'
  //           },
  //           {
  //             label:'Marcas',
  //             routerLink:'/estoque/marcas'
  //           },
  //           {
  //             label:'Categorias',
  //             routerLink:'/estoque/categorias'
  //           },
  //           {
  //             label:'Produtos',
  //             routerLink:'/estoque/produtos'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]
  // ;

  ngOnInit() {

  }

}
