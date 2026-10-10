import { Routes } from '@angular/router';
import { Kupac } from './kupac/kupac';
import { Radnik } from './radnik/radnik';
import { tipGuard } from './guards/tip.guard';

export const routes: Routes = [
    {path: "kupac", component : Kupac, canActivate: [tipGuard], data: { tip: 'kupac' }},
    {path : "radnik", component: Radnik, canActivate: [tipGuard], data: { tip: 'radnik' }}
];
