const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const path = require("path");
const { promises: fs } = require("fs");

async function minimazeImage(req, res, next) {
  try {
    const destPath = path.join("public", "images");

    const { filename, path: originalPath } = req.file;

    await imagemin([`tmp/${filename}`], {
      destination: destPath,
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });

    await fs.unlink(originalPath);

    req.file = {
      ...req.file,
      path: path.join(destPath, filename),
      destination: destPath,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { minimazeImage };
