import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CalcBlgComponent } from '../../../components/calc-blg/calc-blg.component';
import { CalcGlucoseSyrupComponent } from '../../../components/calc-glucose-syrup/calc-glucose-syrup.component';
import { HeaderComponent } from '../../../components/wine-header/wine-header.component';
import { ToastService } from '../../../services/toast-service.service';
import { WineService } from '../../../services/wine.service';
import { ComponentBase } from '../../../utils/classes/component.base';
import { getSlug } from '../../../utils/get-slug';
import { ProductStage, ProductStageDescription, ProductionStage, Sweetness, Units, Wine } from '../../../utils/interfaces';
import { UpdateWine } from '../../../utils/store/app.actions';
import { PRODUC_STAGES_DESCRIPTIONS } from '../../../utils/variables/product-stages copy';
import { WINE_IN_PROGRESS_DETAILS } from '../../../utils/variables/wine-details';
import { WineImageHolderComponent } from '../../../components/wine-image-holder/wine-image-holder.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `wine-in-progress`,
    templateUrl: `wine-in-progress.page.html`,
    imports: [
        IonicModule,
        NgClass,
        NgIf,
        CalcBlgComponent,
        CalcGlucoseSyrupComponent,
        FormsModule,
        NgFor,
        DatePipe,
        HeaderComponent,
        WineImageHolderComponent,
        RouterLink,
    ],
})
export default class WineInProgressPage extends ComponentBase {
    readonly parameters = WINE_IN_PROGRESS_DETAILS;

    wines = signal<Wine[]>([]);
    wine = signal<Wine | undefined>(undefined);

    router = inject(Router);
    toastService = inject(ToastService);
    wineService = inject(WineService);

    ngOnInit() {
        this.subs.sink = this.store
            .select((state) => state.app.wines)
            .subscribe((wines) => {
                this.wines.set(structuredClone(wines));
                const id = getSlug(this.router.parseUrl(this.router.url));
                const wine = structuredClone(this.wines()).find((g: any) => g.id === id);
                this.wine.set(wine);

                //! OLD
                this.getNearestStage();
                if (wine?.recipe) {
                    this.mustCreated = wine.recipe.ingredients.find((ingredient) => ingredient.name === `cukier`) !== undefined;
                }
            });
    }

    // ! OLD

    mustCreated = false;
    endFermentation = false;
    clearWine = false;

    dayTimestamp = 86400000;

    nearestStageIndex = 0;
    nearestStage?: ProductStageDescription;
    nearestDateInput = ``;

    ProductionStage = ProductionStage;

    mustCapacity = 0;

    undoStage() {
        this.endFermentation = false;
        this.clearWine = false;

        const wine = this.wine();
        if (!wine?.stagesDone) {
            return;
        }
        wine.stagesDone[this.nearestStageIndex - 1] = false;
        this.getNearestStage();
        this.updateWine(wine);
    }

    async doStage() {
        this.endFermentation = false;
        this.clearWine = false;

        const wine = this.wine();
        if (!wine?.stagesDone) {
            return;
        }

        wine.stagesDone[this.nearestStageIndex] = true;
        this.getNearestStage();
        this.updateWine(wine);
        if (this.nearestStageIndex === wine.stagesDone.length) {
            wine.done = true;
            this.updateWine(wine);

            await this.router.navigate([`/tabs/tab1`], {
                skipLocationChange: true,
            });

            await this.router.navigate([`/tabs/tab2/show-wine`], {
                queryParams: {
                    index: this.wine()?.id,
                },
            });
        }
    }

    getHalfSugar() {
        return Math.round(this.getSugarValue() / 2) / 1000;
    }

    getSugarValue() {
        const wine = this.wine();
        if (!wine?.recipe) {
            return 0;
        }
        return Math.round(wine.recipe.ingredients.find((ing) => ing.name === `cukier`)?.value ?? 0);
    }

