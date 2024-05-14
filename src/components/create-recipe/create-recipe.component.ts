import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ingredient, Units } from '../../utils/interfaces';
import { ComponentBase } from '../../utils/classes/component.base';

@Component({
    standalone: true,
    imports: [IonicModule, FormsModule, ReactiveFormsModule],
    selector: 'create-recipe',
    templateUrl: './create-recipe.component.html',
})
export class CreateRecipeComponent extends ComponentBase {
    @Output() readonly formChanged = new EventEmitter<FormGroup>();

    readonly form = new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(40)]),
        description: new FormControl<string | null>(null, [Validators.required]),
        ingredients: new FormControl<Ingredient[]>([], [Validators.required]),
    });

    readonly Units = Units;

    ingredientName = ``;
    ingredientAmount: number | undefined;
    ingredientUnit: Units | undefined;

    ngOnInit() {
        this.subs.sink = this.form.valueChanges.subscribe(() => {
            this.formChanged.next(this.form);
        });
    }

    canAddIngredient() {
        return !(!this.ingredientName || !this.ingredientAmount || !this.ingredientUnit);
    }

    plusClick() {
        if (!this.ingredientName || !this.ingredientAmount || !this.ingredientUnit) {
            return;
        }
        const ingredients = this.form.value.ingredients ?? [];
        ingredients.unshift({
            name: this.ingredientName,
            value: this.ingredientAmount,
            unit: this.ingredientUnit,
        });
        this.form.controls.ingredients.setValue(ingredients);
        this.ingredientName = ``;
        this.ingredientAmount = undefined;
        this.ingredientUnit = undefined;
    }

    minusClick(index: number) {
        const ingredients = this.form.value.ingredients ?? [];
        ingredients.splice(index, 1);
        this.form.controls.ingredients.setValue(ingredients);
    }
}
