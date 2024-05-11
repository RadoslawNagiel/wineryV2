import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonHeader } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `app-tab1`,
    templateUrl: `tab1.page.html`,
    styleUrls: [`tab1.page.scss`],
    imports: [IonicModule, ExploreContainerComponent],
})
export default class Tab1Page {}
