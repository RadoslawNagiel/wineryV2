import { Routes } from '@angular/router';
import TabWinesPage from './tab-wines.page';
import WinePage from './wine/wine.page';

export const routes: Routes = [
    {
        path: '',
        component: TabWinesPage,
    },
    {
        path: ':slug',
        component: WinePage,
    },
];
export default routes;
