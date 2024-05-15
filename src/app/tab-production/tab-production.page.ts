import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { ImageHolderComponent } from '../../components/image-holder/image-holder.component';
import { NoDataComponent } from '../../components/no-data/no-data.component';
import { Wine } from '../../utils/interfaces';
import { SearchPipe } from '../../utils/pipes/search.pipe';
import { ComponentBase } from '../../utils/classes/component.base';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `tab-production`,
    templateUrl: `tab-production.page.html`,
    imports: [IonicModule, DatePipe, HeaderComponent, SearchPipe, NoDataComponent, ImageHolderComponent, NgClass, RouterLink],
})
export default class TabProductionPage extends ComponentBase {
    wines = signal<Wine[]>([]);

    ngOnInit() {
        this.subs.sink = this.store
            .select((state) => state.app.wines)
            .subscribe((wines) => {
                this.wines.set(structuredClone(wines).filter((el: Wine) => !el.done));
            });
    }
}
