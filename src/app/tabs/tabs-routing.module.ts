import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [{
    path: 'tabs',
    component: TabsPage,
    children: [{
        path: 'mood',
        loadChildren: () => import('./mood/mood.module').then(m => m.MoodPageModule),
    }, {
        path: 'chart',
        loadChildren: () => import('./chart/chart.module').then(m => m.ChartPageModule),
    }, {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapPageModule),
    }, {
        path: '',
        redirectTo: '/tabs/mood',
        pathMatch: 'full',
    }],
}, {
    path: '',
    redirectTo: '/tabs/mood',
    pathMatch: 'full',
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
