import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {PanelMenuModule} from 'primeng/panelmenu';
import {BUILDER_MENU_CONTATO} from "../../crm/views/contato/contato.router";
import {BUILDER_MENU_EMPRESAS} from "../../crm/views/empresas/empresas.router";

@Component({
    selector: 'app-nav',
    template: `
        <div class="size-app-nav ">
            <p-panelMenu [model]="menus" class="w-max"></p-panelMenu>
        </div>
    `,
    styles: [`

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
          styleClass:'rounded-none',      },
        {
            label:'CRM',
            expanded:true,
            items:BUILDER_MENU_CONTATO.getMenuItems()
                .concat(BUILDER_MENU_EMPRESAS.getMenuItems())
        }
    ]

  ngOnInit() {
  }

  protected readonly console = console;
}
