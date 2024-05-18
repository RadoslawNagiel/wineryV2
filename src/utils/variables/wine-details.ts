export const WINE_DETAILS: {
    label: string;
    key: string;
    format?: (value: any) => any;
}[] = [
    {
        label: `Rocznik`,
        key: `createDate`,
        format: (value: Date) => new Date(value).getFullYear(),
    },
    {
        label: `Moc`,
        key: `power`,
        format: (value: string) => `${value}%`,
    },
    {
        label: `Drożdże`,
        key: `yeast`,
    },
    {
        label: `Słodkość`,
        key: `sweetness`,
    },
];

export const WINE_IN_PROGRESS_DETAILS: {
    label: string;
    key: string;
    format?: (value: any) => any;
}[] = [
    {
        label: `Data utworzenia`,
        key: `createDate`,
        format: (value: Date) => new Date(value).toLocaleDateString(),
    },
    {
        label: `Moc`,
        key: `power`,
        format: (value: string) => `${value}%`,
    },
    {
        label: `Pojemność`,
        key: `capacity`,
        format: (value: string) => `${value} l`,
    },
    {
        label: `Drożdże`,
        key: `yeast`,
    },
    {
        label: `Słodkość`,
        key: `sweetness`,
    },
];
