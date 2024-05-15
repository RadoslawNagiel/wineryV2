import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { wordVariations } from 'polish-word-variations';
import { HeaderComponent } from '../../components/header/header.component';
import { ImageHolderComponent } from '../../components/image-holder/image-holder.component';
import { NoDataComponent } from '../../components/no-data/no-data.component';
import { ComponentBase } from '../../utils/classes/component.base';
import { Wine } from '../../utils/interfaces';
import { SearchPipe } from '../../utils/pipes/search.pipe';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `tab-wines`,
    templateUrl: `tab-wines.page.html`,
    imports: [IonicModule, DatePipe, SearchPipe, HeaderComponent, NoDataComponent, RouterLink, ImageHolderComponent, NgClass],
})
export default class TabWinesPage extends ComponentBase {
    readonly wordVariations = wordVariations;

    wines = signal<Wine[]>([]);

    ngOnInit() {
        this.subs.sink = this.store
            .select((state) => state.app.wines)
            .subscribe((wines) => {
                this.wines.set(structuredClone(wines).filter((el: Wine) => el.done));
            });
    }
}
