import { Routes } from '@angular/router';
import TabProductionPage from './tab-production.page';
import AddWinePage from './add-wine/add-wine.page';
import DetailPage from './detail/detail.page';

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
];
export default routes;
