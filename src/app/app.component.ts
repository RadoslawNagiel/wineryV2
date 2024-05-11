import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from '../utils/services/theme.service';
import { ComponentBase } from '../utils/classes/component.base';
import { SetStore } from '../utils/store/app.actions';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IonicModule],
    selector: `app-root`,
    templateUrl: `app.component.html`,
})
export class AppComponent extends ComponentBase {
    themeService = inject(ThemeService);

    ngOnInit() {
        this.themeService.initTheme();
        const state = localStorage.getItem(`state`);
        if (state) {
            this.store.dispatch(new SetStore(JSON.parse(state)));
        }
    }
}
