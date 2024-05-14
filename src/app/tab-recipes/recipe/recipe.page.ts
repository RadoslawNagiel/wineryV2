import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentBase } from '../../../utils/classes/component.base';
import { getRecipesDetail } from '../../../utils/get-recipes-detail';
import { getSlug } from '../../../utils/get-slug';
import { Recipe } from '../../../utils/interfaces';
import { RemoveRecipe } from '../../../utils/store/app.actions';
import { ALERT_REMOVE_BUTTONS } from '../../../utils/variables/alert-remove-buttons';

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

    alertButtons = structuredClone(ALERT_REMOVE_BUTTONS);

    ngOnInit() {
        this.subs.sink = this.store
            .select((state) => state.app.recipes)
            .subscribe((recipes) => {
                this.recipes.set(getRecipesDetail(structuredClone(recipes)));
                const slug = getSlug(this.router.parseUrl(this.router.url));
                this.recipe.set(structuredClone(this.recipes()).find((g: any) => g.slug === slug));
            });
    }

    setResult(ev: any, slug: string) {
        if (ev.detail.role === `confirm`) {
            this.store.dispatch(new RemoveRecipe(slug));
            this.router.navigate([`/tabs/tab-recipes`]);
        }
    }

    addWine() {
        this.router.navigate([`/tabs/tab-production/add-wine/detail`], {
            queryParams: {
                recipe: structuredClone(this.recipe()),
            },
        });
    }
}
