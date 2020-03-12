const sharp = require('sharp');
const uuid = require('uuid');
const path = require('path');

class ImageHandler {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const id = uuid.v4();
    const filename = `${id}.jpg`;
    const thumbnailname = `thumb_${id}.jpg`
    const filepath = this.makeFilePath(filename);
    const thumbpath = this.makeFilePath(thumbnailname);

    await Promise.all([
        sharp(buffer)
          .toFile(filepath),

        sharp(buffer)
          .resize(100, 100, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
          })
          .toFile(thumbpath)
        ]);

    return id;
  }
  makeFilePath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = ImageHandler;