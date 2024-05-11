import { Routes } from '@angular/router';
import Tab3Page from './tab3.page';
import RecipePage from './recipe/recipe.page';

export const routes: Routes = [
    {
        path: '',
        component: Tab3Page,
    },
    {
        path: ':slug',
        component: RecipePage,
    },
];
export default routes;
