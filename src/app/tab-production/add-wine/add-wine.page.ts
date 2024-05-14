import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentBase } from '../../../utils/classes/component.base';
import { Ingredient, ProductionStage, Recipe } from '../../../utils/interfaces';
import { CreateRecipeComponent } from '../../../components/create-recipe/create-recipe.component';
import { slugify } from '../../../utils/slugify';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `add-wine`,
    templateUrl: `add-wine.page.html`,
    imports: [IonicModule, CreateRecipeComponent],
})
export default class AddWinePage extends ComponentBase {
    form = new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(40)]),
        description: new FormControl<string | null>(null, [Validators.required]),
        ingredients: new FormControl<Ingredient[]>([], [Validators.required]),
    });

    router = inject(Router);

    next() {
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
        this.router.navigate([`/tabs/tab-production/add-wine/detail`], {
            queryParams: {
                recipe,
            },
        });
    }
}
