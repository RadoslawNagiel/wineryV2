import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from '../services/theme.service';
import { ComponentBase } from '../utils/classes/component.base';
import { SetStore } from '../utils/store/app.actions';
import { addPolishWords } from '../utils/add-polish-words';
import { KeyboardService } from '../services/keyboard.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IonicModule],
    selector: `app-root`,
    templateUrl: `app.component.html`,
})
export class AppComponent extends ComponentBase {
    themeService = inject(ThemeService);
    keyboardService = inject(KeyboardService);

    ngOnInit() {
        this.keyboardService.addListeners();
        this.themeService.initTheme();
        addPolishWords();

        const state = localStorage.getItem(`state`);
        if (state) {
            this.store.dispatch(new SetStore(JSON.parse(state)));
        }
    }
}
