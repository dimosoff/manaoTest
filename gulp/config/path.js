import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./build`;
const srcFolder = `./src`;

export const path = {
  build: {
    html: `${buildFolder}/`,
    files: `${buildFolder}/files/`,
    styles: `${buildFolder}/styles/`,
    images: `${buildFolder}/images/`,
    favicon: `${buildFolder}/images/favicon/`,
    scripts: `${buildFolder}/scripts/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/styles.scss`,
    files: `${srcFolder}/files/**/*.*`,
    images: [
      `${srcFolder}/images/**/*.{jpg,jpeg,png,svg}`,
      `!${srcFolder}/images/favicon/**`,
    ],
    favicon: `${srcFolder}/images/favicon/**/*.*`,
    scripts: `${srcFolder}/scripts/main.js`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/*.scss`,
    files: `${srcFolder}/files/**/*.*`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,webp,ico,svg}`,
    scripts: `${srcFolder}/scripts/*.js`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
};
