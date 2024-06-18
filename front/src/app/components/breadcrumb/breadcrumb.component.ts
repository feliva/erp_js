import {Component} from '@angular/core';
import {BreadcrumbService} from './breadcrumb.service';
import {BreadCrumbMenuItem} from "./BreadCrumbMenuItem.class";
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-breadcrumb',
    template: `
    <div class="ui-panelmenu">
      <div class="p-element max-w-full">
        <div class="p-breadcrumb p-component">
          <ul class="p-breadcrumb-list" >
            <li class="p-element p-breadcrumb-home ng-star-inserted">
              <a class="pi pi-home" href="/" ></a>
            </li>
            <li *ngFor="let item of this.getMenuItens()" class="p-element p-breadcrumb-home ng-star-inserted {{item.styleClass}}">
              <a class="{{item.icon}}" href="{{item.url}}" (click)="this.navigate($event,item)">{{item.label}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .p-breadcrumb .p-breadcrumb-list {
      margin: 0;
      padding: 0;
      list-style-type: none;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }


  `],
    standalone: true,
    imports: [NgFor]
})
export class BreadcrumbComponent {

  constructor(private breadService:BreadcrumbService) {}

  public getMenuItens(){
    return this.breadService.mm;
  }

  public navigate(event:Event,item:BreadCrumbMenuItem){
    this.breadService.navigate(item)
    event.preventDefault();
  }
}
