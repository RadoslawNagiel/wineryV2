import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Wine } from '../../../utils/interfaces';

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
        const urlTree = this.router.parseUrl(this.router.url);
        const id = urlTree.root.children['primary'].segments
            .map((it: any) => it.path)
            .join('/')
            .substring(10);
        this.loadId(id);
    }

    loadId(id: string) {
        this.wine.set(structuredClone(this.allWines).find((g: any) => g.id === id));
    }
}
