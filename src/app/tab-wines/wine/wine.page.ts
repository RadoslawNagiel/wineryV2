import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { ImageHolderComponent } from '../../../components/image-holder/image-holder.component';
import { ComponentBase } from '../../../utils/classes/component.base';
import { getSlug } from '../../../utils/get-slug';
import { Wine } from '../../../utils/interfaces';
import { RemoveWine, UpdateWine } from '../../../utils/store/app.actions';
import { ALERT_REMOVE_BUTTONS } from '../../../utils/variables/alert-remove-buttons';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `wine`,
    templateUrl: `wine.page.html`,
    imports: [IonicModule, ImageHolderComponent, NgClass],
    providers: [DatePipe],
})
export default class WinePage extends ComponentBase {
    readonly alertButtons = structuredClone(ALERT_REMOVE_BUTTONS);

    wines = signal<Wine[]>([]);
    wine = signal<Wine | undefined>(undefined);

    router = inject(Router);
    datePipe = inject(DatePipe);

    parameters: {
        label: string;
        key: string;
        format?: (value: any) => any;
    }[] = [
        {
            label: `Rocznik`,
            key: `createDate`,
            format: (value: Date) => this.datePipe.transform(value, `YYYY`),
        },
        {
            label: `Moc`,
            key: `power`,
            format: (value: string) => `${value}%`,
        },
        {
            label: `Drożdże`,
            key: `yeast`,
        },
    ];

    ngOnInit() {
        this.subs.sink = this.store
            .select((state) => state.app.wines)
            .subscribe((wines) => {
                this.wines.set(structuredClone(wines));
                const id = getSlug(this.router.parseUrl(this.router.url));
                this.wine.set(structuredClone(this.wines()).find((g: any) => g.id === id));
            });
    }

    imageHolderClicked() {
        if (!this.wine()?.imageBase64) {
            this.takePhoto();
        }
    }

    addBottle(amount: number) {
        const wine = this.wine();
        const numberOfBottles = (wine?.numberOfBottles ?? 0) + amount;
        if (wine && numberOfBottles >= 0) {
            wine.numberOfBottles = numberOfBottles;
            this.wine.set(wine);
            this.store.dispatch(new UpdateWine(wine, wine.id));
        }
    }

    editDescription(description: string) {
        const wine = this.wine();
        if (wine) {
            wine.description = description;
            this.wine.set(wine);
            this.store.dispatch(new UpdateWine(wine, wine.id));
        }
    }

    async takePhoto() {
        const image = await Camera.getPhoto({
            quality: 90,
            resultType: CameraResultType.Base64,
            width: 1200,
            height: 1600,
        });
        const wine = this.wine();
        if (wine) {
            wine.imageBase64 = `data:image/jpeg;base64,${image.base64String}` ?? ``;
            this.wine.set(structuredClone(wine));
            this.store.dispatch(new UpdateWine(wine, wine.id));
        }
    }

    setResult(ev: any, id: string) {
        if (ev.detail.role === `confirm`) {
            this.store.dispatch(new RemoveWine(id));
            this.router.navigate([`/tabs/tab-wines`]);
        }
    }
}
