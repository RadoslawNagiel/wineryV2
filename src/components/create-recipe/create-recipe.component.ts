import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentBase } from '../../utils/classes/component.base';
import { Units } from '../../utils/interfaces';

@Component({
    standalone: true,
    imports: [IonicModule, FormsModule, ReactiveFormsModule, NgClass],
    selector: 'create-recipe',
    templateUrl: './create-recipe.component.html',
    styleUrl: `create-recipe.style.scss`,
})
export class CreateRecipeComponent extends ComponentBase {
    @Output() readonly formChanged = new EventEmitter<FormGroup>();

    form = input.required<FormGroup<any>>();

    readonly Units = Units;

    ingredientName = ``;
    ingredientAmount: number | undefined;
    ingredientUnit: Units | undefined;

    ngOnInit() {
        this.subs.sink = this.form().valueChanges.subscribe(() => {
            this.formChanged.next(this.form());
        });
    }

    canAddIngredient() {
        return !(!this.ingredientName || !this.ingredientAmount || !this.ingredientUnit);
    }

    plusClick() {
        if (!this.ingredientName || !this.ingredientAmount || !this.ingredientUnit) {
            return;
        }
        const ingredients = this.form().value.ingredients ?? [];
        ingredients.unshift({
            name: this.ingredientName,
            value: this.ingredientAmount,
            unit: this.ingredientUnit,
        });
        this.form().controls[`ingredients`].setValue(ingredients);
        this.ingredientName = ``;
        this.ingredientAmount = undefined;
        this.ingredientUnit = undefined;
    }

    minusClick(index: number) {
        const ingredients = this.form().value.ingredients ?? [];
        ingredients.splice(index, 1);
        this.form().controls[`ingredients`].setValue(ingredients);
    }
}
