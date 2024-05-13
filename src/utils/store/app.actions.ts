import { Recipe, Wine } from '../interfaces';
import { AppStateModel } from './app.state';

export class SetStore {
    static readonly type = '[App] Set Store';
    constructor(public store: AppStateModel) {}
}

// WINE

export class SetWines {
    static readonly type = '[App] Set Wines';
    constructor(public wines: Wine[]) {}
}

export class AddWine {
    static readonly type = '[App] Add Wine';
    constructor(public wine: Wine) {}
}

export class RemoveWine {
    static readonly type = '[App] Remove Wine';
    constructor(public id: string) {}
}

export class UpdateWine {
    static readonly type = '[App] Update Wine';
    constructor(
        public wine: Wine,
        public id: string,
    ) {}
}

// RECIPE

export class SetRecipes {
    static readonly type = '[App] Set Recipes';
    constructor(public recipe: Recipe[]) {}
}

export class AddRecipe {
    static readonly type = '[App] Add Recipe';
    constructor(public recipe: Recipe) {}
}

export class RemoveRecipe {
    static readonly type = '[App] Remove Recipe';
    constructor(public slug: string) {}
}
