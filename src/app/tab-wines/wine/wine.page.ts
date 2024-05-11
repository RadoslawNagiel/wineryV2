import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Wine } from '../../../utils/interfaces';
import { getSlug } from '../../../utils/get-slug';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `wine`,
    templateUrl: `wine.page.html`,
    imports: [IonicModule],
})
export default class WinePage {
    wine = signal<Wine | undefined>(undefined);

    router = inject(Router);

    allWines = [];

    ngOnInit() {
        this.loadId(getSlug(this.router.parseUrl(this.router.url)));
    }

    loadId(id: string) {
        this.wine.set(structuredClone(this.allWines).find((g: any) => g.id === id));
    }
}
