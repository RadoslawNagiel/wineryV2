import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Recipe } from '../../../utils/interfaces';
import { RECIPES } from '../../../utils/recipes';

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
        const urlTree = this.router.parseUrl(this.router.url);
        const slug = urlTree.root.children['primary'].segments
            .map((it: any) => it.path)
            .join('/')
            .substring(10);
        this.loadSlug(slug);
    }

    loadSlug(slug: string) {
        this.recipe.set(structuredClone(RECIPES).find((g: any) => g.slug === slug));
    }
}
