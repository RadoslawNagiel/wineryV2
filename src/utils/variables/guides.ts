import { Calculators, Guide } from '../interfaces';

export enum GUIDE_NAME {
    CalcBlg = `Kalkulator BLG`,
    CalcGlucose = `Kalkulator syropu cukrowego`,
    Equipment = `Podstawowy sprzęt do produkcji wina`,
    Sterilization = `Sterylizacja`,
    Fermentation = `Fermentacja`,
    SugarSyrup = `Przygotowywanie syropu cukrowego`,
    Flooding = `Zlewanie znad osadu`,
    Bottling = `Butelkowanie wina`,
    StoppingFermentation = `Zatrzymanie fermentacji`,
    WinePower = `Moc wina`,
    SugarMeter = `Pomiar cukromierzem BLG`,
    Sweetness = `Słodkość wina`,
}

export const GUIDES: Guide[] = [
    {
        name: GUIDE_NAME.CalcBlg,
        description: `Oblicz moc wina.`,
        calculator: Calculators.BLG,
    },
    {
        name: GUIDE_NAME.CalcGlucose,
        description: `Oblicz objętość syropu cukrowego.`,
        calculator: Calculators.SYRUP,
    },
    {
        name: GUIDE_NAME.Equipment,
        description: `• wiadro fermentacyjne, z plastiku odpowiedniego do przechowywania żywności
• przykrywka do wiadra z rurką fermentacyjną
• duży lejek
• duże sito
• duża drewniana lub plastikowa łyżka
• szklany balon lub gąsior
• zatyczka do gąsiora z rurką fermentacyjną
• plastikowy lub gumowy wężyk do ściągania wina
• butelki do wina
• korkownica wraz z korkami
• sprzęt do czyszczenia i sterylizacji
• termometr
• cukromierz z probówką`,
    },
    {
        name: GUIDE_NAME.Sterilization,
        description: `Bardzo ważnym elementem produkcji wina jest jak największe zachowanie czystości aparatury (wszystkiego co będzie miało kontakt z winem). Sprzętu nie wystarczy tylko umyć, ale zawsze należy go wysterylizować odpowiednimi środkami takimi jak pirosiarczyn sodu czy przeróżnymi innymi preparatami do sterylizacji i dezynfekcji. Środki te należy stosować zgodnie z zaleceniami producenta.`,
    },
    {
        name: GUIDE_NAME.Fermentation,
        description: `Jest to proces rozkładania cukrów przez enzymy (wytwarzane przez drożdże), w którym powstaje alkohol oraz dwutlenek węgla. Najważniejszą fazą fermentacji jest fermentacja burzliwa, która trwa około 2-4 dni i rozpoczyna się po dodaniu wszystkich składników.    Najlepszą temperaturą dla fermentacji jest 18-24°C. Zbyt wysoka temperatura (zależnie od rodzaju, około 50°C) zabija drożdże, zbyt niska natomiast sprawia, że przestają one pracować. Podczas procesu fermentacji wytwarza się dwutlenek węgla, który powinien wydostać się z pojemnika za pomocą rurki fermentacyjnej. Rurkę tę należy wypełnić do połowy wodą tak aby dwutlenek węgla mógł się wydostać na zewnątrz, ale żeby tlen nie dostawał się do środka. Należy kontrolować poziom wody w rurce, gdyż może ona po jakimś czasie wyparować. Końcówkę rurki można też zatkać kawałkiem wacika, aby muszki nie mogły dostać się do środka.`,
    },
    {
        name: GUIDE_NAME.SugarSyrup,
        description: `Cukier oraz wodę (lub część wina) umieszczamy w garnku. Całość podgrzewamy często mieszając do momentu całkowitego rozpuszczenia cukru. Syrop przed dodaniem do wina, należy ostudzić do temperatury mniejszej niż 30°C.<br>
    Objętość syropu zawierającego 1 kilogram cukru rozpuszczonego w litrze wody, wynosi około 1.6 litra.`,
    },
    {
        name: GUIDE_NAME.Flooding,
        description: `Aby zlać wino znad osadu, należy koniec wężyka zanurzyć do połowy zawartości gąsiora. Drugi koniec wężyka mocno zasysamy i umieszczamy w drugim gąsiorze, umieszczonym poniżej pierwszego. W trakcie zlewania należy stale kontrolować zanurzenie wężyka w winie. Jego końcówka musi ciągle znajdować się poniżej płynu, ale powyżej osadu. W ten sposób zlewamy całe wino, pozostawiając osad na dnie pierwszego gąsiora.`,
    },
    {
        name: GUIDE_NAME.Bottling,
        description: `Jeżeli wino nie posiada już osadu i jest całkowicie klarowne, możemy je zabutelkować. Do butelkowania potrzebne nam będą wysterylizowane butelki, wyparzone korki oraz korkownica. Wino nalewamy do butelek a następnie zatykamy je korkami przy użyciu korkownicy. Między korkiem a powierzchnią wina, powinno być około 13 mm przerwy. Na butelki warto nakleić etykiety zawierające datę produkcji, moc i rodzaj wina. Po zabutelkowaniu wino powinno przebywać w takiej pozycji, aby korek miał stały kontakt z płynem, co zapobiega wyschnięciu korka. Wino najlepiej dojrzewa w temperaturze około 15°C. W zależności od mocy, wino może dojrzewać przez 9-24 miesiące. Im mocniejsze wino, tym dłużej powinno ono dojrzewać.`,
    },
    {
        name: GUIDE_NAME.StoppingFermentation,
        description: `JJeżeli przez rurkę nie wydostaje się już dwutlenek węgla i poziom wody w niej jest stale równy, oznacza to że drożdże przestały pracować. Jeżeli nie planujemy już dosładzać wina (aby zmienić jego słodkość), nie musimy pozbywać się pozostałych drożdży. W przeciwnym wypadku musimy użyć jednej z poniższych metod.<br>
    <b>1) Zabicie drożdży alkoholem</b><br>
    Zależnie od rodzaju drożdży, mają one różny poziom tolerancji na alkohol. Możemy pozbyć się drożdży, jeżeli moc wytworzonego alkoholu osiągnie ten poziom. Nie należy dolewać do wina wysokoprocentowego alkoholu w celu pozbycia się drożdży.<br>
    <b>2) Zabicie drożdży pirosiarczynem potasu</b><br>
    Pirosiarczynu potasu można używać nie tylko do dezynfekcji, ale również do pozbycia się drożdży. Dodatkowo stabilizuje on wino, konserwuje je i zabezpiecza. Pirosiarczyn może być jednak potem wyczuwalny w winie. Zależnie od rodzaju drożdży, zaleca się dodanie różnej ilości pirosiarczynu. Dla słabszych drożdży będzie to około 1 gram na 10 litrów wina. Dla mocniejszych, wartość ta wzrasta do około 2,5 grama na 10 litrów. Po dodaniu siarki należy sprawdzić czy fermentacja faktycznie ustała.
    <b>3) Zabicie drożdży wysoką temperaturą</b><br>
    Drożdże obumierają w wysokiej temperaturze. Przelewamy wino do garnka i podgrzewamy do ponad 50°C. Utrzymujemy tę temperaturę przez kilka minut a następnie pozostawiamy wino do ostudzenia. Po procesie tym należy sprawdzić czy fermentacja faktycznie ustała.
    `,
    },
    {
        name: GUIDE_NAME.WinePower,
        description: `Możemy zaplanować jaką moc będzie miało nasze wino. Każde 17 g cukru na litr roztworu da nam w rezultacie 1% alkoholu. Należy jednak pamiętać, że drożdże mają swoją maksymalną tolerancję na alkohol. Kiedy mamy już stworzony moszcz (bez dodatkowego cukru), możemy jego część przelać przez sito do probówki. Następnie w probówce umieszczamy cukromierz i zakręcamy nim, aby pozbyć się pęcherzyków powietrza, które mogły na nim osiąść. Aby pomiar był jak najbardziej dokładny, płyn powinien mieć temperaturę 20°C. Następnie odczytujemy z cukromierza liczbę w skali Ballinga. 1 stopień BLG to 10 g cukru na 1 kg roztworu. Zależnie od składników moszczu, ten pomiar będzie oznaczał co innego.<br>
    <b>Przykład</b><br>
    Chcemy wyprodukować 5 litrów wina o mocy 10%. Po zbadaniu moszczu cukromierzem, otrzymujemy wynik 5 Blg. Oznacza to, że w 1kg roztworu znajduje się 50g cukru. Dla uproszczenia przyjmijmy, że 1 litr roztworu waży 1kg. Tak więc w litrze roztworu mamy 50g cukru. Chcemy otrzymać trunek o mocy 10%. Wykonujemy więc mnożenie 10 × 17g i wiemy, że łącznie potrzebujemy 170g na litr. Moszcz zawiera już 50g cukru, więc potrzebujemy dodać jeszcze 120g cukru na litr. Produkujemy 5 litrów, więc w sumie potrzebujemy dodać 600g cukru.`,
    },
    {
        name: GUIDE_NAME.SugarMeter,
        description: `Aby dokonać pomiaru cukromierzem, przelewamy roztwór przez sitko do próbówki. Następnie umieszczamy w niej cukromierz i zakręcamy nim, aby pozbyć się pęcherzyków powietrza, które mogły na nim osiąść. Aby pomiar był jak najbardziej dokładny, płyn powinien mieć temperaturę 20°C. Następnie odczytujemy z cukromierza liczbę w skali Ballinga. 1 stopień BLG to 10 g cukru na 1 kg roztworu.`,
    },
    {
        name: GUIDE_NAME.Sweetness,
        description: `Wino na podstawie zawartości cukru, możemy przydzielić do poniższych kategorii.<br>
    • wytrawne - do 4-9 gramów (zależnie od kwaskowatości)<br>
    • półwytrawne - do 12-18 gramów (zależnie od kwaskowatości)<br>
    • półsłodkie - do 45 gramów<br>
    • słodkie - ponad 45 gramów`,
    },
];

