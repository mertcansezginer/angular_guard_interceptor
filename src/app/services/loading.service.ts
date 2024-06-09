import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading = new Subject<boolean>();

  loading$ = this._loading.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.hide();
      }
    });
  }

  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }
}
