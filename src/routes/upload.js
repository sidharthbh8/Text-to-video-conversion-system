const express = require('express')
const multer = require('multer')
const { createCanvas } = require('canvas')
const ffmpeg = require('fluent-ffmpeg')
const { convertDataToBinary, mapBinaryToColors } = require('../utils/binaryConversions')
const {createVideoFromFrames} = require('../utils/ffmpeg')
const fs = require('fs')
const BinaryData = require('../models/binaryData')

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/binary-to-video', upload.single('file'), async (req, res) => {
  try {

    if (!req.file || !req.file.buffer) {
      return res.status(400).send('No file uploaded.')
    }

    const binaryString = convertDataToBinary(req.file.buffer)

    const binaryData = new BinaryData({ binaryString })
    await binaryData.save();

    const width = 1920
    const height = 1080
    const colors = mapBinaryToColors(binaryString)
    const frames = Math.ceil(colors.length / (width * height))

    for (let frame = 0; frame < frames; frame++) {
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')
      const imageData = context.createImageData(width, height)
      const data = imageData.data

      for (let i = 0; i < colors.length; i++) {
        const [r, g, b] = colors[i]
        const index = i * 4
        data[index] = r
        data[index + 1] = g
        data[index + 2] = b
        data[index + 3] = 255
      }

      context.putImageData(imageData, 0, 0);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(`frame_${frame}.png`, buffer);
    }

    await createVideoFromFrames('public/output.mp4', frames)
    res.status(200).send('Video created successfully.');
  } catch (err) {
    console.error(err)
    res.status(500).send('Error processing request')
  }
});

module.exports = router;
