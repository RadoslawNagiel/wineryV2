import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../../components/wine-header/wine-header.component';
import { WineImageHolderComponent } from '../../../components/wine-image-holder/wine-image-holder.component';
import { WineService } from '../../../services/wine.service';
import { ComponentBase } from '../../../utils/classes/component.base';
import { getSlug } from '../../../utils/get-slug';
import { Wine } from '../../../utils/interfaces';
import { WINE_DETAILS } from '../../../utils/variables/wine-details';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `wine`,
    templateUrl: `wine.page.html`,
    imports: [IonicModule, NgClass, HeaderComponent, WineImageHolderComponent],
})
export default class WinePage extends ComponentBase {
    readonly parameters = WINE_DETAILS;

    wines = signal<Wine[]>([]);
    wine = signal<Wine | undefined>(undefined);

    wineService = inject(WineService);
    router = inject(Router);

    ngOnInit() {
        this.subs.sink = this.store
            .select((state) => state.app.wines)
            .subscribe((wines) => {
                this.wines.set(structuredClone(wines));
                const id = getSlug(this.router.parseUrl(this.router.url));
                const wine = structuredClone(this.wines()).find((g: any) => g.id === id);
                this.wine.set(wine);
            });
    }
}
