import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: `root`,
})
export class ThemeService {
    mode = signal<`dark` | `light`>(`dark`);

    initTheme() {
        this.mode.set((localStorage.getItem(`theme-mode`) as any) ?? `dark`);
        this.setMode();
    }

    toggleMode() {
        if (this.mode() === `dark`) {
            this.mode.set(`light`);
        } else {
            this.mode.set(`dark`);
        }
        localStorage.setItem(`theme-mode`, this.mode());
        this.setMode();
    }

    setMode() {
        if (this.mode() === `dark`) {
            document.documentElement.classList.toggle('ion-palette-dark', true);
        } else {
            document.documentElement.classList.toggle('ion-palette-dark', false);
        }
    }
}
