import { animate, keyframes, sequence, state, style, transition, trigger } from '@angular/animations';

export const balanceAnimation =
  trigger('balanceAnimation', [
    transition(':increment', [
      style({
        color: '#1F1F1F',
        opacity: 1,
        transform: 'scale(1)',
      }),
      animate('2s ease-in-out', keyframes([
        style({ color: '#212121', opacity: 0.875, transform: 'scale(0.875)', offset: 0.0625}),
        style({ color: '#292B2D', opacity: 0.75, transform: 'scale(0.75)', offset: 0.125}),
        style({ color: '#555555', opacity: 0.625, transform: 'scale(0.625)', offset: 0.1875}),
        style({ color: '#645F5B', opacity: 0.50, transform: 'scale(0.5)', offset: 0.25}),
        style({ color: '#909090', opacity: 0.375, transform: 'scale(0.375)', offset: 0.3125}),
        style({ color: '#C6C6C6', opacity: 0.25, transform: 'scale(0.25)', offset:  0.375}), 
        style({ color: '#D5D5D5', opacity: 0.125, transform: 'scale(0.125)', offset: 0.4375}),
        style({ color: '#FFF', opacity: 0, transform: 'scale(0)', offset: 0.5}),
        style({ color: '#D5D5D5', opacity: 0.125, transform: 'scale(0.125)', offset: 0.5625}),
        style({ color: '#C6C6C6', opacity: 0.25, transform: 'scale(0.25)', offset: 0.625}),
        style({ color: '#909090', opacity: 0.375, transform: 'scale(0.375)', offset: 0.6875}), 
        style({ color: '#645F5B', opacity: 0.50, transform: 'scale(0.5)', offset: 0.75}),
        style({ color: '#555555', opacity: 0.625, transform: 'scale(0.625)', offset: 0.8125}),
        style({ color: '#292B2D', opacity: 0.75, transform: 'scale(0.75)', offset:  0.875}),
        style({ color: '#212121', opacity: 0.875, transform: 'scale(0.875)', offset: 0.9375}),
        style({ color: '#1F1F1F', opacity: 1, transform: 'scale(1)', offset: 1}),
      ]))
    ])
  ]);
