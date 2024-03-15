import {Component} from '@angular/core';


@Component({
  selector: 'app-main',
  template: `
    <app-breadcrumb></app-breadcrumb>
    <router-outlet></router-outlet>
  `,
  styles: [`
    app-main{

    }
  `]
})
export class MainComponent {

}
