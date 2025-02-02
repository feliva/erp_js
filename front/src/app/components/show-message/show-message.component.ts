import {Component} from '@angular/core';
import {ShowMessageService} from './show-message.service';
import {KeyValuePipe, NgClass, NgFor} from '@angular/common';

@Component({
    selector: 'app-show-message',
    template: `
  <div class="grow">
    <div *ngFor="let item of this.showMessageService.msgs | keyvalue" class="flex flex-row" [ngClass]="item.value.type" style="animation: fade 1s">
      <div class="icone flex items-center justify-center"  pAnimateOnScroll enterClass="animate-fadein" leaveClass="animate-fadeout" >
      <i [ngClass]="item.value.icon"></i>
      </div>
      <div class="flex flex-col">
        <h3 class="title"><b>{{item.value.title}}</b></h3>
        <span class="msg">{{item.value.msg}}</span>
      </div>
    </div>
  </div>
  `,
    styles: [`
    :host {
      @keyframes slidedown-icon {
        0% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(20px);
        }

        100% {
          transform: translateY(0);
        }
      }

      .slidedown-icon {
        animation: slidedown-icon;
        animation-duration: 3s;
        animation-iteration-count: infinite;
      }

      .box {
        background-image: radial-gradient(var(--primary-300), var(--primary-600));
        border-radius: 50% !important;
        color: var(--primary-color-text);
      }
    }

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

  `],
    standalone: true,
    imports: [NgFor, NgClass, KeyValuePipe]
})
export class ShowMessageComponent {

  constructor(public showMessageService:ShowMessageService){}
}
