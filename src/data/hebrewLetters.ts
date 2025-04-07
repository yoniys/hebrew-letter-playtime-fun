
export type HebrewLetter = {
  id: string;
  letter: string;
  name: string;
  pronunciation: string;
  audio: string;
  imageUrl?: string;
};

export const hebrewLetters: HebrewLetter[] = [
  {
    id: "alef",
    letter: "א",
    name: "Alef",
    pronunciation: "Silent or as a glottal stop",
    audio: "/audio/alef.mp3"
  },
  {
    id: "bet",
    letter: "ב",
    name: "Bet",
    pronunciation: "b as in boy",
    audio: "/audio/bet.mp3"
  },
  {
    id: "gimel",
    letter: "ג",
    name: "Gimel",
    pronunciation: "g as in go",
    audio: "/audio/gimel.mp3"
  },
  {
    id: "dalet",
    letter: "ד",
    name: "Dalet",
    pronunciation: "d as in door",
    audio: "/audio/dalet.mp3"
  },
  {
    id: "he",
    letter: "ה",
    name: "He",
    pronunciation: "h as in hello",
    audio: "/audio/he.mp3"
  },
  {
    id: "vav",
    letter: "ו",
    name: "Vav",
    pronunciation: "v as in voice",
    audio: "/audio/vav.mp3"
  },
  {
    id: "zayin",
    letter: "ז",
    name: "Zayin",
    pronunciation: "z as in zoom",
    audio: "/audio/zayin.mp3"
  },
  {
    id: "het",
    letter: "ח",
    name: "Het",
    pronunciation: "ch as in Bach",
    audio: "/audio/het.mp3"
  },
  {
    id: "tet",
    letter: "ט",
    name: "Tet",
    pronunciation: "t as in top",
    audio: "/audio/tet.mp3"
  },
  {
    id: "yod",
    letter: "י",
    name: "Yod",
    pronunciation: "y as in yes",
    audio: "/audio/yod.mp3"
  },
  {
    id: "kaf",
    letter: "כ",
    name: "Kaf",
    pronunciation: "k as in kite",
    audio: "/audio/kaf.mp3"
  },
  {
    id: "lamed",
    letter: "ל",
    name: "Lamed",
    pronunciation: "l as in look",
    audio: "/audio/lamed.mp3"
  },
  {
    id: "mem",
    letter: "מ",
    name: "Mem",
    pronunciation: "m as in mom",
    audio: "/audio/mem.mp3"
  },
  {
    id: "nun",
    letter: "נ",
    name: "Nun",
    pronunciation: "n as in no",
    audio: "/audio/nun.mp3"
  },
  {
    id: "samekh",
    letter: "ס",
    name: "Samekh",
    pronunciation: "s as in say",
    audio: "/audio/samekh.mp3"
  },
  {
    id: "ayin",
    letter: "ע",
    name: "Ayin",
    pronunciation: "Silent or guttural",
    audio: "/audio/ayin.mp3"
  },
  {
    id: "pe",
    letter: "פ",
    name: "Pe",
    pronunciation: "p as in park",
    audio: "/audio/pe.mp3"
  },
  {
    id: "tsadi",
    letter: "צ",
    name: "Tsadi",
    pronunciation: "ts as in cats",
    audio: "/audio/tsadi.mp3"
  },
  {
    id: "qof",
    letter: "ק",
    name: "Qof",
    pronunciation: "k as in kite",
    audio: "/audio/qof.mp3"
  },
  {
    id: "resh",
    letter: "ר",
    name: "Resh",
    pronunciation: "r as in run",
    audio: "/audio/resh.mp3"
  },
  {
    id: "shin",
    letter: "ש",
    name: "Shin",
    pronunciation: "sh as in shoe",
    audio: "/audio/shin.mp3"
  },
  {
    id: "tav",
    letter: "ת",
    name: "Tav",
    pronunciation: "t as in toy",
    audio: "/audio/tav.mp3"
  },
  // Final forms (sofit)
  {
    id: "kaf-sofit",
    letter: "ך",
    name: "Kaf Sofit",
    pronunciation: "k as in kite (final form)",
    audio: "/audio/kaf.mp3"
  },
  {
    id: "mem-sofit",
    letter: "ם",
    name: "Mem Sofit",
    pronunciation: "m as in mom (final form)",
    audio: "/audio/mem.mp3"
  },
  {
    id: "nun-sofit",
    letter: "ן",
    name: "Nun Sofit",
    pronunciation: "n as in no (final form)",
    audio: "/audio/nun.mp3"
  },
  {
    id: "pe-sofit",
    letter: "ף",
    name: "Pe Sofit",
    pronunciation: "p as in park (final form)",
    audio: "/audio/pe.mp3"
  },
  {
    id: "tsadi-sofit",
    letter: "ץ",
    name: "Tsadi Sofit",
    pronunciation: "ts as in cats (final form)",
    audio: "/audio/tsadi.mp3"
  }
];
