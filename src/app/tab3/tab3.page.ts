import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { Recipe } from '../../utils/interfaces';
import { RECIPES } from '../../utils/recipes';
import { SearchPipe } from '../pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { NoDataComponent } from '../../components/no-data/no-data.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `app-tab3`,
    templateUrl: `tab3.page.html`,
    imports: [IonicModule, HeaderComponent, SearchPipe, RouterLink, NoDataComponent],
})
export default class Tab3Page {
    searchValue = signal(``);

    recipes = signal<Recipe[]>(structuredClone(RECIPES));
}
