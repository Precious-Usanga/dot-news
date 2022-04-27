import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Constants } from 'src/app/core/shared/constants';
import icMoreHoriz from '@iconify/icons-ic/round-more-horiz';
import { IApiResponse } from 'src/app/core/models/IApiResponse.model';
import { INewsArticle } from 'src/app/core/models/news.model';
import { NewsService } from 'src/app/core/services/news.service';
import { Router } from '@angular/router';
import { ShareDataViaRouteService } from 'src/app/core/services/share-data-via-route.service';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IModalDialogData } from 'src/app/core/models/modal.model';
import { AddBookmarkModalComponent } from 'src/app/core/shared/modals/add-bookmark-modal/add-bookmark-modal.component';
import { MatChip, MatChipList, MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss']
})
export class TopStoriesComponent implements OnInit {

  @ViewChild('chipList') chipList!: MatChipList;

  icMoreHoriz = icMoreHoriz;
  // news!: IApiResponse<INewsArticle>;

  leadNews!: INewsArticle | undefined;

  pageSize = 20;
  page = 1;

  news: IApiResponse<INewsArticle> = {
                                        status: "ok",
                                        totalResults: 434,
                                        articles: [
                                          {
                                            "source": {
                                              "id": "the-washington-post",
                                              "name": "The Washington Post"
                                            },
                                            "author": "Anthony Faiola, Michael Birnbaum, Mary Ilyushina",
                                            "title": "Last stand of Mariupol, leveled by Russia's merciless assault - The Washington Post",
                                            "description": "Leveled by Russia's merciless assault, a city hardened by war is falling. Says one commander: « While the world is asleep, Mariupol [is] dying. »",
                                            "url": "https://www.washingtonpost.com/world/2022/04/24/mariupol-ukraine-last-days/",
                                            "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/PJMBVIGCOEI6ZNO7D65GDJTMOU.jpg&w=1440",
                                            "publishedAt": "2022-04-24T18:26:59Z",
                                            "content": "Placeholder while article actions load\r\nOn a proud June morning in 2014, Ukrainian forces restored their flag over Mariupols city hall to rousing choruses of the national anthem. For weeks, they had … [+12173 chars]"
                                          },
                                          {
                                            "source": {
                                              "id": '',
                                              "name": "Global News"
                                            },
                                            "author": "Skylar Peters, Rosanna Hempel",
                                            "title": "Overland flooding, closed highways in Manitoba as Colorado low moves through province - Global News",
                                            "description": "Southern Manitoba is dealing with flooded basements, closed highways and power outages as another April storm moves over the province.",
                                            "url": "https://globalnews.ca/news/8782383/manitoba-rainfall-snowfall-colorado-low/",
                                            "urlToImage": "https://globalnews.ca/wp-content/uploads/2022/04/MicrosoftTeams-image-9.jpg?quality=85&strip=all&w=720&h=379&crop=1",
                                            "publishedAt": "2022-04-24T18:26:28Z",
                                            "content": "Eastern Manitoba is dealing with flooded basements and roads while western parts of the province are navigating power outages as a second Colorado low rattles the province.\r\nWinnipeggers are reportin… [+3609 chars]"
                                          },
                                          {
                                            "source": {
                                              "id": "talksport",
                                              "name": "TalkSport"
                                            },
                                            "author": "Jack Cunningham",
                                            "title": "Liverpool v Everton LIVE reaction: Origi scores against Everton AGAIN after Robertson’s opener – Mane luc... - talkSPORT",
                                            "description": "",
                                            "url": "https://talksport.com/football/1093307/liverpool-v-everton-live-commentary-team-news-latest-news-merseyside-derby-jurgen-klopp-frank-lampard-premier-league/",
                                            "urlToImage": "https://talksport.com/wp-content/uploads/sites/5/2022/04/TALKSPORT-3way-liverpool-everton-copy.jpg?strip=all&quality=100&w=1500&h=1000&crop=1",
                                            "publishedAt": "2022-04-24T18:22:30Z",
                                            "content": "Liverpool beat Everton at Anfield in the Merseyside derby as they kept their hopes of a quadruple alive.\r\nThe Reds were frustrated for long periods by Frank Lampard’s men but the introduction of Divo… [+875 chars]"
                                          },
                                          {
                                            "source": {
                                              "id": '',
                                              "name": "The Guardian"
                                            },
                                            "author": "Giles Richards",
                                            "title": "Verstappen closes gap to Leclerc after easing to Emilia Romagna F1 GP victory - The Guardian",
                                            "description": "Red Bull’s Max Verstappen is only 27 points behind Charles Leclerc, who finished sixth after making a late error",
                                            "url": "https://amp.theguardian.com/sport/2022/apr/24/verstappen-closes-gap-to-leclerc-after-easing-to-emilia-romagna-f1-gp-victory",
                                            "urlToImage": '',
                                            "publishedAt": "2022-04-24T18:22:00Z",
                                            "content": "Formula One<ul><li>Charles Leclerc drops from third to sixth after late spin</li><li>Sergio Pérez and Lando Norris complete podium; Hamilton 14th</li></ul>\r\nWere willpower alone enough, the seething … [+6501 chars]"
                                          },
                                          {
                                            "source": {
                                              "id": '',
                                              "name": "AppleInsider"
                                            },
                                            "author": "Malcolm Owen",
                                            "title": "Latest 'Shot on iPhone 13 Pro' video highlights Singapore's chicken rice war - AppleInsider",
                                            "description": "Apple's latest \"Shot on iPhone\" video \"Poached\" celebrates Singapore's beloved dish of chicken rice, with Chef's Table' creator David Gelb producing the piece on an iPhone 13 Pro.",
                                            "url": "https://appleinsider.com/articles/22/04/24/latest-shot-on-iphone-13-pro-video-highlights-singapores-chicken-rice-war",
                                            "urlToImage": "https://photos5.appleinsider.com/gallery/48068-93901-poached-still-xl.jpg",
                                            "publishedAt": "2022-04-24T18:19:00Z",
                                            "content": "AppleInsider is supported by its audience and may earn commission as an Amazon Associate and affiliate partner on qualifying purchases. These affiliate partnerships do not influence our editorial con… [+2247 chars]"
                                          },
                                          {
                                            "source": {
                                              "id": "cbc-news",
                                              "name": "CBC News"
                                            },
                                            "author": '',
                                            "title": "Emmanuel Macron projected to win 2nd term as French president - CBC News",
                                            "description": "French polling agencies are projecting that centrist incumbent Emmanuel Macron will win France's presidential runoff Sunday, beating far right rival Marine Le Pen in a tight race that was clouded by the Ukraine war and saw a surge in support for extremist ide…",
                                            "url": "https://www.cbc.ca/news/world/france-election-la-pen-macron-1.6429204",
                                            "urlToImage": "https://i.cbc.ca/1.6429438.1650823910!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/france-presidential-election.jpg",
                                            "publishedAt": "2022-04-24T18:14:55Z",
                                            "content": "French polling agencies are projecting that centrist incumbent Emmanuel Macron will win France's presidential runoff Sunday, beating far right rival Marine Le Pen in a tight race that was clouded by … [+694 chars]"
                                          },
                                          {
                                            "source": {
                                              "id": '',
                                              "name": "Phys.Org"
                                            },
                                            "author": "Science X staff",
                                            "title": "Crew of first private flight to ISS prepare for Earth return - Phys.org",
                                            "description": "The crew of the first fully private mission to the International Space Station was set on Sunday to leave the orbiting laboratory and head back to Earth.",
                                            "url": "https://phys.org/news/2022-04-crew-private-flight-iss-earth.html",
                                            "urlToImage": "https://scx2.b-cdn.net/gfx/news/hires/2021/space-1.jpg",
                                            "publishedAt": "2022-04-24T18:12:58Z",
                                            "content": "The crew of the first fully private mission to the International Space Station was set on Sunday to leave the orbiting laboratory and head back to Earth.\r\nThe three businessmen and a former NASA astr… [+2419 chars]"
                                          },
                                          {
                                            "source": {
                                              "id": "the-wall-street-journal",
                                              "name": "The Wall Street Journal"
                                            },
                                            "author": "Cara Lombardo",
                                            "title": "Twitter Re-Examines Elon Musk’s Bid, May Be More Receptive to a Deal - The Wall Street Journal",
                                            "description": "Two sides are meeting Sunday to discuss takeover bid, people familiar with the matter say",
                                            "url": "https://www.wsj.com/articles/twitter-re-examines-elon-musks-bid-may-be-more-receptive-to-a-deal-11650822932",
                                            "urlToImage": "https://images.wsj.net/im-530474/social",
                                            "publishedAt": "2022-04-24T18:05:00Z",
                                            "content": "Twitter Inc. is re-examining Elon Musks $43 billion takeover offer after the billionaire lined up financing for the bid, in a sign the social-media company could be more receptive to a deal.\r\nTwitter… [+414 chars]"
                                          },
                                          {
                                            "source": {
                                              "id": '',
                                              "name": "CNBC"
                                            },
                                            "author": "Silvia Amaro, Matt Clinch",
                                            "title": "Macron beats far-right rival Le Pen in French presidential election, projections show - CNBC",
                                            "description": "If Macron's win is confirmed then it would make him the first French president in two decades to win a second term.",
                                            "url": "https://www.cnbc.com/2022/04/24/france-election-2022-result-emmanuel-macron-vs-marine-le-pen.html",
                                            "urlToImage": "https://image.cnbcfm.com/api/v1/image/107050134-1650614194734-gettyimages-1391814650-masipo-112_e53a7cc7-7940-49c5-bc94-b0d6115ee88d.jpeg?v=1650793902&w=1920&h=1080",
                                            "publishedAt": "2022-04-24T18:00:42Z",
                                            "content": "If Macron's win is confirmed then he'll likely continue his reformist agenda.\r\nFrance's Emmanuel Macron looks set for a second term as president, with exit polls predicting he will comfortably beat h… [+3559 chars]"
                                          }
                                        ]
                                      }

