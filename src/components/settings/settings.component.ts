import { Component, inject, signal } from '@angular/core';
import { App } from '@capacitor/app';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngxs/store';

import { BackupService } from '../../services/backup.service';
import { ThemeService } from '../../services/theme.service';
import { ToastService } from '../../services/toast-service.service';
import { SetStore } from '../../utils/store/app.actions';

@Component({
    standalone: true,
    imports: [IonicModule],
    selector: `app-settings`,
    templateUrl: `./settings.component.html`,
})
export class SettingsComponent {
    readonly themeService = inject(ThemeService);
    readonly backupService = inject(BackupService);
    readonly toastService = inject(ToastService);
    readonly store = inject(Store);

    displayModal = signal(false);

    version = signal(``);

    openFileInput() {
        (document as any).getElementById(`file-upload`).click();
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = (results: any) => {
            const fileData = results.target.result;
            if (fileData) {
                this.backupService.loadData(fileData);
            }
        };
        reader.readAsText(file);
    }

    ngOnInit() {
        void this.loadVersion();
    }

    async loadVersion() {
        const info = await App.getInfo();
        this.version.set(info.version);
    }
}
