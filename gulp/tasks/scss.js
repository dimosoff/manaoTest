import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import autoPrefixer from "gulp-autoprefixer";
import groupCss from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(groupCss())
    .pipe(
      autoPrefixer({
        grid: "no-autoplace",
      })
    )
    .pipe(app.gulp.dest(app.path.build.styles))
    .pipe(cleanCss())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.styles))
    .pipe(app.plugins.browsersync.stream());
};
