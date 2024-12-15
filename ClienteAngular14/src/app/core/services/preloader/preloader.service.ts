import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  constructor() {
  }

  public statusPreload: BehaviorSubject<boolean> = new BehaviorSubject(false);

  displayPreload(val: boolean) {
    this.statusPreload.next(val);
  }

}
