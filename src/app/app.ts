import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastComponent } from 'ng-angular-popup';

@Component({
  imports: [RouterOutlet, NgToastComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ngrx-store');
}
