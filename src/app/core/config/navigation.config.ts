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
  { title: 'Example', children: [
      { title: 'Parent', route: ExampleRoutes.Parent },
      { title: 'Child', route: ExampleRoutes.Child }
    ]},
  { title: 'Singleton Second', route: ExampleRoutes.SingletonSecond },
];
