import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: `root`,
})
export class ToastService {
    constructor(private readonly toastController: ToastController) {}

    async presentToastSuccess(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000,
            animated: true,
            color: `success`,
        });
        toast.present();
    }

    async presentToastError(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000,
            animated: true,
            color: `danger`,
        });
        toast.present();
    }

    async presentToastWithOptions(text: string, confirmText: string) {
        const toast = await this.toastController.create({
            message: text,
            color: `danger`,
            buttons: [
                {
                    text: `Anuluj`,
                    role: `Cancel`,
                },
                {
                    text: confirmText,
                    role: `Continue`,
                },
            ],
        });
        await toast.present();

        const { role } = await toast.onDidDismiss();
        if (role === `Continue`) {
            return true;
        }
        return false;
    }
}
