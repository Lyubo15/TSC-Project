import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AboutUsComponent } from './home/about-us/about-us.component'
import { ContactComponent } from './home/contact/contact.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
    },
    {
        path: 'about-us',
        pathMatch: 'full',
        component: AboutUsComponent
    },
    {
        path: 'contact',
        pathMatch: 'full',
        component: ContactComponent
    }
];

export const AppRoutingModule = RouterModule.forRoot(routes);

