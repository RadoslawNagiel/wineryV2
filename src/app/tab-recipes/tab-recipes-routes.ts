import { Routes } from '@angular/router';
import TabRecipesPage from './tab-recipes.page';
import RecipePage from './recipe/recipe.page';
import AddRecipePage from './add-recipe/add-recipe.page';

export const routes: Routes = [
    {
        path: '',
        component: TabRecipesPage,
    },
    {
        path: 'add-recipe',
        component: AddRecipePage,
    },
    {
        path: ':slug',
        component: RecipePage,
    },
];
export default routes;
