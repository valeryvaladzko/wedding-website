import type { Translations } from "./ru";

export const pl: Translations = {
  nav: {
    home: "Główna",
    schedule: "Program",
    party: "Goście",
    photos: "Zdjęcia",
    faq: "Pytania",
    rsvp: "Ankieta",
  },
  common: {
    loading: "Ładowanie…",
    saving: "Zapisuję…",
    saved: "Zapisano",
    edit: "Edytuj",
    save: "Zapisz",
    cancel: "Anuluj",
    next: "Dalej",
    back: "Wstecz",
    confirm: "Potwierdź",
    openInMaps: "Otwórz w Google Maps",
    addToCalendar: "Dodaj do kalendarza",
  },
  status: {
    pending: "Oczekiwane",
    accepted: "Idę",
    declined: "Nie idę",
  },
  guestGate: {
    welcomeTitle: "Witamy",
    welcomeBody:
      "To spersonalizowane zaproszenie. Otwórz link z zaproszenia, aby kontynuować.",
    errorTitle: "Nie udało się wczytać zaproszenia",
    errorBody:
      "Spróbuj ponownie później lub napisz do nas, jeśli problem się powtórzy.",
  },
  home: {
    eyebrow: "Bierzemy ślub",
    coupleAnd: "&",
    welcome: "Witaj, {{name}}",
    rsvpButton: "WYPEŁNIĆ ANKIETĘ",
    welcomeBody: "Ogromnie się cieszymy, że możemy dzielić ten dzień z Tobą ❤️",
    storyTitle: "Dlaczego ten dzień jest dla nas ważny",
    storyP1:
      "Długo szliśmy do tego momentu i teraz chcemy zebrać wszystkich ukochanych ludzi w jednym miejscu. Nasz ślub nie jest o perfekcji ani o tradycjach „bo tak wypada”, ale o ciepłym, przytulnym klimacie, śmiechu i zabawie, muzyce oraz wspomnieniach, które zostaną z nami na zawsze.",
    storyP2: "Będzie nam bardzo miło dzielić ten dzień właśnie z Tobą.",
    aboutTitle: "Kilka słów o nas",
    aboutBody:
      "Nastia kocha klimatyczne miejsca, piękne detale i zatrzymywanie chwil na zdjęciach. Valera potrafi zachować spokój, rozśmieszyć w odpowiednim momencie i zawsze wie, gdzie dobrze zjeść. Razem planujemy, kolekcjonujemy wspomnienia i bardzo czekamy na dzień, w którym będziemy mogli podzielić się nim z bliskimi.",
    dressCodeTitle: "Dress code",
    dressCodeBody:
      "Zielone odcienie w ubraniach są szczególnie mile widziane — to kolor naszego ślubu. Czarno-biała paleta również będzie pasować, ale dobrze będzie dodać do stylizacji odcienie naszego dnia.",
    dressCodeBody2:
      "Nie zapomnij zabrać ze sobą ubrania na zmianę na drugi dzień świętowania ;)",
    dressCodePalette:
      "Paleta dnia: czarno-biała, kawowa, kremowa, szałwiowa i oliwkowa.",
    venueTitle: "Gdzie",
    getDirections: "Wyznacz trasę",
    countdown: "Do ślubu zostało",
    countdownDays: "dni",
    countdownHours: "godz.",
    countdownMinutes: "min",
    countdownSeconds: "sek",
    yourStatus: "Twój status",
  },
  schedule: {
    title: "Program",
    subtitle:
      "Tak będzie wyglądał nasz dzień. Dokładny harmonogram podamy później.",
    items: [
      {
        time: "~15:00",
        title: "Przyjazd gości",
        description: "Przyjazd gości, zameldowanie i zostawienie rzeczy.",
      },
      {
        time: "~17:00",
        title: "Ceremonia",
        description: "Wymiana przysięgi i obrączek.",
      },
      {
        time: "~18:00",
        title: "Kolacja",
        description: "Początek głównej części wydarzenia i kolacja.",
      },
      {
        time: "~20:00",
        title: "Impreza",
        description: "Muzyka i tańce do samego końca.",
      },
      {
        time: "Następny dzień",
        title: "Spokojny dzień",
        description:
          "Grill, basen, sauna, dzielenie się wspomnieniami i dochodzenie do siebie.",
      },
    ],
  },
  party: {
    title: "Nasi ludzie",
    subtitle: "Ci, którzy są przy nas tego dnia.",
    empty: "Lista jeszcze się aktualizuje.",
    loadError: "Nie udało się wczytać listy. Spróbuj później.",
  },
  faq: {
    title: "Pytania i odpowiedzi",
    subtitle: "Najważniejsze rzeczy w skrócie.",
    items: [
      {
        q: "Jaki jest dress code?",
        a: "Elegancki, tak jakbyście przyszli na ślub. Zielone odcienie są mile widziane, czarno-biała paleta też świetnie pasuje. Więcej informacji znajdziecie na stronie głównej.",
      },
      {
        q: "Czy można z dziećmi?",
        a: "Kochamy wasze dzieci, ale to świętowanie dla dorosłych, żeby rodzice mogli naprawdę odpocząć.",
      },
      {
        q: "Czy można ze zwierzętami?",
        a: "Kochamy wasze zwierzęta, ale to świętowanie dla ludzi, żeby właściciele mogli naprawdę odpocząć.",
      },
      {
        q: "Czy można przyjść z osobą towarzyszącą?",
        a: "Tylko jeśli Wasza osoba towarzysząca również otrzymała zaproszenie. Jeśli o kimś zapomnieliśmy, skontaktujcie się z nami bezpośrednio.",
      },
      {
        q: "A co z preferencjami jedzeniowymi?",
        a: "W ankiecie będzie można wskazać preferencje dotyczące dania: kurczak, mięso, ryba lub opcja wegetariańska. Tam też można wpisać alergie i inne życzenia.",
      },
      {
        q: "Gdzie dokładnie odbywa się uroczystość?",
        a: '"Rezydencja Nowy Orlean" Papiernia 4K, Stanisławów, 05-304. Adres, link do Google Maps i mapa są na stronie głównej.',
      },
      {
        q: "Co zabrać na drugi dzień?",
        a: "Drugi dzień będzie miał ciepły, luźny charakter: grill, basen i sauna. Weźcie wygodne ubranie i buty, strój kąpielowy, ręcznik i klapki. Jeśli lubicie saunę — czapkę do sauny.",
      },
      {
        q: "Czy mogę kogoś podwieźć?",
        a: "Tak, prosimy! Jeśli macie wolne miejsca w aucie, zaznaczcie to w ankiecie i wpiszcie szczegóły — skontaktujemy Was z osobami, które potrzebują transportu.",
      },
      {
        q: "Czy przynosić kwiaty?",
        a: "Będzie nam trochę smutno patrzeć, jak kwiaty więdną po świętowaniu, dlatego zamiast bukietów ucieszymy się z losów na loterię, butelki dobrego alkoholu albo małych pamiątkowych prezentów od Was — takich, które jeszcze długo będą przypominać nam o tym dniu i o Was.",
      },
    ],
  },
  photos: {
    title: "Zdjęcia",
    subtitle: "Wspólny album — dodawaj swoje zdjęcia i oglądaj nasze.",
    openFolder: "Otwórz wspólny album",
    empty: "Jeszcze pusto — zajrzyj po ślubie!",
    error: "Nie udało się wczytać zdjęć. Spróbuj później.",
  },
  rsvp: {
    title: "Ankieta gościa",
    subtitleNamed: "Cześć, {{name}}! Daj znać, jak mamy z Tobą planować.",
    steps: {
      attend: "Obecność",
      menu: "Menu",
      logistics: "Drugi dzień",
      notes: "Notatki",
      review: "Gotowe",
    },
    stepOf: "Krok {{step}} z {{total}}",
    attendQuestion: "Będziesz z nami?",
    attendYes: "Z radością będę",
    attendNo: "Niestety nie dam rady",
    menuTitle: "Na co masz ochotę?",
    menuHint: "Wybierz po jednej opcji w każdej kategorii.",
    soupLabel: "Zupa",
    mealLabel: "Danie główne",
    alcoholLabel: "Napój",
    soupOptions: {
      borscht: "Barszcz bez mięsa",
      cheese: "Zupa serowa",
      salmon: "Krem z łososia",
      vegetables: "Krem z warzyw",
    },
    mealOptions: {
      beef: "Wołowina",
      pork: "Wieprzowina",
      chicken: "Kurczak",
      fish: "Ryba",
      veg: "Wegetariańskie",
    },
    alcoholOptions: {
      wine: "Wino",
      vodka: "Wódka",
      whiskey: "Whisky",
      soft: "Bezalkoholowe",
      other: "Inne",
    },
    alcoholOtherLabel: "Co preferujesz?",
    alcoholOtherPlaceholder: "Np. prosecco, whisky Old Fashioned…",
    logisticsTitle: "Drugi dzień i transport",
    secondDayLabel: "Zostajesz na drugi dzień?",
    secondDayYes: "Tak, z przyjemnością",
    secondDayNo: "Nie, dziękuję",
    secondDayMaybe: "Jeszcze nie wiem",
    secondDayHint:
      "Drugi dzień to luźny format: grill, basen i sauna. Weź wygodne ubranie, strój kąpielowy i ręcznik.",
    transportLabel: "Możesz kogoś podwieźć?",
    transportYes: "Tak, mam wolne miejsca",
    transportNo: "Nie",
    transportDetailsLabel: "Skąd jedziesz i ile masz miejsc?",
    transportDetailsPlaceholder: "Np. z Warszawy, 2 wolne miejsca",
    notesTitle: "Co powinniśmy wiedzieć?",
    notesHint:
      "Alergie, preferencje żywieniowe, ulubiona piosenka — wszystko się przyda.",
    notesPlaceholder: "Notatki dla pary",
    reviewTitle: "Sprawdź wszystko",
    fields: {
      attendance: "Udział",
      menu: "Menu",
      secondDay: "Drugi dzień",
      transport: "Transport",
      notes: "Notatki",
    },
    confirm: "Wyślij odpowiedź",
    savedHint: "Zapisano ❤️ Wracaj i zmieniaj, kiedy chcesz.",
    editSection: "Edytuj",
    saveError: "Coś poszło nie tak. Spróbuj ponownie.",
  },
  intro: {
    greeting: "Witamy",
    coupleAnd: "&",
    tagline: "Do zobaczenia wkrótce",
    skip: "Dotknij, aby kontynuować",
  },
};
