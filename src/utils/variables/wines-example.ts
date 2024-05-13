import { Wine } from '../interfaces';
import { RECIPES } from './recipes';

export const WINES_EXAMPLE: Wine[] = [
    {
        id: Math.random().toString(),
        name: `Wino gronowe`,
        description: `Wino stworzone z winogron`,
        createDate: new Date(),
        capacity: 10,
        power: 12,
        recipe: RECIPES[0],
        yeast: `Drożdże 18% amprio`,
        imageBase64: `/assets/example-wine.jpg`,
    },
    {
        id: Math.random().toString(),
        name: `Wino gronowe`,
        description: `Wino stworzone z winogron`,
        createDate: new Date(),
        capacity: 10,
        power: 12,
        recipe: RECIPES[1],
        yeast: `Drożdże 18% amprio`,
    },
    {
        id: Math.random().toString(),
        name: `Wino gronowe`,
        description: `Wino stworzone z winogron`,
        createDate: new Date(),
        capacity: 10,
        power: 12,
        recipe: RECIPES[0],
        yeast: `Drożdże 18% amprio`,
    },
    {
        id: Math.random().toString(),
        name: `Wino gronowe`,
        description: `Wino stworzone z winogron`,
        createDate: new Date(),
        capacity: 10,
        power: 12,
        recipe: RECIPES[0],
        yeast: `Drożdże 18% amprio`,
    },
    {
        id: Math.random().toString(),
        name: `Wino gronowe`,
        description: `Wino stworzone z winogron`,
        createDate: new Date(),
        capacity: 10,
        power: 12,
        recipe: RECIPES[0],
        yeast: `Drożdże 18% amprio`,
    },
];
