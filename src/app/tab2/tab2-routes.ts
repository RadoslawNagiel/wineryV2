import { Routes } from '@angular/router';
import Tab2Page from './tab2.page';
import WinePage from './wine/wine.page';

export const routes: Routes = [
    {
        path: '',
        component: Tab2Page,
    },
    {
        path: ':slug',
        component: WinePage,
    },
];
export default routes;
