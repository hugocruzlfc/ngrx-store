import { Component } from '@angular/core';
import { LucideGlobe, LucideSend } from '@lucide/angular';

@Component({
  selector: 'app-footer',
  imports: [LucideGlobe, LucideSend],
  template: `
    <div class="w-full px-4 py-6 bg-slate-800 text-slate-400 mt-auto">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm">&copy; 2025 NgrxStore. All rights reserved.</p>

        <nav aria-label="Footer navigation">
          <ul class="flex items-center gap-6 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </nav>

        <div class="flex items-center gap-4">
          <a href="#" aria-label="GitHub" class="hover:text-white transition-colors">
            <svg lucideGlobe class="size-5" />
          </a>
          <a href="#" aria-label="Twitter" class="hover:text-white transition-colors">
            <svg lucideSend class="size-5" />
          </a>
        </div>
      </div>
    </div>
  `,
})
export class Footer {}
