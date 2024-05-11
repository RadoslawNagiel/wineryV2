import { Routes } from '@angular/router';
import TabGuidesPage from './tab-guides.page';
import GuidePage from './guide/guide.page';

export const routes: Routes = [
    {
        path: '',
        component: TabGuidesPage,
    },
    {
        path: ':slug',
        component: GuidePage,
    },
];
export default routes;
