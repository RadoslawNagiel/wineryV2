import { Routes } from '@angular/router';
import Tab4Page from './tab4.page';
import GuidePage from './guide/guide.page';

export const routes: Routes = [
    {
        path: '',
        component: Tab4Page,
    },
    {
        path: ':slug',
        component: GuidePage,
    },
];
export default routes;
