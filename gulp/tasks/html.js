import fileinclude from "gulp-file-include";
import versionNumber from "gulp-version-number";
import gulpHtmlImgWrapper from "gulp-html-img-wrapper";

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(fileinclude())
    .pipe(
      gulpHtmlImgWrapper({
        logger: true,
        extensions: [".jpg", ".jpeg"],
      })
    )
    .pipe(
      versionNumber({
        value: "%DT%",
        append: {
          key: "_v",
          cover: 0,
          to: ["css", "js"],
        },
        output: {
          file: "gulp/version.json",
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};
