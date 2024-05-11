import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IonicModule, ExploreContainerComponent],
    selector: `app-tab3`,
    templateUrl: `tab3.page.html`,
})
export default class Tab3Page {}
