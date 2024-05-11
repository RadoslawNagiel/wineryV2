import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { GUIDES } from '../../utils/guides';
import { Guide } from '../../utils/interfaces';
import { SearchPipe } from '../../pipes/search.pipe';
import { NoDataComponent } from '../../components/no-data/no-data.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `tab-guides`,
    templateUrl: `tab-guides.page.html`,
    imports: [IonicModule, HeaderComponent, SearchPipe, RouterLink, NoDataComponent],
})
export default class TabGuidesPage {
    searchValue = signal(``);

    guides = signal<Guide[]>(structuredClone(GUIDES));
}
