import ffmpeg from "fluent-ffmpeg";

import * as ffmpegPath from "@ffmpeg-installer/ffmpeg";
import * as ffprobePath from "@ffprobe-installer/ffprobe";

ffmpeg.setFfmpegPath(ffmpegPath.path);
/* ffmpeg.setFfmpegPath(ffmpegPath); */
ffmpeg.setFfprobePath(ffprobePath.path);

const ferst = "./final/first/mp41.mp4";
const second = "./final/second/mp42.mp4";
const third = "./final/third/mp43.mp4";
const fore = "./final/forse/mp44.mp4";

export const createGif = async (req, res) => {
  try {
    const timeFerst = (+req.body.time * 60) / 6;
    const timeSecond = (+req.body.time * 60) / 2.9;
    const timeThird = (+req.body.time * 60) / 1.8;
    const timeFore = (+req.body.time * 60) / 1.2;
    
    
    async function mergeOne() {
      console.log('video Url = ' + req.body.videoUrl);
      console.log("time = " + +req.body.time);
      await ffmpeg(req.body.videoUrl)
        .setStartTime(timeFerst)
        .noAudio()
        .setDuration("3")
        .output(`./final/first/mp41.mp4`)
        .on("end", function (err) {
          if (!err) {
            console.log("Dane");
          }
        })
        .on("error", function (err) {
          {
            console.log(err.message);
          }
        })
        .run();
    }

    async function mergeTwo() {
      await ffmpeg(req.body.videoUrl)
        .setStartTime(timeSecond)
        .outputOption("-vf", "setpts=0.75*PTS")
        .setDuration("3")
        .noAudio()
        .output(`./final/second/mp42.mp4`)
        .on("end", function (err) {
          if (!err) {
            console.log("Dane");
          }
        })
        .on("error", function (err) {
          {
            console.log(err.message);
          }
        })
        .run();
    }
    async function mergeThe() {
      await ffmpeg(req.body.videoUrl)
        .setStartTime(timeThird)
        .outputOption("-vf", "setpts=0.75*PTS")
        .setDuration("3")
        .noAudio()
        .output(`./final/third/mp43.mp4`)
        .on("end", function (err) {
          if (!err) {
            console.log("Dane");
          }
        })
        .on("error", function (err) {
          {
            console.log(err.message);
          }
        })
        .run();
    }

    async function mergeFore() {
      await ffmpeg(req.body.videoUrl)
        .setStartTime(timeFore)
        .noAudio()
        .setDuration("3")
        .output(`./final/forse/mp44.mp4`)
        .on("end", function (err) {
          if (!err) {
            console.log("приступаю к выполнению mergeAlli! ");
          }
        })
        .on("error", function (err) {
          {
            console.log(err.message);
          }
        })
        .run();
    }
    mergeOne();
    mergeTwo();
    mergeThe();
    mergeFore();
    res.json({ succes: true });
    /*  const dateIdUrl = Date.now();

    async function mergeAlli() {
      await ffmpeg({ source: ferst })
        .input(second)
        .input(third)
        .input(fore)
        .on("error", (error) => {
          res.json({ secsess: false });
          console.log(error.message);
        })
        .on("start", () => {
          console.log(`Starting merge for `);
        })
        .on("end", () => {
          res.json({ url: `/uploads/${dateIdUrl}.mp4` });
          console.log(`$merged!`);
        })
        .mergeToFile(`./uploads/${dateIdUrl}.mp4`);
    } */
  } catch (error) {
    console.log(error.message);
    console.log("Hi");
  }
};

export const createGifTest = async (req, res) => {
  const dateIdUrl = Date.now();
  await ffmpeg({ source: ferst })
    .input(second)
    .input(third)
    .input(fore)
    .on("error", (error) => {
      res.json({ secsess: false });
      console.log(error.message);
    })
    .on("start", () => {
      console.log(`Starting merge for `);
    })
    .on("end", () => {
      res.json({ url: `/uploads/${dateIdUrl}.mp4` });
      console.log(`$merged!`);
    })
    .mergeToFile(`./uploads/${dateIdUrl}.mp4`);
};
