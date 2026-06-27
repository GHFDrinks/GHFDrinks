export interface ActivationDate {
  month: number | number[]; // 1-12 or array of months
  day?: number;  // 1-31
  range?: [number, number]; // [startDay, endDay]
}

export const ACTIVATION_WINDOWS: Record<string, ActivationDate> = {
  "Earth Day": { month: 4, day: 22 },
  "Zero Waste Week": { month: 9, range: [7, 13] },
  "Environment Day": { month: 6, day: 5 },
  "Martini Day": { month: 6, day: 19 },
  "G&T Day": { month: 10, day: 19 },
  "Spritz Day": { month: 8, day: 1 },
  "Buy British Day": { month: 10, day: 1 },
  "Spring/Summer": { month: [6, 7, 8], range: [1, 31] }, // June through August
  "Cocktail Day": { month: 5, day: 13 },
  "Vodka Day": { month: 10, day: 4 },
  "Whisky Day": { month: 5, day: 16 },
  "Autumn/Winter": { month: [10, 11, 12, 1, 2], range: [1, 28] }, // October through February
  "Harvest Moon": { month: 9, day: 25 },
  "Harvest Festival": { month: 9, day: 27 },
  "Lammas Day": { month: 8, day: 1 },
  "Rum Day": { month: 7, day: 11 },
  "Negroni Week": { month: 9, range: [14, 20] },
  "Summer Sip & Spritz": { month: 7, range: [1, 31] },
  "Earth Month": { month: 4, range: [1, 30] },
  "Festive": { month: 12, range: [1, 31] },
  "Rosé Day": { month: 6, day: 13 },
  "Sauvignon Blanc Day": { month: 5, day: 1 },
  "Syrah Day": { month: 12, day: 10 },
  "Chardonnay Day": { month: 5, day: 21 },
  "Pinot Noir Day": { month: 8, day: 18 },
  "Waitangi Day (NZ National Day)": { month: 2, day: 6 },
  "Easter": { month: 4, day: 5 },
  "Sushi Day": { month: 6, day: 18 },
  "World Sake Day": { month: 10, day: 1 },
  "Record Store Day": { month: 4, day: 18 }
};
