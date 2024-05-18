import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Ingredient } from '../../utils/interfaces';

@Component({
    standalone: true,
    imports: [IonicModule],
    selector: 'app-ingredients',
    templateUrl: './ingredients.component.html',
})
export class IngredientsComponent {
    ingredients = input.required<Ingredient[]>();
}
