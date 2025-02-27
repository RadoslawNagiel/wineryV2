import { ProductStage, ProductStageDescription, ProductionStage } from '../interfaces';
import { GUIDE_NAME } from './guides';

export const PRODUCT_STAGES: ProductStage[] = [
    {
        name: ProductionStage.Preparation,
        date: 0,
        description: ``,
    },
    {
        name: ProductionStage.Straining,
        date: 86400000 * 7,
    },
    {
        name: ProductionStage.Drainage,
        date: 86400000 * 35,
    },
    {
        name: ProductionStage.StopFermentation,
        date: 86400000 * 98,
    },
    {
        name: ProductionStage.Drainage,
        date: 86400000 * 154,
    },
    {
        name: ProductionStage.Bottling,
        date: 86400000 * 210,
    },
];

export const PRODUCT_STAGES_DESCRIPTIONS: ProductStageDescription[] = [
    {
        name: ProductionStage.Preparation,
        description: `Cukier rozpuszczamy w wodzie (lub w moszczu, jeśli brak miejsca na dodatkową wodę) według poniższego kalkulatora. Otrzymany syrop cukrowy przelewamy do wiadra. Przygotowujemy zaczyn drożdżowy według zaleceń producenta i dodajemy go do wiadra jeśli temperatura moszczu jest mniejsza niż 30°C. Wiadro zamykamy pokrywką z zamontowaną rurką fermentacyjną, którą wypełniamy do połowy wodą. Moszcz należy mieszać przynajmniej raz dziennie. Temperatura moszczu powinna wynosić około 21°C.`,
        guides: [GUIDE_NAME.Equipment, GUIDE_NAME.Sterilization, GUIDE_NAME.SugarSyrup, GUIDE_NAME.WinePower],
    },
    {
        name: ProductionStage.Straining,
        description: `Moszcz przelewamy przez sito a następnie otrzymany płyn wlewamy do gąsiora. Pozostałą, wyliczoną część cukru, rozpuszczamy w wodzie według poniższego kalkulatora. Czekamy aż syrop cukrowy ostygnie do temperatury mniejszej niż 30°C, po czym dolewamy go do gąsiora. Powstały nastaw powinien już zawierać docelową ilość płynu, jeśli tak nie jest, możesz uzupełnić go wodą. Gąsior należy zatkać korkiem z rurką fermentacyjną.`,
        guides: [GUIDE_NAME.Sterilization, GUIDE_NAME.SugarSyrup, GUIDE_NAME.WinePower],
    },
    {
        name: ProductionStage.Drainage,
        description: `Proces zlewania znad osadu został opisany w poradniku ‘zlewanie znad osadu’. Pamiętaj o tym, aby cała aparatura była sterylna.`,
        guides: [GUIDE_NAME.Flooding],
    },
    {
        name: ProductionStage.StopFermentation,
        description: ``,
        descriptions: [
            `Wino zlewamy znad osadu. Następnie gąsior można już szczelnie zamknąć (bez rurki fermentacyjnej). Należy po kilku dniach sprawdzić, czy w gąsiorze nie zbiera się już dwutlenek węgla. Jeśli tak będzie, gąsior należy ponownie zatkać rurką fermentacyjną i cofnąć wykonanie tego etapu.`,
            `Wino zlewamy znad osadu. Następnie próbujemy i dosładzamy według uznania. Należy uważać, żeby nie przesadzić z cukrem. Wino nie powinno już pracować, więc możemy je szczelnie zamknąć (bez rurki fermentacyjnej). Uwaga! Należy sprawdzić po kilku dniach czy wino nie wznowiło pracy. Zadziać się tak może, kiedy nie osiągnęliśmy jeszcze alkoholu równego tolerancji drożdży. Jeśli tak będzie, należy gąsior znowu zatkać z użyciem rurki fermentacyjnej i cofnąć wykonanie tego etapu.`,
            `Wino zlewamy znad osadu. Następnie należy pozbyć się pozostałych drożdży, aby po dosłodzeniu nie był już wytwarzany alkohol. Proces ten został opisany w poradniku ‘Zatrzymanie fermentacji’. Następnie próbujemy wino i dosładzamy według uznania. Należy uważać, żeby nie przesadzić z cukrem. Wino nie powinno już pracować, więc możemy je szczelnie zamknąć (bez rurki fermentacyjnej). Uwaga! Należy sprawdzić po kilku dniach, czy wino nie wznowiło pracy. Jeśli tak będzie, oznacza to, że proces pozbycia się drożdży nie udał się i należy go powtórzyć.`,
        ],
        guides: [GUIDE_NAME.Fermentation, GUIDE_NAME.StoppingFermentation, GUIDE_NAME.SugarSyrup, GUIDE_NAME.Sweetness],
    },
    {
        name: ProductionStage.Bottling,
        description: `Jeśli wino jest klarowne i na dnie gąsiora nie zbiera się już osad, możemy przejść do butelkowania. Wino przelewamy do sterylnych butelek, które następnie zatykamy przy pomocy korkownicy. Zabutelkowane wino, powinno dojrzewać w pozycji leżącej, w temperaturze około 15°C, oraz powinno być osłonięte przed światłem.`,
        guides: [GUIDE_NAME.Bottling, GUIDE_NAME.Sweetness],
    },
];
