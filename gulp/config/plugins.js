import browserSync from "browser-sync";
import newer from "gulp-newer";
import debug from "gulp-debug";

export const plugins = {
  browsersync: browserSync,
  newer: newer,
  debug: debug,
};
