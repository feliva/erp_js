import {Component} from '@angular/core';
import {ShowMessageService} from './show-message.service';

@Component({
  selector: 'app-show-message',
  template: `
  <div class="grow">
    <div *ngFor="let item of this.showMessageService.msgs | keyvalue" class="flex flex-row" [ngClass]="item.value.type">
      <div class="icone flex align-items-center justify-content-center">
      <i [ngClass]="item.value.icon"></i>
      </div>
      <div class="flex flex-column">
        <h3 class="title"><b>{{item.value.title}}</b></h3>
        <span class="msg">{{item.value.msg}}</span>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .grow{
      position: absolute;
      /* right: 0; */
      padding: 1rem;
      background-color: transparent;
      z-index:100;
    }

    .grow >div{
      margin-bottom: 1rem;
      padding:.75rem;
      min-width:250px;
      min-height:50px;
      background-color:#fff;
      border-radius: 5px;
    }

    .grow .icone{
      padding:0 1rem 0 1rem;
    }
    .grow i{
      font-size: 2rem
    }

    .grow > .success{
      background:#d4edda;
      border:1px solid #c3e6cb;
      color:#155724;
      border-left:5px  solid #155724
    }

    .grow .error{
      background:#f8d7da;
      border:1px solid #f5c6cb;
      color:#721c24;
      border-left:5px  solid #721c24
    }

    .grow .warn{
      background:#fff3cd;
      border:1px solid #ffeeba;
      color:#856404;
      border-left:5px  solid #856404
    }

    .grow .info{
      background:#cce5ff;
      border:1px solid #b8daff;
      color:#004085;
      border-left:5px  solid #004085
    }

  `]
})
export class ShowMessageComponent {

  constructor(public showMessageService:ShowMessageService){}
}
