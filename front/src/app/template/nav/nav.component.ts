import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {BUILDER_MENU_UNIDADE} from "../../estoque/unidade/unidade-routing.module";
import {BUILDER_MENU_PRODUTO} from "../../estoque/produto/produto-routing.module";
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
    selector: 'app-nav',
    template: `
    <div class="size-app-nav">
        <p-panelMenu [model]="menus" class="w-max"></p-panelMenu>
    </div>
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
  `],
    standalone: true,
    imports: [PanelMenuModule]
})
export class NavComponent implements OnInit{

  menus:MenuItem[] =
    [
      {
        label:'Estoque',
        expanded:true,
        items:BUILDER_MENU_UNIDADE.getMenuItems().concat(BUILDER_MENU_PRODUTO.getMenuItems())
      },
    ]

  ngOnInit() {

  }

  protected readonly console = console;
}
