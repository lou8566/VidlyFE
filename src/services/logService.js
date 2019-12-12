import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://940e03962d6f45d5b7bc253fc7ae0504@sentry.io/1854140"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
