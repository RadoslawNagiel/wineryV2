import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Wine } from '../../../utils/interfaces';
import { getSlug } from '../../../utils/get-slug';
import { ImageHolderComponent } from '../../../components/image-holder/image-holder.component';
import { DatePipe, NgClass } from '@angular/common';
import { ComponentBase } from '../../../utils/classes/component.base';
import { WINES_EXAMPLE } from '../../../utils/variables/wines-example';
import { Camera, CameraResultType } from '@capacitor/camera';
import { UpdateWine } from '../../../utils/store/app.actions';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `wine`,
    templateUrl: `wine.page.html`,
    imports: [IonicModule, ImageHolderComponent, NgClass],
    providers: [DatePipe],
})
export default class WinePage extends ComponentBase {
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
            format: (value: Date) => this.datePipe.transform(value),
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
                this.wines.set(structuredClone(wines).concat(structuredClone(WINES_EXAMPLE)));
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

    async takePhoto() {
        const image = await Camera.getPhoto({
            quality: 90,
            resultType: CameraResultType.Uri,
            width: 1200,
            height: 1600,
        });
        const wine = this.wine();
        if (wine) {
            wine.imageBase64 = image.webPath ?? ``;
            this.wine.set(wine);
            this.store.dispatch(new UpdateWine(wine, wine.id));
        }
    }
}
