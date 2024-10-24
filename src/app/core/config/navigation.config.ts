import { AnimationRoutes, ExampleRoutes } from './routes.config';


export interface NavigationItem {
  title: string;
  route?: string;
  children?: NavigationItem[];
  disabled?: boolean;
}

export const NavigationConfig: NavigationItem[] = [
  { title: 'Анимация', children: [
      { title: 'Счётчик', route: AnimationRoutes.Counter },
      { title: 'Счётчики', route: AnimationRoutes.Counters },
    ]},
  { title: 'Singleton', route: ExampleRoutes.Singleton },
  { title: 'Маленькие хитрости', children: [
      { title: 'Host Element Binding', route: ExampleRoutes.HostElementBinding },
      { title: 'Use ngTemplateOutlet', route: ExampleRoutes.UseNgTemplateOutlet }
    ]},
  { title: 'Singleton Second', route: ExampleRoutes.SingletonSecond },
];
