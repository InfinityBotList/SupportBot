/**
 * CUSTOM CONSOLE LOGGER
 *
 * Copyright: Ⓒ 2023 - Toxic Dev
 */

const chalk = require("chalk");

const TYPES = {
  info: "info",
  error: "error",
  success: "success",
  warning: "warning",
  debug: "debug",
  command: "command",
  event: "event",
  ready: "ready",
  router: "router",
  client: "client",
  start: "start",
  slash: "slash",
};

const COLORS = {
  [TYPES.info]: {
    text: chalk.blue,
    background: chalk.black.bgBlue,
  },
  [TYPES.success]: {
    text: chalk.green,
    background: chalk.black.bgGreen,
  },
  [TYPES.error]: {
    text: chalk.red,
    background: chalk.black.bgRed,
  },
  [TYPES.warning]: {
    text: chalk.yellow,
    background: chalk.black.bgYellow,
  },
  [TYPES.debug]: {
    text: chalk.gray,
    background: chalk.black.bgGray,
  },
  [TYPES.command]: {
    text: chalk.cyan,
    background: chalk.black.bgCyan,
  },
  [TYPES.slash]: {
    text: chalk.cyanBright,
    background: chalk.black.bgCyanBright,
  },
  [TYPES.event]: {
    text: chalk.white,
    background: chalk.black.bgWhite,
  },
  [TYPES.ready]: {
    text: chalk.greenBright,
    background: chalk.black.bgGreenBright,
  },
  [TYPES.router]: {
    text: chalk.blueBright,
    background: chalk.black.bgBlueBright,
  },
  [TYPES.client]: {
    text: chalk.redBright,
    background: chalk.black.bgRedBright,
  },
  [TYPES.start]: {
    text: chalk.yellowBright,
    background: chalk.black.bgYellowBright,
  },
};

/**
 * CUSTOM CONSOLE LOGGER
 *
 * @default log The logger "client"
 * @default message The logger message/content
 * @default TYPES The logger types (defined above)
 * @default COLORS The logger colors (for text and header)
 *
 */
const log = (
  message = "",
  { header: initialHeader = "", delimitor = "=", type = TYPES.info } = {
    header: "",
    delimitor: "=",
    type: TYPES.info,
  },
) => {
  let transformedMessage = message;

  const messageLength =
    transformedMessage.length % 2 === 0
      ? transformedMessage.length
      : transformedMessage.length + 1;

  const minStringLength = 80;

  if (messageLength < minStringLength) {
    transformedMessage = transformedMessage
      .padStart(minStringLength / 2 + message.length / 2, " ")
      .padEnd(minStringLength, " ");
  }

  const paddedHeader = initialHeader ? `${initialHeader}` : "";

  const header = paddedHeader
    .padStart(
      Math.floor((minStringLength - paddedHeader.length) / 2) +
        paddedHeader.length,
      delimitor,
    )
    .padEnd(minStringLength, delimitor);

  const footer = "".padStart(header.length, delimitor);

  const colorType = COLORS[type];

  console.log(`\n${colorType.background(header)}`);
  console.log(`\n${colorType.text(transformedMessage)}\n`);
  console.log(`${colorType.background(footer)}\n`);
};

module.exports = { log, TYPES };
