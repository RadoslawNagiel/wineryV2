import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';

@Component({
    standalone: true,
    imports: [IonicModule, FormsModule],
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    @Output() readonly searchChanged = new EventEmitter<string>();

    header = input.required<string>();
    search = input(true);

    themeService = inject(ThemeService);
}
