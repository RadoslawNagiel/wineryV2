export interface Wine {
    id: string;
    name: string;
    description: string;
    createDate: number;
    capacity: number;
    power: number;
    recipe: Recipe;
    stagesDone: boolean[];
    yeastTolerance: number;
    sweetness: Sweetness;
    done: boolean;
    yeast?: string;
    startSugar?: number;
    numberOfBottles?: number;
    imageBase64?: string;
}

export interface Ingredient {
    name: string;
    value: number;
    unit: Units;
}

export interface Recipe {
    manualAdded?: boolean;
    slug: string;
    name: string;
    ingredients: Ingredient[];
    productStages: ProductStage[];
}

export interface ProductStage {
    name: ProductionStage;
    description?: string;
    date: number;
}

export interface ProductStageDescription {
    name: ProductionStage;
    description: string;
    descriptions?: string[];
    guides: {
        name: string;
        slug: string;
    }[];
}

export interface Guide {
    slug: string;
    name: string;
    description: string;
    guides: {
        name: string;
        slug: string;
    }[];
    calculator?: Calculators;
}

export enum ProductionStage {
    Preparation = `Przygotowanie moszczu`,
    Straining = `Odcedzanie owoców`,
    Drainage = `Zlewanie znad osadu`,
    StopFermentation = `Przerwanie fermentacji`,
    Bottling = `Butelkowanie`,
}

export enum Sweetness {
    dry = `Wytrawne`,
    semiDry = `Półwytrawne`,
    semiSweet = `Półsłodkie`,
    sweet = `Słodkie`,
}

export enum Units {
    gramy = `g`,
    litry = `l`,
    sztuki = `szt.`,
}

export enum Calculators {
    SYRUP,
    BLG,
}
