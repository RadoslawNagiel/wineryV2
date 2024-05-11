import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IonicModule],
    selector: `app-tabs`,
    templateUrl: `tabs.page.html`,
})
export default class TabsPage {}
