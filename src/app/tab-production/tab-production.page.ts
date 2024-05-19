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
                let wineList = structuredClone(wines)?.filter((el: Wine) => !el.done) ?? [];
                wineList = wineList.sort((a: Wine, b: Wine) => (this.getNearestStageDate(a) > this.getNearestStageDate(b) ? 1 : -1));
                this.wines.set(wineList);
            });
    }

    getNearestStageDate(wine: Wine) {
        let index = wine.stagesDone.filter((stage) => stage).length;
        if (index === wine.stagesDone.length) {
            return Date.now();
        }
        return wine.recipe.productStages[index].date + wine.createDate;
    }

    getNearestStage(wine: Wine) {
        let index = wine.stagesDone.filter((stage) => stage).length;
        if (index === wine.stagesDone.length) {
            return {
                name: `Wino gotowe`,
                date: new Date().getTime(),
            };
        }
        return {
            name: wine.recipe.productStages[index].name,
            date: wine.recipe.productStages[index].date + wine.createDate,
        };
    }
}
