const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const createVideoFromFrames = ( outputFile, fps = 30) => {
  return new Promise((resolve, reject) => {
    ffmpeg()

       .addInput('frame_%d.png')
      .inputFPS(fps)
      .output(outputFile)
      .on('end', () => {
        console.log('Video created successfully')

        for (let i = 0; i < fps; i++) {
            fs.unlinkSync(`frame_${i}.png`);
          }
          resolve();

      })
      
      .on('error', (err) => {
        console.error('Error creating video:', err)
        reject(err);
      })

      .run();
  });
};

module.exports = { createVideoFromFrames }
