import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { NoDataComponent } from '../../components/no-data/no-data.component';
import { ComponentBase } from '../../utils/classes/component.base';
import { getRecipesDetail } from '../../utils/get-recipes-detail';
import { Recipe } from '../../utils/interfaces';
import { SearchPipe } from '../../utils/pipes/search.pipe';
import { RECIPES } from '../../utils/variables/recipes';
import { RemoveRecipe } from '../../utils/store/app.actions';
import { ALERT_REMOVE_BUTTONS } from '../../utils/variables/alert-remove-buttons';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `tab-recipes`,
    templateUrl: `tab-recipes.page.html`,
    imports: [IonicModule, HeaderComponent, SearchPipe, RouterLink, NoDataComponent],
})
export default class TabRecipesPage extends ComponentBase {
    recipes = signal<Recipe[]>(structuredClone(RECIPES));

    alertButtons = structuredClone(ALERT_REMOVE_BUTTONS);

    ngOnInit() {
        this.subs.sink = this.store
            .select((state) => state.app.recipes)
            .subscribe((recipes) => {
                this.recipes.set(getRecipesDetail(structuredClone(recipes ?? [])));
            });
    }

    setResult(ev: any, slug: string) {
        if (ev.detail.role === `confirm`) {
            this.store.dispatch(new RemoveRecipe(slug));
        }
    }
}
