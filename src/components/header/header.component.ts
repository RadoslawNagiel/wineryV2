import { Component, EventEmitter, Output, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    imports: [IonicModule],
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    @Output() readonly searchChanged = new EventEmitter<string>();

    header = input.required<string>();
    search = input(true);
}
