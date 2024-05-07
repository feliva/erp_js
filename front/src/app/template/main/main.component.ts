import {Component} from '@angular/core';


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
  `]
})
export class MainComponent {

}
