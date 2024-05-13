import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'image-holder',
    templateUrl: './image-holder.component.html',
})
export class ImageHolderComponent {
    ratio = input<number>(1);
    url = input<string>();
}
