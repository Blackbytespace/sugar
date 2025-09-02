import chalk from 'chalk';
chalk.level = 3;

/**
 * @name                tagsMap
 * @namespace           node.console
 * @type                Object
 * @platform            node
 * @status              stable
 * @private
 *
 * Store the tag->function map used in ```parseHtml``` function for example
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
const tagsMap = {
  black: (tag, content) => chalk.black(content),
  red: (tag, content) => chalk.red(content),
  green: (tag, content) => chalk.green(content),
  yellow: (tag, content) => chalk.yellow(content),
  blue: (tag, content) => chalk.blue(content),
  magenta: (tag, content) => chalk.magenta(content),
  cyan: (tag, content) => chalk.cyan(content),
  white: (tag, content) => chalk.white(content),
  grey: (tag, content) => chalk.grey(content),

  bgBlack: (tag, content) => chalk.bgBlack(content),
  bgRed: (tag, content) => chalk.bgRed(content),
  bgGreen: (tag, content) => chalk.bgGreen(content),
  bgYellow: (tag, content) => chalk.bgYellow(content),
  bgBlue: (tag, content) => chalk.bgBlue(content),
  bgMagenta: (tag, content) => chalk.bgMagenta(content),
  bgCyan: (tag, content) => chalk.bgCyan(content),
  bgWhite: (tag, content) => chalk.bgWhite(content),

  bold: (tag, content) => chalk.bold(content),
  dim: (tag, content) => chalk.dim(content),
  italic: (tag, content) => chalk.italic(content),
  underline: (tag, content) => chalk.underline(content),
  strike: (tag, content) => chalk.strikethrough(content),

  h1: (tag, content) => {
    return chalk.underline(chalk.bold(content)) + '\n\n';
  },

  h2: (tag, content) => {
    return chalk.bold(content) + '\n';
  },

  date: (tag, content) =>
    new Date().getDate().toString().padStart(2, '0') +
    '-' +
    (new Date().getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    new Date().getFullYear().toString().padStart(2, '0'),
  time: (tag, content) =>
    new Date().getHours().toString().padStart(2, '0') +
    ':' +
    new Date().getMinutes().toString().padStart(2, '0') +
    ':' +
    new Date().getMinutes().toString().padStart(2, '0'),
  day: (tag, content) => new Date().getDate().toString().padStart(2, '0'),
  days: (tag, content) => new Date().getDate().toString().padStart(2, '0'),
  month: (tag, content) => new Date().getMonth().toString().padStart(2, '0'),
  months: (tag, content) => new Date().getMonth().toString().padStart(2, '0'),
  year: (tag, content) => new Date().getFullYear().toString().padStart(2, '0'),
  years: (tag, content) => new Date().getFullYear().toString().padStart(2, '0'),
  hour: (tag, content) => new Date().getHours().toString().padStart(2, '0'),
  hours: (tag, content) => new Date().getHours().toString().padStart(2, '0'),
  minute: (tag, content) => new Date().getMinutes().toString().padStart(2, '0'),
  minutes: (tag, content) =>
    new Date().getMinutes().toString().padStart(2, '0'),
  second: (tag, content) => new Date().getSeconds().toString().padStart(2, '0'),
  seconds: (tag, content) =>
    new Date().getSeconds().toString().padStart(2, '0'),

  hr: (tag, content) => '-'.repeat(process.stdout.columns - 4),
  br: (tag, content) => '\n',
};

[
  'date',
  'time',
  'day',
  'days',
  'month',
  'months',
  'year',
  'years',
  'hour',
  'hours',
  'minute',
  'minutes',
  'second',
  'seconds',
  'hr',
  'br',
].forEach((tag) => {
  Object.defineProperty(tagsMap[tag], 'tagType', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: 'single',
  });
});

export default tagsMap;
