import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {UnauthGuard} from './guards/unauth.guard';

const routes: Routes = [{
    path: 'tb',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
}, {
    path: 'signup',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule),
}, {
    path: 'signup/user-sign-up-page',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./user-sign-up-page/user-sign-up-page.module').then(m => m.UserSignUpPagePageModule),
}, {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnairePageModule),
}, {
    path: 'personal-report',
    canActivate: [AuthGuard],
    loadChildren: () => import('./personal-report/personal-report.module').then(m => m.PersonalReportPageModule),
}, {
    path: 'schland',
    loadChildren: () => import('./schland/schland.module').then(m => m.SchlandPageModule),
}];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
