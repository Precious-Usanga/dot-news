export enum ConfigName {
  layout = 'dot-news-layout',
}
export interface Config {
  id: ConfigName;
  name: string;
  imgSrc: string;
  layout: 'vertical' | 'horizontal';
  boxed: boolean;
  sidenav: {
    title: string;
    imageUrl: string;
    showCollapsePin: boolean;
    state: 'expanded' | 'collapsed';
  };
  toolbar: {
    fixed: boolean;
  };
  navbar: {
    position: 'below-toolbar' | 'in-toolbar';
  };
  footer: {
    visible: boolean;
    fixed: boolean;
  };
}
