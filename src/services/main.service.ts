import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _isNavbarOpen: boolean = false;
  public navBarState$$ = new BehaviorSubject<boolean>(this._isNavbarOpen);

  toggleNavbarState() {
    this._isNavbarOpen = !this._isNavbarOpen;
    this.navBarState$$.next(this._isNavbarOpen);
    console.log(this._isNavbarOpen)
  }


}
