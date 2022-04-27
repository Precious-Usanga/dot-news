import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INewsArticle } from '../models/news.model';
import { Constants } from '../shared/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShareDataViaRouteService {

  private sharedDataSource = new BehaviorSubject<INewsArticle>(JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.CURRENT_NEWS) as string));
  public sharedData = this.sharedDataSource.asObservable();

  public get getSharedData() {
    return this.sharedDataSource.value;
  }

  public updateSharedData(dataObj: INewsArticle) {
    this.storageService.set(Constants.STORAGE_VARIABLES.CURRENT_NEWS, JSON.stringify(dataObj));
    this.sharedDataSource.next(dataObj);
  }

  public clearSharedData() {
    this.storageService.clear(Constants.STORAGE_VARIABLES.CURRENT_NEWS);
    // this.sharedDataSource.next();
  }

  constructor(
    private storageService: StorageService
  ) { }


}
