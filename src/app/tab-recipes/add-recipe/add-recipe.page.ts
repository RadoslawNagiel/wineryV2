import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Ingredient, ProductStage, ProductionStage, Recipe, Units } from '../../../utils/interfaces';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentBase } from '../../../utils/classes/component.base';
import { AddRecipe } from '../../../utils/store/app.actions';
import { Router } from '@angular/router';
import { slugify } from '../../../utils/slugify';
import { CreateRecipeComponent } from '../../../components/create-recipe/create-recipe.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `add-recipe`,
    templateUrl: `add-recipe.page.html`,
    imports: [IonicModule, CreateRecipeComponent],
})
export default class AddRecipePage extends ComponentBase {
    form = new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(40)]),
        description: new FormControl<string | null>(null, [Validators.required]),
        ingredients: new FormControl<Ingredient[]>([], [Validators.required]),
    });

    router = inject(Router);

    addRecipe() {
        const recipe: Recipe = {
            slug: slugify(this.form.value.name ?? ``),
            name: this.form.value.name ?? ``,
            ingredients: this.form.value.ingredients ?? [],
            productStages: [
                {
                    name: ProductionStage.Preparation,
                    date: 0,
                    description: this.form.value.description ?? ``,
                },
            ],
        };
        this.store.dispatch(new AddRecipe(recipe));
        this.router.navigate([`/tabs`, `tab-recipes`]);
    }
}
