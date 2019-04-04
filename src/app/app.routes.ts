import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/';
import {ErrorComponent} from './components/error/';

export const routes: Routes = [
    // public
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'error', component: ErrorComponent},

    // error
    {path: '**', redirectTo: 'error'}
];

export const AppRoutes = RouterModule.forRoot(routes);
