import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import { form, FormField, required, minLength, validate } from '@angular/forms/signals';
import { FormErrors } from '../../shared/components/form-errors';

import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import { registerSchema } from './schema';
import { authFeatures } from '../../shared/store/auth-feature';
import { authActions } from '../../shared/store/auth-actions';
@Component({
  selector: 'app-register-page',
  imports: [Button, RouterLink, FormErrors, FormField],
  template: ` <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
    <h1 class="text-2xl font-bold text-center text-slate-900 mb-8">Register</h1>

    <form class="space-y-6">
      <div>
        <label for="username" class="block text-sm font-medium text-slate-700 mb-2">
          Username
        </label>
        <input
          id="username"
          type="text"
          [formField]="registerForm.username"
          autocomplete="username"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
          placeholder="Enter your username"
        />
        <app-form-errors [control]="registerForm.username()" />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-slate-700 mb-2"> Email </label>
        <input
          id="email"
          type="email"
          [formField]="registerForm.email"
          autocomplete="username"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
          placeholder="Enter your username"
        />
        <app-form-errors [control]="registerForm.email()" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          [formField]="registerForm.password"
          autocomplete="current-password"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
          placeholder="Enter your password"
        />
        <app-form-errors [control]="registerForm.password()" />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-slate-700 mb-2">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          [formField]="registerForm.confirmPassword"
          autocomplete="current-password"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
          placeholder="Enter your password"
        />
        <app-form-errors [control]="registerForm.confirmPassword()" />
      </div>

      <button
        (click)="onSubmit($event)"
        appButton
        type="submit"
        [disabled]="registerForm().invalid() || isLoading()"
        class="w-full"
      >
        {{ isLoading() ? 'Registering...' : 'Register' }}
      </button>

      <p class="text-sm text-center text-slate-500 mt-4">
        Already have an account?
        <a routerLink="/login" class="text-slate-500 font-medium underline"> Login </a>
      </p>
    </form>
  </div>`,
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class RegisterPage {
  registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, registerSchema);
  private readonly store = inject(Store);
  protected readonly isLoading = toSignal(this.store.select(authFeatures.selectIsLoading));

  onSubmit(event: Event) {
    event.preventDefault();
    const id = Date.now();
    const { confirmPassword, ...rest } = this.registerForm().value();
    const registerRequest = { id, ...rest };
    this.store.dispatch(authActions.register(registerRequest));
  }
}
