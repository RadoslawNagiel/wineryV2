import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { GUIDES } from '../../utils/guides';
import { Guide } from '../../utils/interfaces';
import { SearchPipe } from '../pipes/search.pipe';
import { NoDataComponent } from '../../components/no-data/no-data.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `app-tab4`,
    templateUrl: `tab4.page.html`,
    imports: [IonicModule, HeaderComponent, SearchPipe, RouterLink, NoDataComponent],
})
export default class Tab4Page {
    searchValue = signal(``);

    guides = signal<Guide[]>(structuredClone(GUIDES));
}
