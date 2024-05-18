import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CalcBlgComponent } from '../../../components/calc-blg/calc-blg.component';
import { CalcGlucoseSyrupComponent } from '../../../components/calc-glucose-syrup/calc-glucose-syrup.component';
import { HeaderComponent } from '../../../components/wine-header/wine-header.component';
import { WineImageHolderComponent } from '../../../components/wine-image-holder/wine-image-holder.component';
import { ToastService } from '../../../services/toast-service.service';
import { WineService } from '../../../services/wine.service';
import { ComponentBase } from '../../../utils/classes/component.base';
import { getSlug } from '../../../utils/get-slug';
import { ProductStage, ProductStageDescription, ProductionStage, Sweetness, Units, Wine } from '../../../utils/interfaces';
import { UpdateWine } from '../../../utils/store/app.actions';
import { PRODUCT_STAGES_DESCRIPTIONS } from '../../../utils/variables/product-stages copy';
import { WINE_IN_PROGRESS_DETAILS } from '../../../utils/variables/wine-details';
import { roundDecimal } from '../../../utils/get-recipes-detail copy';
import { DAY_TIMESTAMP } from '../../../utils/variables/day-timestamp';
import { IngredientsComponent } from '../../../components/ingredients/ingredients.component';
import { StagesComponent } from '../../../components/stages/stages.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `wine-in-progress`,
    templateUrl: `wine-in-progress.page.html`,
    imports: [
        IonicModule,
        NgClass,
        CalcBlgComponent,
        CalcGlucoseSyrupComponent,
        FormsModule,
        DatePipe,
        HeaderComponent,
        WineImageHolderComponent,
        RouterLink,
        IngredientsComponent,
        StagesComponent,
    ],
})
export default class WineInProgressPage extends ComponentBase {
    readonly parameters = WINE_IN_PROGRESS_DETAILS;
    readonly roundDecimal = roundDecimal;
    readonly ProductionStage = ProductionStage;

    readonly DESCRIPTIONS = {
        Preparation: `Nastepnie dokonaj pomiaru zawartości cukru w roztworze. Proces pomiaru został opisany w poradniku`,
        StopFermentation: `Sprawdź czy drożdże zakończyły swoją pracę. Oznacza to, że przez rurkę nie wydostaje się już dwutlenek węgla i poziom wody w niej jest stale równy. Cały cukier powinien być już strawiony przez drożdże, a wino powinno już posiadać oczekiwaną moc.`,
    };

    readonly router = inject(Router);
    readonly toastService = inject(ToastService);
    readonly wineService = inject(WineService);

    wines = signal<Wine[]>([]);
    wine = signal<Wine | undefined>(undefined);

    collapsed = signal(false);

    mustAddSugar = signal(false);
    isFermentationFinished = signal(false);
    isWineClear = signal(false);

    blg: number | undefined;
    literWeight = 1000;
    mustCapacity: number | undefined;

    nearestStage: {
        index: number;
        info?: ProductStageDescription;
        date?: string;
    } = {
        index: 0,
    };

    ngOnInit() {
        this.subs.sink = this.store
            .select((state) => state.app.wines)
            .subscribe((wines) => {
                this.wines.set(structuredClone(wines));
                const id = getSlug(this.router.parseUrl(this.router.url));
                const wine = structuredClone(this.wines()).find((g: any) => g.id === id);
                this.wine.set(wine);

                this.getNearestStage();
                if (wine?.recipe) {
                    this.mustAddSugar.set(!wine.recipe.ingredients.find((ingredient) => ingredient.name === `cukier`));
                }
            });
    }

    // STAGE ACTION
    undoStage(wine: Wine) {
        this.clearData();

        wine.stagesDone[this.nearestStage.index - 1] = false;
        this.getNearestStage();
        this.updateWine(wine);
    }

    async doStage(wine: Wine) {
        this.clearData();

        wine.stagesDone[this.nearestStage.index] = true;
        this.updateWine(wine);

        this.getNearestStage();

        if (this.nearestStage.index === wine.stagesDone.length) {
            // finish wine
            wine.done = true;
            this.updateWine(wine);

            await this.router.navigate([`/tabs/tab-production`], {
                skipLocationChange: true,
            });
            await this.router.navigate([`/tabs/tab-wines/${wine.id}`]);
        }
    }

    clearData() {
        this.isFermentationFinished.set(false);
        this.isWineClear.set(false);
    }

    // GET INFO

