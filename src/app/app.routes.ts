import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
     {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component:HomeComponent},
    {path: 'contact', component:ContactComponent},
    {path: 'about', component:AboutComponent},
    {path: '**', component:ErrorComponent},

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home',
        title: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
        {
        path: 'contact',
        title: 'contact',
        loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
    },
            {
        path: 'about',
        title: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    }
];
