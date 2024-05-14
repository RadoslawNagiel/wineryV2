import { ProductionStage, Recipe } from './interfaces';
import { PRODUCT_STAGES, PRODUCT_STAGES_DESCRIPTIONS } from './variables/product-stages';
import { RECIPES } from './variables/recipes';

export const getRecipesDetail = (recipes: Recipe[]) => {
    recipes.forEach((recipe) => (recipe.manualAdded = true));
    const allRecipes = recipes.concat(structuredClone(RECIPES));
    allRecipes.forEach((recipe) => {
        const description = structuredClone(recipe.productStages[0].description);
        recipe.productStages = structuredClone(PRODUCT_STAGES);
        recipe.productStages.forEach((stage) => {
            stage.description = getStageDescription(stage.name, description);
        });
        // recipe.productStages[0].description = description;
    });
    return allRecipes;
};

export const getStageDescription = (stageName: ProductionStage, preparationDescription?: string) => {
    let description = structuredClone(PRODUCT_STAGES_DESCRIPTIONS).find((description) => description.name === stageName)?.description ?? ``;
    if (stageName === ProductionStage.Preparation) {
        description =
            preparationDescription +
            `
` +
            description;
    }
    if (stageName === ProductionStage.StopFermentation) {
        const stageDesc = structuredClone(PRODUCT_STAGES_DESCRIPTIONS).find((desc) => desc.name === stageName)?.descriptions?.[2] ?? ``;
        description = `(Opis różny w zależności od słodkości i mocy wina) ${stageDesc}`;
    }
    return description.trim();
};
