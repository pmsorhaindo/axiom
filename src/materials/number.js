export const NUMBER_SEPARATOR = '\u2009';

const isInvalidNumber = (number) =>
  isNaN(parseFloat(number)) || !isFinite(number);

const isInvalidPrecision = (precision) =>
  isNaN(parseInt(precision)) && precision % 1 === 0 && precision >= 0 && precision <= 20;

const toFixed = (number, precision) => {
  if (!isInvalidPrecision(precision)) {
    number = number.toFixed(precision);
  }

  return number.toString().replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1');
};

const toSuffixed = (number, precision, suffixes) => {
  const threshold = 9999;
  const metricSuffix = [
    { n: 1E12, suffix: suffixes.TRILLION },
    { n: 1E9, suffix: suffixes.BILLION },
    { n: 1E6, suffix: suffixes.MILLION },
    { n: 1E3, suffix: suffixes.THOUSAND },
  ];

  if (isInvalidNumber(number)) {
    return '-';
  }

  if (number <= threshold) {
    return longNumber(number, precision);
  }

  for (let i = 0; i < metricSuffix.length; i++) {
    if (number >= metricSuffix[i].n) {
      return `${toFixed(number / metricSuffix[i].n, precision)}${metricSuffix[i].suffix}`;
    }
  }
};

export const longNumber = (number, precision = 0) => {
  if (isInvalidNumber(number)) {
    return '-';
  }

  const [ integer, fraction ] = toFixed(number, precision).split('.');
  const formatted = parseFloat(integer)
    .toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${NUMBER_SEPARATOR}`);

  return fraction ? `${formatted}.${fraction}` : formatted;
};

export const shortNumber = (number, precision = 0) =>
  toSuffixed(number, precision, {
    TRILLION: ' trillion',
    BILLION: ' billion',
    MILLION: ' million',
    THOUSAND: ' thousand',
  });

export const tinyNumber = (number, precision = 0) =>
  toSuffixed(number, precision, {
    TRILLION: 'T',
    BILLION: 'B',
    MILLION: 'M',
    THOUSAND: 'K',
  });
