import { Routes } from '@angular/router';
import TabsPage from './tabs.page';

export const routes: Routes = [
    {
        path: `tabs`,
        component: TabsPage,
        children: [
            {
                path: `tab-production`,
                loadChildren: async () => import(`../tab-production/tab-production-routes`),
            },
            {
                path: `tab-wines`,
                loadChildren: async () => import(`../tab-wines/tab-wines-routes`),
            },
            {
                path: `tab-recipes`,
                loadChildren: async () => import(`../tab-recipes/tab-recipes-routes`),
            },
            {
                path: `tab-guides`,
                loadChildren: async () => import(`../tab-guides/tab-guides-routes`),
            },
            {
                path: ``,
                redirectTo: `/tabs/tab-production`,
                pathMatch: `full`,
            },
        ],
    },
    {
        path: ``,
        redirectTo: `/tabs/tab-production`,
        pathMatch: `full`,
    },
];
export default routes;
