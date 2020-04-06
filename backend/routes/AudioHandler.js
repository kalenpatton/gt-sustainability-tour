// Handles uploading of audio to file system

const path = require('path');
const fs = require('fs');




class AudioHandler {
  static makeFilePath(filename) {
    var folder = path.join(process.cwd(), '/public/audio/');
    if (!fs.existsSync(folder)){
      fs.mkdirSync(folder);
    }
    return path.resolve(`${folder}/${filename}`)
  }
  // add audio
  static async add(site_id, buffer) {
    let filename = `${site_id}.mp3`;
    let filepath = this.makeFilePath(filename);

    fs.writeFile(filepath, buffer, (err) => {
      if (err) throw err;
    });
  }

  // delete audio
  static async delete(site_id) {
    let filename = `${site_id}.mp3`;
    let filepath = this.makeFilePath(filename);
    if (fs.existsSync(filepath)){
      fs.unlinkSync(filepath);
      console.log("Audio " + site_id + " deleted")
    }
  }
}
module.exports = AudioHandler;