import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  public get(storageName: string) {
    const value = localStorage.getItem(storageName);
    if (value !== null && value.length > 0) {
      return value;
    }
    return null;
  }

  getItem(key: string) {
    const val = localStorage.getItem(key);
    if (val !== null && val.length > 0) {
      return val;
    }
    return null;
  }

  public set(storageName: string, value: any) {
    return localStorage.setItem(storageName, value);
  }

  public clear(storageName: string) {
    return localStorage.removeItem(storageName);
  }

  public clear_all() {
    return localStorage.clear();
  }
}
