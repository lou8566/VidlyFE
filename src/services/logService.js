import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://d4924ede4322410487e8647acac9191e@sentry.io/1854065"
  }).install();
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