    changeStageToDrainage() {
        const wine = this.wine();
        if (!wine?.recipe || !wine?.stagesDone) {
            return;
        }
        const date = wine.recipe.productStages[this.nearestStageIndex].date;
        const stage: ProductStage = {
            name: ProductionStage.Drainage,
            date: date,
        };
        wine.recipe.productStages.splice(this.nearestStageIndex, 0, stage);
        wine.stagesDone.splice(this.nearestStageIndex, 0, false);

        const dateDifference = 28 * this.dayTimestamp;
        const length = wine.recipe.productStages.length;
        for (let i = this.nearestStageIndex + 1; i < length; ++i) {
            wine.recipe.productStages[i].date += dateDifference;
        }

        this.updateWine(wine);
        this.getNearestStage();
        this.toastService.presentToastSuccess(`Dodano nowy etap`);
    }

    changeDate(event: any) {
        const wine = this.wine();
        if (!wine?.recipe) {
            return;
        }
        const value = event.detail.value;
        if (value !== `` && value != this.nearestDateInput) {
            const selectDate = new Date(value).getTime();
            const lastDate = wine.recipe.productStages[this.nearestStageIndex].date + new Date(wine.createDate).getTime();
            if (this.nearestStageIndex) {
                const earielStageDate = wine.recipe.productStages[this.nearestStageIndex - 1].date + new Date(wine.createDate).getTime();
                if (earielStageDate > selectDate) {
                    this.toastService.presentToastError(`Data nie może być wcześniejsza niż poprzedni etap`);
                    event.target.value = this.getNearestDate();
                    return;
                }
            }
            const dateDifference = selectDate - lastDate;
            for (let i = this.nearestStageIndex; i < wine.recipe.productStages.length; ++i) {
                wine.recipe.productStages[i].date += dateDifference;
            }
            this.toastService.presentToastSuccess(`Zmieniono datę`);
            this.updateWine(wine);
        }
    }

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
        this.nearestStageIndex = index;
        if (index === wine.stagesDone.length) {
            return;
        }
        this.nearestStage = PRODUC_STAGES_DESCRIPTIONS.find((stage) => stage.name === wine.recipe?.productStages[index].name);
        this.nearestDateInput = this.getNearestDate();
    }

    getNearestDate() {
        const wine = this.wine();
        if (!wine?.recipe) {
            return ``;
        }

        const date = new Date(wine.recipe.productStages[this.nearestStageIndex].date + new Date(wine.createDate).getTime());
        const day = `0${date.getDate()}`.slice(-2);
        const month = `0${date.getMonth() + 1}`.slice(-2);
        return `${date.getFullYear()}-${month}-${day}`;
    }

    getStopFermentationDescription() {
        const wine = this.wine();
        if (!wine?.recipe) {
            return ``;
        }

        if (wine.sweetness === Sweetness.dry) {
            return this.nearestStage?.descriptions?.[0];
        }
        if (wine.yeastTolerance === wine.power) {
            return this.nearestStage?.descriptions?.[1];
        }
        return this.nearestStage?.descriptions?.[2];
    }

    getStageDescription(stageName?: ProductionStage) {
        let description = PRODUC_STAGES_DESCRIPTIONS.find((description) => description.name === stageName)?.description ?? ``;
        if (stageName === ProductionStage.StopFermentation) {
            return this.getStopFermentationDescription();
        }
        return description;
    }

    changeSugar(sugar: number) {
        const wine = this.wine();
        if (!wine) {
            return;
        }
        wine.startSugar = sugar;
        this.updateWine(wine);
    }

    changeSugarAccept() {
        const wine = this.wine();
        if (!wine?.startSugar || !wine?.recipe) {
            return;
        }
        wine.startSugar *= this.mustCapacity;
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
        this.mustCreated = true;
    }

    async openGuides(slug: string) {
        await this.router.navigate([`/tabs/tab3/${slug}`]);
        // await this.router.navigate([`/tabs/tab3/${slug}`], {
        //   queryParams: {
        //     backWine: this.wine()?.id,
        //   },
        // });
    }

    updateWine(wine: Wine) {
        this.store.dispatch(new UpdateWine(wine, wine.id));
    }
}