export const GUIDES_SIMILAR = [
    {
        firstName: GUIDE_NAME.CalcBlg,
        secondName: GUIDE_NAME.WinePower,
    },
    {
        firstName: GUIDE_NAME.CalcBlg,
        secondName: GUIDE_NAME.SugarMeter,
    },
    {
        firstName: GUIDE_NAME.CalcBlg,
        secondName: GUIDE_NAME.Sweetness,
    },
    {
        firstName: GUIDE_NAME.CalcGlucose,
        secondName: GUIDE_NAME.SugarSyrup,
    },
    {
        firstName: GUIDE_NAME.CalcGlucose,
        secondName: GUIDE_NAME.Sweetness,
    },
    {
        firstName: GUIDE_NAME.Equipment,
        secondName: GUIDE_NAME.Sterilization,
    },
    {
        firstName: GUIDE_NAME.Equipment,
        secondName: GUIDE_NAME.Bottling,
    },
    {
        firstName: GUIDE_NAME.Sterilization,
        secondName: GUIDE_NAME.Bottling,
    },
    {
        firstName: GUIDE_NAME.Sterilization,
        secondName: GUIDE_NAME.Flooding,
    },
    {
        firstName: GUIDE_NAME.Fermentation,
        secondName: GUIDE_NAME.StoppingFermentation,
    },
    {
        firstName: GUIDE_NAME.SugarSyrup,
        secondName: GUIDE_NAME.WinePower,
    },
    {
        firstName: GUIDE_NAME.SugarSyrup,
        secondName: GUIDE_NAME.Sweetness,
    },
    {
        firstName: GUIDE_NAME.WinePower,
        secondName: GUIDE_NAME.SugarMeter,
    },
];
