import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Recipe } from '../../../utils/interfaces';
import { RECIPES } from '../../../utils/recipes';
import { getSlug } from '../../../utils/get-slug';
import { ComponentBase } from '../../../utils/classes/component.base';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `recipe`,
    templateUrl: `recipe.page.html`,
    imports: [IonicModule],
})
export default class RecipePage extends ComponentBase {
    recipes = signal<Recipe[]>([]);
    recipe = signal<Recipe | undefined>(undefined);

    router = inject(Router);

    ngOnInit() {
        this.subs.sink = this.store
            .select((state) => state.app.recipes)
            .subscribe((recipes) => {
                this.recipes.set(recipes.concat(structuredClone(RECIPES)));
                this.loadSlug(getSlug(this.router.parseUrl(this.router.url)));
            });
    }

    loadSlug(slug: string) {
        this.recipe.set(structuredClone(this.recipes()).find((g: any) => g.slug === slug));
    }
}
