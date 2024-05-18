import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProductStage, Wine } from '../../utils/interfaces';
import { DatePipe } from '@angular/common';

@Component({
    standalone: true,
    imports: [IonicModule, DatePipe],
    selector: 'app-stages',
    templateUrl: './stages.component.html',
})
export class StagesComponent {
    productStages = input.required<ProductStage[]>();
    wine = input.required<Wine>();
    showCheckbox = input(false);
}
