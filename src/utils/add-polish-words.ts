import { wordVariations } from 'polish-word-variations';

export const addPolishWords = () => {
    wordVariations.addWords({
        butelki: {
            nominative: {
                plural: `butelek`,
                dual: `butelki`,
                singular: `butelka`,
            },
            genitive: {
                singular: `butelki`,
                plural: `butelek`,
            },
        },
    });
};
