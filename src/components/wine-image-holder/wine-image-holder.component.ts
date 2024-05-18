import { Component, inject, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WineService } from '../../services/wine.service';
import { Wine } from '../../utils/interfaces';
import { ALERT_REMOVE_BUTTONS } from '../../utils/variables/alert-remove-buttons';
import { NgClass } from '@angular/common';
import { ImageHolderComponent } from '../image-holder/image-holder.component';

@Component({
    standalone: true,
    imports: [IonicModule, NgClass, ImageHolderComponent],
    selector: 'app-wine-image-holder',
    templateUrl: './wine-image-holder.component.html',
})
export class WineImageHolderComponent {
    wine = input.required<Wine>();
    collapsed = input(false);

    readonly wineService = inject(WineService);
    readonly alertButtons = structuredClone(ALERT_REMOVE_BUTTONS);
}
