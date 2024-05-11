import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IonicModule, ExploreContainerComponent],
    selector: `app-tab2`,
    templateUrl: `tab2.page.html`,
})
export default class Tab2Page {}
