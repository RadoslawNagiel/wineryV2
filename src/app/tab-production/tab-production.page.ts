import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Wine } from '../../utils/interfaces';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchPipe } from '../../pipes/search.pipe';
import { NoDataComponent } from '../../components/no-data/no-data.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `tab-production`,
    templateUrl: `tab-production.page.html`,
    imports: [IonicModule, DatePipe, HeaderComponent, SearchPipe, NoDataComponent],
})
export default class TabProductionPage {
    searchValue = signal(``);

    wines = signal<Wine[]>([
        {
            id: Math.random.toString(),
            name: `Wino gronowe`,
            description: `Rozkoszuj się bogactwem natury w każdym kieliszku tego doskonałego wina winogronowego. Jego złocista barwa przyciąga uwagę, jak promienie słońca w złotej godzinie. Głęboki aromat świeżych winogron wita Cię od pierwszego wdechu, otwierając drzwi do krainy pełnej owocowych nut i delikatnych kwiatowych akcentów. Smak tego wina jest pełen harmonii - od subtelnej słodyczy po wyważoną kwasowość, każdy łyk jest niczym podróż po smakowych zaułkach winnicy. Zakończenie jest eleganckie i długotrwałe, zostawiając na podniebieniu delikatne nuty owocowych esencji, które pragniesz ponownie odkryć. To wino, które nie tylko zachwyca zmysły, ale również przenosi Cię w podróż przez piękno i bogactwo winiarskiego rzemiosła.`,
            createDate: new Date(),
            capacity: 10,
            power: 12,
        },
        {
            id: Math.random.toString(),
            name: `Wino gronowe`,
            description: `Rozkoszuj się bogactwem natury w każdym kieliszku tego doskonałego wina winogronowego. Jego złocista barwa przyciąga uwagę, jak promienie słońca w złotej godzinie. Głęboki aromat świeżych winogron wita Cię od pierwszego wdechu, otwierając drzwi do krainy pełnej owocowych nut i delikatnych kwiatowych akcentów. Smak tego wina jest pełen harmonii - od subtelnej słodyczy po wyważoną kwasowość, każdy łyk jest niczym podróż po smakowych zaułkach winnicy. Zakończenie jest eleganckie i długotrwałe, zostawiając na podniebieniu delikatne nuty owocowych esencji, które pragniesz ponownie odkryć. To wino, które nie tylko zachwyca zmysły, ale również przenosi Cię w podróż przez piękno i bogactwo winiarskiego rzemiosła.`,
            createDate: new Date(),
            capacity: 10,
            power: 12,
        },
        {
            id: Math.random.toString(),
            name: `Wino gronowe`,
            description: `Rozkoszuj się bogactwem natury w każdym kieliszku tego doskonałego wina winogronowego. Jego złocista barwa przyciąga uwagę, jak promienie słońca w złotej godzinie. Głęboki aromat świeżych winogron wita Cię od pierwszego wdechu, otwierając drzwi do krainy pełnej owocowych nut i delikatnych kwiatowych akcentów. Smak tego wina jest pełen harmonii - od subtelnej słodyczy po wyważoną kwasowość, każdy łyk jest niczym podróż po smakowych zaułkach winnicy. Zakończenie jest eleganckie i długotrwałe, zostawiając na podniebieniu delikatne nuty owocowych esencji, które pragniesz ponownie odkryć. To wino, które nie tylko zachwyca zmysły, ale również przenosi Cię w podróż przez piękno i bogactwo winiarskiego rzemiosła.`,
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
