import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { LayoutService } from './layout.service';
import { Config, ConfigName } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  defaultAppLayout: Config = {
    id: ConfigName.layout,
    name: 'Dot News Layout',
    imgSrc: '//via.placeholder.com/150x150',
    layout: 'horizontal',
    boxed: false,
    sidenav: {
      title: 'Dot News',
      imageUrl: '/assets/svg/dot-news-logo.svg',
      showCollapsePin: false,
      state: 'expanded'
    },
    navbar: {
      position: 'in-toolbar'
    },
    toolbar: {
      fixed: true
    },
    footer: {
      visible: true,
      fixed: false
    }
  };

  private _configSubject = new BehaviorSubject<Config>(this.defaultAppLayout);
  config$ = this._configSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private layoutService: LayoutService
    ) {
    this.config$.subscribe(config => this._updateConfig(config));
  }

  private _updateConfig(config: Config) {
    const body = this.document.body;

    body.classList.add(config.id);

    config.sidenav.state === 'expanded' ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();

    this.document.body.dir = 'ltr';
  }

}
