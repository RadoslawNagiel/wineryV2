import { Routes } from '@angular/router';
import TabRecipesPage from './tab-recipes.page';
import RecipePage from './recipe/recipe.page';

export const routes: Routes = [
    {
        path: '',
        component: TabRecipesPage,
    },
    {
        path: ':slug',
        component: RecipePage,
    },
];
export default routes;
