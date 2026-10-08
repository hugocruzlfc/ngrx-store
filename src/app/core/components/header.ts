import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { toSignal } from '@angular/core/rxjs-interop';
import { LucideLogOut, LucideShoppingCart, LucideUser } from '@lucide/angular';
import { Button } from '../../shared/components/button';
import { authActions } from '../../shared/store/auth-actions';

type CartStateLike = {
  cart?: {
    items?: unknown[];
  };
};

@Component({
  selector: 'app-header',
  imports: [Button, RouterLink, LucideLogOut, LucideShoppingCart, LucideUser],
  template: `
    <div class="sticky top-0 z-50 w-full px-4 py-3 bg-slate-900 text-white shadow-lg">
      <nav class="container mx-auto flex items-center justify-between">
        <a routerLink="/" class="text-xl font-bold tracking-tight">NgrxStore</a>

        <div class="flex items-center gap-4">
          <button
            appButton
            variant="ghost"
            type="button"
            (click)="logout()"
            class="text-white hover:text-gray-300 hover:bg-white/10"
          >
            <svg lucideLogOut class="size-4 mr-2" />
            Logout
          </button>
          <button
            routerLink="/profile"
            appButton
            variant="ghost"
            type="button"
            class="text-white hover:bg-white/10"
          >
            <svg lucideUser class="size-4 mr-2" />
            Profile
          </button>
          <button
            appButton
            variant="ghost"
            type="button"
            class="relative text-white hover:bg-white/10"
            routerLink="/cart"
          >
            <svg lucideShoppingCart class="size-4" />
            <span
              class="absolute -top-1 -right-1 size-5 flex items-center justify-center bg-amber-500 text-xs font-medium rounded-full"
            >
              {{ cartItemCount() }}
            </span>
          </button>
        </div>
      </nav>
    </div>
  `,
})
export class Header {
  private readonly store = inject(Store);
  protected readonly cartItemCount = toSignal(
    this.store.select((state: unknown) => {
      const rootState = state as CartStateLike | null;
      return rootState?.cart?.items?.length ?? 0;
    }),
    {
      initialValue: 0,
    },
  );

  protected logout() {
    this.store.dispatch(authActions.logout());
  }
}
