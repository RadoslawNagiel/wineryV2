import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GUIDES } from '../../../utils/guides';
import { Calculators, Guide } from '../../../utils/interfaces';
import { CalcBlgComponent } from '../../../components/calc-blg/calc-blg.component';
import { CalcGlucoseSyrupComponent } from '../../../components/calc-glucose-syrup/calc-glucose-syrup.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `recipe`,
    templateUrl: `recipe.page.html`,
    imports: [IonicModule, RouterLink, CalcBlgComponent, CalcGlucoseSyrupComponent],
})
export default class RecipePage {
    readonly Calculators = Calculators;

    guide = signal<Guide | undefined>(undefined);

    router = inject(Router);

    ngOnInit() {
        const urlTree = this.router.parseUrl(this.router.url);
        const slug = urlTree.root.children['primary'].segments
            .map((it: any) => it.path)
            .join('/')
            .substring(10);
        this.loadSlug(slug);
    }

    loadSlug(slug: string) {
        this.guide.set(structuredClone(GUIDES).find((g: any) => g.slug === slug));
    }
}
