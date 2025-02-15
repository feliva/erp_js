import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    constructor() {
    }

    private apiCount = 0;
    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    start() {
        if (this.apiCount === 0) {
            this.isLoadingSubject.next(true);
        }
        this.apiCount++;
    }

    stop() {
        this.apiCount--;
        if (this.apiCount === 0) {
            this.isLoadingSubject.next(false);
        }
    }
}
