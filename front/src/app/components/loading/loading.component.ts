import {Component, inject} from '@angular/core';
import {LoadingService} from "../loading.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="this.loadingService.carregando" class="cssload-container">
      <div class="cssload-speeding-wheel"></div>
    </div>
  `,
  styles: [`
    .cssload-container {
      position: fixed;
      width: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.3);
      z-index: 9999;
    }

    .cssload-speeding-wheel {
      content: "";
      display: block;
      position: absolute;
      left: 48%;
      top: 40%;
      width: 63px;
      height: 63px;
      margin: 0 auto;
      border: 4px solid rgb(0, 0, 0);
      border-radius: 50%;
      border-left-color: transparent;
      border-right-color: transparent;
      animation: cssload-spin 500ms infinite linear;
      -o-animation: cssload-spin 500ms infinite linear;
      -ms-animation: cssload-spin 500ms infinite linear;
      -webkit-animation: cssload-spin 500ms infinite linear;
      -moz-animation: cssload-spin 500ms infinite linear;
    }

    @keyframes cssload-spin {
      100% {
        transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @-o-keyframes cssload-spin {
      100% {
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @-ms-keyframes cssload-spin {
      100% {
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @-webkit-keyframes cssload-spin {
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @-moz-keyframes cssload-spin {
      100% {
        -moz-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  `]
})
export class LoadingComponent {

  loadingService:LoadingService= inject(LoadingService);

}
