import { inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '@core/config/browser-storage.config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage = inject(BROWSER_STORAGE);

  constructor() { }

  public get(key: string) {
    return this.storage.getItem(key);
  }

  public set(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  public remove(key: string) {
    this.storage.removeItem(key);
  }

  public clear() {
    this.storage.clear();
  }
}
