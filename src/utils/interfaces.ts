export interface Wine {
    id: string;
    name: string;
    description: string;
    createDate: Date;
    capacity: number;
    power: number;
    yeast?: string;
    yeastTolerance?: number;
    sweetness?: Sweetness;
    startSugar?: number;
    recipe?: Recipe;
    done?: boolean;
    numberOfBottles?: number;
    stagesDone?: boolean[];
    imageBase64?: string;
}

export interface Ingredient {
    name: string;
    value: number;
    unit: Units;
}

export interface Recipe {
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
    Wytrawne,
    Półwytrawne,
    Półsłodkie,
    Słodkie,
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
