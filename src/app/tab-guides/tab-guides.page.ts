import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { GUIDES } from '../../utils/variables/guides';
import { Guide } from '../../utils/interfaces';
import { SearchPipe } from '../../utils/pipes/search.pipe';
import { NoDataComponent } from '../../components/no-data/no-data.component';
import { slugify } from '../../utils/slugify';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `tab-guides`,
    templateUrl: `tab-guides.page.html`,
    imports: [IonicModule, HeaderComponent, SearchPipe, RouterLink, NoDataComponent],
})
export default class TabGuidesPage {
    readonly slugify = slugify;

    searchValue = signal(``);

    guides = signal<Guide[]>(structuredClone(GUIDES));
}
