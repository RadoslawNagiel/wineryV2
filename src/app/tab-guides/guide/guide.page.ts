import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GUIDES, GUIDES_SIMILAR } from '../../../utils/variables/guides';
import { Calculators, Guide } from '../../../utils/interfaces';
import { CalcBlgComponent } from '../../../components/calc-blg/calc-blg.component';
import { CalcGlucoseSyrupComponent } from '../../../components/calc-glucose-syrup/calc-glucose-syrup.component';
import { getSlug } from '../../../utils/get-slug';
import { slugify } from '../../../utils/slugify';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `guide`,
    templateUrl: `guide.page.html`,
    imports: [IonicModule, RouterLink, CalcBlgComponent, CalcGlucoseSyrupComponent],
})
export default class GuidePage {
    readonly Calculators = Calculators;
    readonly slugify = slugify;
    readonly router = inject(Router);

    guide = signal<Guide | undefined>(undefined);
    slug = signal(``);

    ngOnInit() {
        this.loadSlug(getSlug(this.router.parseUrl(this.router.url)));
    }

    loadSlug(slug: string) {
        this.slug.set(slug);
        this.guide.set(structuredClone(GUIDES).find((guide: Guide) => slugify(guide.name) === slug));
    }

    getSimilarGuides() {
        return structuredClone(GUIDES_SIMILAR)
            .filter((el) => slugify(el.firstName) === this.slug() || slugify(el.secondName) === this.slug())
            .map((guide) => {
                if (slugify(guide.firstName) === this.slug()) {
                    return guide.secondName;
                }
                return guide.firstName;
            });
    }
}
