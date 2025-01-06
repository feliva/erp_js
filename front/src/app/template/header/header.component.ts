import {Component} from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-header',
    template: `
        <div class="flex">
            <div class="logo size-app-nav header">
                <div class="sdiv"></div>
                <span class="name-sys">Feliva</span>
            </div>
            <div class="size-app-nav header w-full sombra  flex flex-row-reverse items-center pr-12">
                <div>
                    <p-avatar shape="circle" size="large"
                              image="https://www.cetroconcursos.org.br/wp-content/uploads/2023/08/fotos-tristes-para-perfil-do-whatsapp-feminino-.webp"
                    ></p-avatar>
                </div>
                <div value="2" pBadge class="mr-2">
                    <p-avatar severity="info" shape="circle" size="large" icon="pi pi-bell"
                    ></p-avatar>
                </div>
            </div>
        </div>
    `,
    styles: [`
      .logo {
        height: var(--size-header);
        padding-left: 20px;
        min-width: var(--size-app-nav);
      }

      .sdiv {
        position: absolute;
        top: 5px;
        height: 49px;
        width: 101px;
        box-shadow: -4px 4px 0px 2px var(--color-logo);
        border-radius: 50%;
      }

      .name-sys {
        position: absolute;
        top: 18px;
        left: 30px;
        color: var(--color-logo);
        font-size: 22pt;
        font-family: unset;
      }

      .header {
        height: var(--size-header);
      }

      .sombra {
        box-shadow: 0px 2px 5px 1px rgba(51, 51, 51, 0.36);
      }
    `],
    standalone: true,
    imports: [AvatarModule, BadgeModule]
})
export class HeaderComponent {

}
