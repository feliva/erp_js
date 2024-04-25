import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {LoadingService} from "../components/loading.service";
import {finalize} from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('loadingInterceptor')

  let loadingService = inject(LoadingService);



  loadingService.start();

  return next(req).pipe(
    finalize(() => {
      loadingService.stop()
    })
  );

  return next(req);
};
