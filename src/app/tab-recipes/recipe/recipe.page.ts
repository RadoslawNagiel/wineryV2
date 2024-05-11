import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Recipe } from '../../../utils/interfaces';
import { RECIPES } from '../../../utils/recipes';
import { getSlug } from '../../../utils/get-slug';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `recipe`,
    templateUrl: `recipe.page.html`,
    imports: [IonicModule],
})
export default class RecipePage {
    recipe = signal<Recipe | undefined>(undefined);

    router = inject(Router);

    ngOnInit() {
        this.loadSlug(getSlug(this.router.parseUrl(this.router.url)));
    }

    loadSlug(slug: string) {
        this.recipe.set(structuredClone(RECIPES).find((g: any) => g.slug === slug));
    }
}
