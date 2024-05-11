import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonApp } from '@ionic/angular/standalone';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IonicModule],
    selector: `app-root`,
    templateUrl: `app.component.html`,
    styleUrls: [`app.component.scss`],
})
export class AppComponent {}
