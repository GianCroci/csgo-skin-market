import { CanActivateFn, Router } from "@angular/router";
import { AuthService} from '../services/auth.service';
import { inject } from "@angular/core";

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
    return (route, state) => {
        const authService = inject(AuthService);
        const router = inject(Router);

        if(!authService.isAuthenticated()) {
            router.navigate(['/login']);
            return false;
        }

        const user = authService.user();
        if (user && allowedRoles.includes(user.rol)) {
            return true
        }

        router.navigate(['/unauthorized']);
        return false;
    }
}