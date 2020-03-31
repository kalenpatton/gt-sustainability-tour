// Handles uploading of images to file system

const sharp = require('sharp');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql')

class ImageHandler {
  constructor(site_id, connection) {
    this.site_id = site_id;
    this.folder = path.join(process.cwd(), '/public/images/' + site_id);
    if (!fs.existsSync(this.folder)){
      fs.mkdirSync(this.folder);
    }
    this.connection = connection;
    // this.numImages = 0;
    // await connection.query("SELECT COUNT(*) as numImages FROM images WHERE site_id = ?",
    //                   [site_id],
    //                   (err, result, fields) => {
    //   if (err) {
    //     console.log(`Failed to get image count from site ${site_id}.\n\t` + err);
    //   } else {
    //     this.numImages = result[0][0].numImages;
    //   }
    // });
  }

  static deleteAll(site_id) {
    let folder = path.join(process.cwd(), '/public/images/' + site_id);
    if( fs.existsSync(folder) ) {
      fs.readdirSync(folder).forEach(function(file,index){
        var curPath = folder + "/" + file;
        if(!fs.lstatSync(curPath).isDirectory()) {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(folder);
    }
  }

  async add(buffer, index, caption) {
    // Save info to images table
    let queryString = "INSERT INTO images (site_id, `index`, caption) VALUES (?, ?, ?); SELECT LAST_INSERT_ID() AS `newId`";
    let returnVal = await this.connection.query(queryString,
                    [this.site_id, index, caption],
                    async (err, result, fields) => {
      if (err) {
        console.log("Failed to create image\n\t" + err); // Internal Server Error
        return -1;
      } else {
        let id = result[1][0].newId;

        // Save file to file system
        let filename = `${id}.jpg`;
        let thumbnailname = `thumb_${id}.jpg`
        let filepath = this.makeFilePath(filename);
        let thumbpath = this.makeFilePath(thumbnailname);

        try {
          await sharp(buffer)
            .toFile(filepath);

          await sharp(buffer)
            .resize(100, 100, {
              fit: sharp.fit.inside,
              withoutEnlargement: true
            })
            .toFile(thumbpath);
        } catch (err) {
          console.log("Failed to create image\n\t" + err); // Internal Server Error
          this.connection.query("DELETE FROM images WHERE id = ?", [id]);
          return -1;
        }
        return id;
      }
    });
    return returnVal;
  }

  // Update the index of an image.
  async updateIndex(imgId, newIndex) {
    const queryString = "UPDATE images SET `index` = ? WHERE id = ?"
    let returnVal = await this.connection.query(queryString,
                    [newIndex, imgId],
                    (err, result) => {
      if (err) {
        console.log("Failed to update image\n\t" + err)
        // Internal Server Error
        return false;
      } else {
        return true;
      }
    });
    return returnVal;
  }

  makeFilePath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = ImageHandler;