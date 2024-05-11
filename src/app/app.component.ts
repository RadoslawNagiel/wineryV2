import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from '../services/theme.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IonicModule],
    selector: `app-root`,
    templateUrl: `app.component.html`,
})
export class AppComponent {
    themeService = inject(ThemeService);

    ngOnInit() {
        this.themeService.initTheme();
    }
}
