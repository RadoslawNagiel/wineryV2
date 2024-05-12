import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GUIDES } from '../../../utils/variables/guides';
import { Calculators, Guide } from '../../../utils/interfaces';
import { CalcBlgComponent } from '../../../components/calc-blg/calc-blg.component';
import { CalcGlucoseSyrupComponent } from '../../../components/calc-glucose-syrup/calc-glucose-syrup.component';
import { getSlug } from '../../../utils/get-slug';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `guide`,
    templateUrl: `guide.page.html`,
    imports: [IonicModule, RouterLink, CalcBlgComponent, CalcGlucoseSyrupComponent],
})
export default class GuidePage {
    readonly Calculators = Calculators;

    guide = signal<Guide | undefined>(undefined);

    router = inject(Router);

    ngOnInit() {
        this.loadSlug(getSlug(this.router.parseUrl(this.router.url)));
    }

    loadSlug(slug: string) {
        this.guide.set(structuredClone(GUIDES).find((g: any) => g.slug === slug));
    }
}
