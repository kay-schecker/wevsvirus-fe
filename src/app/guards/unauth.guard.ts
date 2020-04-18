import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {

    constructor(
        private readonly userService: UserService,
        private readonly router: Router,
    ) {
    }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (await this.userService.loadUser()) {
            await this.router.navigate(['']);
            return false;
        }

        return true;
    }


}
