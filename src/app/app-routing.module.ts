import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {UnauthGuard} from './guards/unauth.guard';

const routes: Routes = [{
    path: 'tb',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
}, {
    path: 'signup',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
}, {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnairePageModule)
}];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
