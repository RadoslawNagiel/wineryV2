import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Wine } from '../../utils/interfaces';
import { SearchPipe } from '../pipes/search.pipe';
import { HeaderComponent } from '../../components/header/header.component';
import { NoDataComponent } from '../../components/no-data/no-data.component';
import { RouterLink } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `app-tab2`,
    templateUrl: `tab2.page.html`,
    imports: [IonicModule, DatePipe, SearchPipe, HeaderComponent, NoDataComponent, RouterLink],
})
export default class Tab2Page {
    searchValue = signal(``);

    wines = signal<Wine[]>([
        {
            id: Math.random.toString(),
            name: `Wino gronowe`,
            description: `Wino stworzone z winogron`,
            createDate: new Date(),
            capacity: 10,
            power: 12,
        },
        {
            id: Math.random.toString(),
            name: `Wino gronowe`,
            description: `Wino stworzone z winogron`,
            createDate: new Date(),
            capacity: 10,
            power: 12,
        },
        {
            id: Math.random.toString(),
            name: `Wino gronowe`,
            description: `Wino stworzone z winogron`,
            createDate: new Date(),
            capacity: 10,
            power: 12,
        },
        {
            id: Math.random.toString(),
            name: `Wino gronowe`,
            description: `Wino stworzone z winogron`,
            createDate: new Date(),
            capacity: 10,
            power: 12,
        },
        {
            id: Math.random.toString(),
            name: `Wino gronowe`,
            description: `Wino stworzone z winogron`,
            createDate: new Date(),
            capacity: 10,
            power: 12,
        },
    ]);
}
