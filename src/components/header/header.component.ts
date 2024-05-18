import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';
import { SettingsComponent } from '../settings/settings.component';

@Component({
    standalone: true,
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [IonicModule, FormsModule, SettingsComponent],
})
export class HeaderComponent {
    @Output() readonly searchChanged = new EventEmitter<string>();

    header = input.required<string>();
    search = input(true);

    themeService = inject(ThemeService);
}
