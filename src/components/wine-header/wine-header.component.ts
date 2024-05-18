import { Component, inject, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WineService } from '../../services/wine.service';
import { Wine } from '../../utils/interfaces';
import { ALERT_REMOVE_BUTTONS } from '../../utils/variables/alert-remove-buttons';

@Component({
    standalone: true,
    imports: [IonicModule],
    selector: 'app-wine-header',
    templateUrl: './wine-header.component.html',
})
export class HeaderComponent {
    wine = input.required<Wine | undefined>();
    backUrl = input.required<string>();

    readonly wineService = inject(WineService);
    readonly alertButtons = structuredClone(ALERT_REMOVE_BUTTONS);
}
