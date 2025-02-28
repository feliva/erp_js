import {Component, OnInit} from '@angular/core';
import {PanelMenuModule} from 'primeng/panelmenu';
import {BUILDER_MENU_CONTATO} from "../../crm/views/contato/contato.router";
import {BUILDER_MENU_EMPRESAS} from "../../crm/views/empresas/empresas.router";
import {BUILDER_MENU_MINHA_EMPRESA} from "../../minhaEmpresa/minhaEmpresa.router";
import {BreadCrumbMenuItem} from "../../components/breadcrumb/BreadCrumbMenuItem.class";

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
export class NavComponent implements OnInit {


    menus: BreadCrumbMenuItem[] =
        [
            // {
            //     label: 'Estoque',
            //     expanded: true,
            //     styleClass: 'rounded-none',
            // },
            {
                label: 'Minha Empresa',
                expanded: true,
                items:BUILDER_MENU_MINHA_EMPRESA.getMenuItems()
            },
            {
                label: 'CRM',
                expanded: true,
                items: BUILDER_MENU_CONTATO.getMenuItems()
                    .concat(BUILDER_MENU_EMPRESAS.getMenuItems())
            }

        ]

    ngOnInit() {
       // this.menus =  this.menus.concat(BUILDER_MENU_MINHA_EMPRESA.getMenuItems())
    }

    protected readonly console = console;
}
