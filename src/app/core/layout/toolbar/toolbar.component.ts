import { Component, Input, OnInit } from '@angular/core';
import { map, of } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { Constants } from '../../shared/constants';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { LayoutService } from '../../shared/layout.service';
import emojioneUS from '@iconify/icons-emojione/flag-for-flag-united-states';
import emojioneDE from '@iconify/icons-emojione/flag-for-flag-germany';
import { Icon } from '@visurel/iconify-angular';
import { ConfigService } from '../../shared/config.service';
import { Config } from '../../models/config.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isHorizontalLayout$ = this.configService.config$.pipe(map((config: Config) => config.layout === 'horizontal'));
  isVerticalLayout$ = this.configService.config$.pipe(map((config: Config) => config.layout === 'vertical'));
  isNavbarInToolbar$ = this.configService.config$.pipe(map((config: Config) => config.navbar.position === 'in-toolbar'));
  isNavbarBelowToolbar$ = this.configService.config$.pipe(map((config: Config) => config.navbar.position === 'below-toolbar'));

  @Input() mobileQuery!: boolean;
  icMenu = icMenu;

  languages: Language[] = [
    {
      code: "en",
      language: "English",
      icon: emojioneUS,
      selected: false
    },
    {
      code: "gb",
      language: "Germany",
      icon: emojioneDE,
      selected: false
    }
  ]

  constructor(
    private storageService: StorageService,
    private layoutService: LayoutService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.getSelectedLanguage();
  }

  openSidenav() {
    this.layoutService.openSidenav();
  }

  selectLanguage(language: Language) {
    this.languages.forEach(lang => {
      if (lang.selected === true && lang.code !== language.code) {
        lang.selected = false;
      }
    });
    language.selected = true;
    this.storageService.set(Constants.STORAGE_VARIABLES.LANGUAGE, language.code);
  }

  getSelectedLanguage() {
    const language = this.storageService.get(Constants.STORAGE_VARIABLES.LANGUAGE);
    if (language) {
      const selectedLanguage = this.languages.find(lang => lang.code === language );
      selectedLanguage ? this.selectLanguage(selectedLanguage) : null;
    } else {
      this.selectLanguage(this.languages[0]);
    }
  }

}

interface Language {
  language: string;
  code: string;
  icon: Icon;
  selected: boolean;
}
