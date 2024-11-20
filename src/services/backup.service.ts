import { Injectable, inject, signal } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { ToastService } from './toast-service.service';
import { Store } from '@ngxs/store';
import { SetStore } from '../utils/store/app.actions';

@Injectable({
    providedIn: `root`,
})
export class BackupService {
    readonly toastService = inject(ToastService);
    readonly store = inject(Store);

    async saveData() {
        await this.checkPermission();
        let state = localStorage.getItem(`state`);
        if (state) {
            const data = JSON.parse(state);
            data.app = `winery`;
            await Filesystem.writeFile({
                path: `winery_backup_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}.json`,
                data: JSON.stringify(data),
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
            });
            this.toastService.presentToastSuccess(`Zapisano w folderze "dokumenty"`);
        }
    }

    loadData(json: string) {
        try {
            const data = JSON.parse(json);
            if (data.app !== `winery`) {
                throw new Error(`unknown file`);
            }
            this.store.dispatch(new SetStore(data));
            void this.toastService.presentToastSuccess(`Zaimportowano dane`);
        } catch {
            this.toastService.presentToastError(`Niepoprawny format pliku`);
        }
    }

    async checkPermission() {
        const permission = await Filesystem.requestPermissions();
        if (permission.publicStorage === `denied`) {
            this.toastService.presentToastError(`Brak uprawnień`);
        }
    }
}
