const hectaresFormatter = new Intl.NumberFormat('uk-UA', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const formatHectares = (area: number): string => `${hectaresFormatter.format(area)} га`;

const pointCountPluralRules = new Intl.PluralRules('uk-UA');

const POINT_WORD: Record<Intl.LDMLPluralRule, string> = {
  zero: 'точок',
  one: 'точка',
  two: 'точки',
  few: 'точки',
  many: 'точок',
  other: 'точок',
};

export const formatPointCount = (count: number): string =>
  `${count} ${POINT_WORD[pointCountPluralRules.select(count)]}`;
