import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';


@Component({
    selector: 'app-main',
    template: `
      <div class="pl-2 pt-2">
        <app-breadcrumb ></app-breadcrumb>
      </div>
      <div class="pl-2 pt-2">
        <router-outlet></router-outlet>
      </div>
  `,
    styles: [`
    .ssd > :not(marquee){
      margin-bottom: 5px;
    }
  `],
    standalone: true,
    imports: [BreadcrumbComponent, RouterOutlet]
})
export class MainComponent {

}
