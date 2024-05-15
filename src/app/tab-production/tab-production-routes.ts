import { Routes } from '@angular/router';
import TabProductionPage from './tab-production.page';
import AddWinePage from './add-wine/add-wine.page';
import DetailPage from './add-wine/detail/detail.page';
import WineInProgressPage from './wine-in-progress/wine-in-progress.page';

export const routes: Routes = [
    {
        path: '',
        component: TabProductionPage,
    },
    {
        path: 'add-wine',
        component: AddWinePage,
    },
    {
        path: 'add-wine/detail',
        component: DetailPage,
    },
    {
        path: ':slug',
        component: WineInProgressPage,
    },
];
export default routes;
