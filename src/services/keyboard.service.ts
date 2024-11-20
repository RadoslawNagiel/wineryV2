import { Injectable, inject, signal } from '@angular/core';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: `root`,
})
export class KeyboardService {
    platform = inject(Platform);

    isKeyboardOpen = signal<boolean>(false);
    onKeyboardChange = new Subject<boolean>();

    async addListeners() {
        await Keyboard.removeAllListeners();
        await Promise.all([
            Keyboard.addListener(`keyboardWillShow`, () => {
                this.onKeyboardChange.next(false);
                if (this.isKeyboardOpen()) {
                    return;
                }
                this.isKeyboardOpen.set(true);
                this.onKeyboardChange.next(true);
            }),
            Keyboard.addListener(`keyboardWillHide`, () => {
                this.isKeyboardOpen.set(false);
                this.onKeyboardChange.next(false);
            }),
            Keyboard.addListener(`keyboardDidHide`, () => {
                this.onKeyboardChange.next(false);
            }),
        ]);
    }
}
