import { ProductionStage, Recipe, Units } from '../interfaces';

export const RECIPES: Recipe[] = [
    {
        name: `Wino agrestowe`,
        slug: `wino-agrestowe`,
        ingredients: [
            {
                name: `agrest`,
                value: 2000,
                unit: Units.gramy,
            },
            {
                name: `rodzynki sułtańskie`,
                value: 500,
                unit: Units.gramy,
            },
            {
                name: `sok jabłkowy bez konserwantów`,
                value: 2.211,
                unit: Units.litry,
            },
            {
                name: `klarowany miód`,
                value: 250,
                unit: Units.gramy,
            },
        ],
        productStages: [
            {
                name: ProductionStage.Preparation,
                date: 0,
                description: `Owoce dokładnie myjemy i rozdrabniamy w niewielkiej ilości wody a następnie całość wlewamy do wiadra. Dodajemy sok jabłkowy. Rozpuszczamy miód w wodzie w proporcjach 1:2, podgrzewając na wolnym ogniu. Całość dodajemy do wiadra. `,
            },
        ],
    },
    {
        name: `Wino ananasowo-winogronowe`,
        slug: `wino-ananasowo-winogronowe`,
        ingredients: [
            {
                name: `ananasy z puszki`,
                value: 967,
                unit: Units.gramy,
            },
            {
                name: `sok z jasnych winogron`,
                value: 2.2,
                unit: Units.litry,
            },
        ],
        productStages: [
            {
                name: ProductionStage.Preparation,
                date: 0,
                description: `Ananasy drobno kroimy i wlewamy wraz z syropem do wiadra. Dodajemy sok z winogron. `,
            },
        ],
    },
    {
        name: `Wino z brzoskwiń`,
        slug: `wino-z-brzoskwin`,
        ingredients: [
            {
                name: `brzoskwinie z puszki`,
                value: 955,
                unit: Units.gramy,
            },
        ],
        productStages: [
            {
                name: ProductionStage.Preparation,
                date: 0,
                description: `W wiadrze umieszczamy jak najdrobniej pokrojone brzoskwinie. `,
            },
        ],
    },
    {
        name: `Wino z czarnych porzeczek`,
        slug: `wino-z-czarnych-porzeczek`,
        ingredients: [
            {
                name: `czarne porzeczki`,
                value: 2000,
                unit: Units.gramy,
            },
        ],
        productStages: [
            {
                name: ProductionStage.Preparation,
                date: 0,
                description: `Porzeczki dokładnie myjemi a następnie wyciskamy z nich sok. Przecier umieszczamy w wiadrze. `,
            },
        ],
    },
    {
        name: `Wino z czerwonych porzeczek`,
        slug: `wino-z-czerwonych-porzeczek`,
        ingredients: [
            {
                name: `czerwone porzeczki`,
                value: 2000,
                unit: Units.gramy,
            },
            {
                name: `maliny`,
                value: 255,
                unit: Units.gramy,
            },
        ],
        productStages: [
            {
                name: ProductionStage.Preparation,
                date: 0,
                description: `Maliny przebieramy a porzeczki obrywamy z łodyżek. Owocze myjemy, mjażdżymy i umieszczamy w wiadrze. `,
            },
        ],
    },
    {
        name: `Wino z soku owocowego`,
        slug: `wino-z-soku-owocowego`,
        ingredients: [
            {
                name: `sok pomarańczowy`,
                value: 1100,
                unit: Units.litry,
            },
            {
                name: `sok jabłkowy lub ananasowy`,
                value: 1100,
                unit: Units.litry,
            },
        ],
        productStages: [
            {
                name: ProductionStage.Preparation,
                date: 0,
                description: `Soki wlewamy do wiadra. `,
            },
        ],
    },
    {
        name: `Wino z gruszek`,
        slug: `wino-z-gruszek`,
        ingredients: [
            {
                name: `gruszki`,
                value: 4000,
                unit: Units.gramy,
            },
        ],
        productStages: [
            {
                name: ProductionStage.Preparation,
                date: 0,
                description: `Gruszki myjemy, kroimy i umieszczamy w wiadrze. `,
            },
        ],
    },
    {
        name: `Wino jabłkowe`,
        slug: `wino-jabłkowe`,
        ingredients: [
            {
                name: `jabłka`,
                value: 8000,
                unit: Units.gramy,
            },
        ],
        productStages: [
            {
                name: ProductionStage.Preparation,
                date: 0,
                description: `Jabłka myjemy i drobno kroimy lub miażdżymy. Najlepiej wycisnąć je w sokowirówce. Miazgę lub sok umieszczamy w wiadrze. `,
            },
        ],
    },
    {
        name: `Wino śliwkowe`,
        slug: `wino-sliwkowe`,
        ingredients: [
            {
                name: `żółte śliwki`,
                value: 4000,
                unit: Units.gramy,
            },
        ],
        productStages: [
            {
                name: ProductionStage.Preparation,
                date: 0,
                description: `Śliwki myjemy, usuwamy pestki a następnie umieszczamy w wiadrze. `,
            },
        ],
    },
    {
        name: `Wino wiśniowe`,
        slug: `wino-wisniowe`,
        ingredients: [
            {
                name: `wiśnie z kompotu bez konserwantów`,
                value: 2000,
                unit: Units.gramy,
            },
        ],
        productStages: [
            {
                name: ProductionStage.Preparation,
                date: 0,
                description: `Wiśnie drylujemy i wraz z sokiem przelewamy do wiadra. `,
            },
        ],
    },
];