  topStoriesFilter = Object.entries(Constants.PARAM_VARIABLES.CATEGORY).map(entry => {
    return {
      filter: entry[0],
      value: entry[1],
      selected: false
    }
  });

  addBookmarkModal = AddBookmarkModalComponent;
  modal!: MatDialogRef<TemplateRef<any> | ComponentType<any>>;


  constructor(
    private newsService: NewsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private readNewsService: ShareDataViaRouteService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.setDefaultFilter();
  }


  ngOnInit(): void {
    // this.getHeadlines({ pageSize: this.pageSize, page: this.page });

    this.leadNews = this.news.articles.shift();
  }

  setDefaultFilter() {
    this.topStoriesFilter[0].selected = true;
  }

  chipChange(filter: string) {
    this.chipList?.chipSelectionChanges.subscribe(event => {
      console.log(event);
    })
    const index = this.topStoriesFilter.findIndex(item => item.filter === filter);
    this.topStoriesFilter[index].selected = true;
  }

  getHeadlines(params: { category?: string, pageSize: number, page: number }) {
    this.newsService.getNewsHeadlines(params).subscribe(
      {
        next: (response) => {
          this.news = response;
          this.leadNews = this.news.articles.shift();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.snackBar.open(error.message, 'X')
          console.log(error);
        }
      }
    );
  }

  openDialog(options: IModalDialogData) {
    let dialog!: TemplateRef<any> | ComponentType < any >;
    let width;
    if (options.modal === "addBookmarkModal") {
      width = "600px";
      dialog = this.addBookmarkModal;
      this.modal = this.dialog.open(dialog, { data: options, disableClose: true, width: width });
    }

    if (options.modal === 'addBookmarkModal') {
      this.modal.afterClosed().subscribe(
        data => {
          if (data.result.data) {
            this.openSnackBar(data.result.message);
          }
        }
      );
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'X');
  }

  readNews(news: INewsArticle) {
    this.readNewsService.updateSharedData(news);
    this.router.navigate(['/news/view-news']);
  }

  refreshComponent(refresh: boolean) {
    if (refresh) {
      this.getHeadlines({ pageSize: this.pageSize, page: this.page });
    }
  }

}
