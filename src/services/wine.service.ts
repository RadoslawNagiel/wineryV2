import { Injectable, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { Wine } from '../utils/interfaces';
import { RemoveWine, UpdateWine } from '../utils/store/app.actions';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';

@Injectable({
    providedIn: `root`,
})
export class WineService {
    store = inject(Store);
    router = inject(Router);

    addBottle(wine: Wine, amount: number) {
        const numberOfBottles = (wine?.numberOfBottles ?? 0) + amount;
        if (wine && numberOfBottles >= 0) {
            wine.numberOfBottles = numberOfBottles;
            this.store.dispatch(new UpdateWine(wine, wine.id));
        }
    }

    editDescription(wine: Wine, description: string) {
        if (wine) {
            wine.description = description;
            this.store.dispatch(new UpdateWine(wine, wine.id));
        }
    }

    // PHOTO

    imageHolderClicked(wine: Wine) {
        if (!wine.imageBase64) {
            this.takePhoto(wine);
        }
    }

    async takePhoto(wine: Wine) {
        const image = await Camera.getPhoto({
            quality: 90,
            resultType: CameraResultType.Base64,
            width: 1200,
            height: 1600,
        });
        if (wine) {
            wine.imageBase64 = `data:image/jpeg;base64,${image.base64String}` ?? ``;
            this.store.dispatch(new UpdateWine(wine, wine.id));
        }
    }

    // REMOVE

    setResult(ev: any, id: string, url: string[]) {
        if (ev.detail.role === `confirm`) {
            this.store.dispatch(new RemoveWine(id));
            this.router.navigate([url]);
        }
    }

    setPhotoResult(ev: any, wine: Wine) {
        if (ev.detail.role === `confirm`) {
            wine.imageBase64 = undefined;
            this.store.dispatch(new UpdateWine(wine, wine.id));
        }
    }
}
