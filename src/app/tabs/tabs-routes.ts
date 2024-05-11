import { Routes } from '@angular/router';
import TabsPage from './tabs.page';

export const routes: Routes = [
    {
        path: `tabs`,
        component: TabsPage,
        children: [
            {
                path: `tab1`,
                loadChildren: async () => import(`../tab1/tab1-routes`),
            },
            {
                path: `tab2`,
                loadChildren: async () => import(`../tab2/tab2-routes`),
            },
            {
                path: `tab3`,
                loadChildren: async () => import(`../tab3/tab3-routes`),
            },
            {
                path: `tab4`,
                loadChildren: async () => import(`../tab4/tab4-routes`),
            },
            {
                path: ``,
                redirectTo: `/tabs/tab1`,
                pathMatch: `full`,
            },
        ],
    },
    {
        path: ``,
        redirectTo: `/tabs/tab1`,
        pathMatch: `full`,
    },
];
export default routes;
