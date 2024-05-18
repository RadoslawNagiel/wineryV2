import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { Recipe, Wine } from '../interfaces';

import { AddRecipe, AddWine, RemoveRecipe, RemoveWine, SetRecipes, SetStore, SetWines, UpdateWine } from './app.actions';

export interface AppStateModel {
    wines: Wine[];
    recipes: Recipe[];
}

@State<AppStateModel>({
    name: `app`,
    defaults: {
        wines: [],
        recipes: [],
    },
})
@Injectable()
export class AppState {
    @Action(SetStore)
    setStore(ctx: StateContext<AppStateModel>, action: SetStore) {
        ctx.setState(action.store);
    }

    // WINE

    @Action(SetWines)
    setWines(ctx: StateContext<AppStateModel>, action: SetWines) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            wines: action.wines,
        });
        this.savePreferences(ctx.getState());
    }

    @Action(AddWine)
    addWine(ctx: StateContext<AppStateModel>, action: AddWine) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            wines: [...state.wines, action.wine],
        });
        this.savePreferences(ctx.getState());
    }

    @Action(RemoveWine)
    removeWine(ctx: StateContext<AppStateModel>, action: RemoveWine) {
        const state = ctx.getState();
        const index = state.wines.findIndex((el) => el.id === action.id);
        if (index !== -1) {
            state.wines.splice(index, 1);
            ctx.setState(structuredClone(state));
        }
        this.savePreferences(ctx.getState());
    }

    @Action(UpdateWine)
    updateWine(ctx: StateContext<AppStateModel>, action: UpdateWine) {
        const state = ctx.getState();
        const index = state.wines.findIndex((el) => el.id === action.id);
        if (index !== -1) {
            state.wines[index] = action.wine;
            ctx.setState(structuredClone(state));
        }
        this.savePreferences(ctx.getState());
    }

    // RECIPE

    @Action(SetRecipes)
    setRecipes(ctx: StateContext<AppStateModel>, action: SetRecipes) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            recipes: action.recipe,
        });
        this.savePreferences(ctx.getState());
    }

    @Action(AddRecipe)
    addRecipe(ctx: StateContext<AppStateModel>, action: AddRecipe) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            recipes: [action.recipe, ...state.recipes],
        });
        this.savePreferences(ctx.getState());
    }

    @Action(RemoveRecipe)
    removeRecipe(ctx: StateContext<AppStateModel>, action: RemoveRecipe) {
        const state = ctx.getState();
        const index = state.recipes.findIndex((el) => el.slug === action.slug);
        if (index !== -1) {
            state.recipes.splice(index, 1);
            ctx.setState(structuredClone(state));
        }
        this.savePreferences(ctx.getState());
    }

    savePreferences(state: AppStateModel) {
        localStorage.setItem(`state`, JSON.stringify(state));
    }
}
