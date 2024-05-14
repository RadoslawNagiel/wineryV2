import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `detail`,
    templateUrl: `detail.page.html`,
    imports: [IonicModule],
})
export default class DetailPage {
    form = new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(40)]),
    });
}
