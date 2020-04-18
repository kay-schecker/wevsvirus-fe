import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SignupPage} from './signup.page';
import {SignUpFormComponent} from './form/sign-up-form.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: SignupPage},
            {path: 'form', component: SignUpFormComponent},
        ]),
    ],
    exports: [RouterModule],
})
export class SignupPageRoutingModule {
}