    getNearestStage() {
        const wine = this.wine();
        if (!wine?.stagesDone) {
            return;
        }
        let index = 0;
        for (let stage of wine.stagesDone) {
            if (!stage) {
                break;
            }
            index++;
        }
        this.nearestStage.index = index;
        if (index === wine.stagesDone.length) {
            return;
        }
        this.nearestStage.info = PRODUCT_STAGES_DESCRIPTIONS.find((stage) => stage.name === wine.recipe?.productStages[index].name);
        this.nearestStage.date = this.getNearestDate();
    }

    getNearestDate() {
        const wine = this.wine();
        if (!wine?.recipe) {
            return ``;
        }

        const date = new Date(wine.recipe.productStages[this.nearestStage.index].date + wine.createDate);
        const day = `0${date.getDate()}`.slice(-2);
        const month = `0${date.getMonth() + 1}`.slice(-2);
        return `${date.getFullYear()}-${month}-${day}`;
    }

    getHalfSugar(wine: Wine) {
        return Math.round((wine.recipe.ingredients.find((ing) => ing.name === `cukier`)?.value ?? 0) / 2) / 1000;
    }

    getStopFermentationDescription(wine: Wine) {
        if (wine.sweetness === Sweetness.dry) {
            return this.nearestStage.info?.descriptions?.[0];
        }
        if (wine.yeastTolerance === wine.power) {
            return this.nearestStage.info?.descriptions?.[1];
        }
        return this.nearestStage.info?.descriptions?.[2];
    }

    getStageDescription(wine: Wine) {
        const stageName = this.nearestStage.info?.name;
        let description = PRODUCT_STAGES_DESCRIPTIONS.find((description) => description.name === stageName)?.description ?? ``;
        if (stageName === ProductionStage.StopFermentation) {
            return this.getStopFermentationDescription(wine);
        }
        return description;
    }

    // UPDATE

    changeDate(event: any) {
        const wine = this.wine();
        const date = event.detail.value;
        if (!wine?.recipe || date === ``) {
            return;
        }
        if (date !== this.nearestStage.date) {
            const selectDate = new Date(date).getTime();
            const lastDate = wine.recipe.productStages[this.nearestStage.index].date + wine.createDate;
            if (this.nearestStage.index) {
                const earlierStageDate = wine.recipe.productStages[this.nearestStage.index - 1].date + wine.createDate;
                if (earlierStageDate > selectDate) {
                    this.toastService.presentToastError(`Data nie może być wcześniejsza niż poprzedni etap`);
                    event.target.value = this.getNearestDate();
                    return;
                }
            }
            const dateDifference = selectDate - lastDate;
            for (let i = this.nearestStage.index; i < wine.recipe.productStages.length; ++i) {
                wine.recipe.productStages[i].date += dateDifference;
            }
            this.updateWine(wine);
        }
    }

    changeStageToDrainage(wine: Wine) {
        const date = wine.recipe.productStages[this.nearestStage.index].date;
        const stage: ProductStage = {
            name: ProductionStage.Drainage,
            date: date,
        };
        wine.recipe.productStages.splice(this.nearestStage.index, 0, stage);
        wine.stagesDone.splice(this.nearestStage.index, 0, false);

        const dateDifference = 28 * DAY_TIMESTAMP;
        const length = wine.recipe.productStages.length;
        for (let i = this.nearestStage.index + 1; i < length; ++i) {
            wine.recipe.productStages[i].date += dateDifference;
        }

        this.updateWine(wine);
        this.getNearestStage();
        this.toastService.presentToastSuccess(`Dodano nowy etap`);
    }

    changeSugarAccept(wine: Wine) {
        wine.startSugar = roundDecimal((((this.blg ?? 0) * (this.mustCapacity ?? 0)) / 100) * this.literWeight);
        const fullSugar = wine.capacity * wine.power * 17 - wine.startSugar;
        if (fullSugar < 0 || this.mustCapacity === 0) {
            this.toastService.presentToastError(`Wprowadzono niepoprawne dane`);
            return;
        }
        wine.recipe.ingredients.unshift({
            name: `cukier`,
            value: fullSugar,
            unit: Units.gramy,
        });
        this.updateWine(wine);
        this.mustAddSugar.set(false);
    }

    updateWine(wine: Wine) {
        this.store.dispatch(new UpdateWine(wine, wine.id));
    }

    // NAVIGATE

    async openGuides(slug: string) {
        await this.router.navigate([`/tabs/tab3/${slug}`]);
    }
}
