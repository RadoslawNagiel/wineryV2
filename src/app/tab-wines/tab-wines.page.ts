import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Wine } from '../../utils/interfaces';
import { SearchPipe } from '../../utils/pipes/search.pipe';
import { HeaderComponent } from '../../components/header/header.component';
import { NoDataComponent } from '../../components/no-data/no-data.component';
import { RouterLink } from '@angular/router';
import { ImageHolderComponent } from '../../components/image-holder/image-holder.component';
import { WINES_EXAMPLE } from '../../utils/variables/wines-example';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `tab-wines`,
    templateUrl: `tab-wines.page.html`,
    imports: [IonicModule, DatePipe, SearchPipe, HeaderComponent, NoDataComponent, RouterLink, ImageHolderComponent, NgClass],
})
export default class TabWinesPage {
    searchValue = signal(``);

    wines = signal<Wine[]>(structuredClone(WINES_EXAMPLE));
}
