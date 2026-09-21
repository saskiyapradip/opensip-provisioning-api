import { MESSAGE } from "../../constant";
import { Request, Response, NextFunction } from "express";
// import sharp from "sharp";
// import Ffmpeg from "fluent-ffmpeg";
// import ffmpegPath from "@ffmpeg-installer/ffmpeg";
// import upload from "../../uploadApp";
// import multer from 'multer';
// import path from 'path'
// import fs from 'fs'

// let new_fs_path: any = ffmpegPath.path;
// Ffmpeg.setFfmpegPath(new_fs_path)

const uploadFile = async (req: Request, res: Response) => {
  res.send({
    success: 1,
    message: "Upload File Successfully Test",
    // originalName: req.file.originalname,
    // url: myUrl,
    // mimetype: mimetype,
    // thumbnailurl:thumbnail_nm
  });
  // upload(req, res, async (error:any) => {
  // 		if (error) {
  // 			if(error instanceof multer.MulterError){
  // 				res.status(500).send({
  // 					message: error.message
  // 				})
  // 			}else{
  // 				res.status(500).send({
  // 					message: "file Format not Allowed"
  // 				})
  // 			}
  // 		} else {
  // 		if (req?.file) {
  // 			let myUrl = req.file.path
  // 			let get_file_name: any = req.file.filename.split("/")
  // 			let name: any = get_file_name[3]
  // 			let name_split: any = name.split(".")
  // 			let final_name: any = name_split[0]
  // 			let folder_nm: any = get_file_name[2]
  // 			let thumbnail_nm = path.join(__dirname,'..','..','..','..','uploads', folder_nm, 'thumbnails__' + final_name + '.png');
  // 			try {
  // 				const dir = path.dirname(thumbnail_nm);
  // 				if (!fs.existsSync(dir)) {
  // 				}
  // 			} catch (err) {
  // 				console.error("Error creating directory:", err);
  // 			}
  // 			if (req.file.mimetype.includes("image/")) {
  // 				sharp.cache({ files: 0 })
  // 				const data = await sharp(myUrl)
  // 				data.metadata()
  // 					.then(function (metadata: any) {
  // 						return data
  // 							.toFormat('png', { palette: true })
  // 							.resize(Math.round(metadata?.width / (metadata?.width * 0.01)))
  // 							.toFile(thumbnail_nm)
  // 					}).catch(function (err:any) {
  // 						console.error('Error processing image:', err);
  // 					  });
  // 			}
  // 			if (req.file.mimetype.includes("video/")) {
  // 				let viedio_file_nm: any = 'thumbnails__' + final_name + '.png';
  // 				let foleder_path: any = '../uploads/' + folder_nm + '/';
  // 				Ffmpeg(myUrl).screenshots({
  // 					timestamps: [0],
  // 					filename: viedio_file_nm,
  // 					folder: foleder_path,
  // 					size: '100x100'
  // 				}).on("progress", function (progress: any) {
  // 				})
  // 					.on("error", function (err) {
  // 					})
  // 					.on("end", function () {
  // 					})
  // 			}
  // 			myUrl = myUrl.replace("../uploads", "uploads");
  // 			var mimetype = req.file.mimetype.includes("image/") ? MESSAGE.MESSAGE_MEDIA_TYPES.IMAGE :
  // 				req.file.mimetype.includes("video/") ? MESSAGE.MESSAGE_MEDIA_TYPES.VIDEO :
  // 					req.file.mimetype.includes("audio/") ? MESSAGE.MESSAGE_MEDIA_TYPES.AUDIO :
  // 						MESSAGE.MESSAGE_MEDIA_TYPES.DOCUMENTS

  // 			thumbnail_nm = thumbnail_nm.replace("../uploads", "uploads");
  // 			res.send({
  // 				success: 1,
  // 				message: "Upload File Successfully",
  // 				originalName: req.file.originalname,
  // 				url: myUrl,
  // 				mimetype: mimetype,
  // 				thumbnailurl:thumbnail_nm
  // 			})
  // 		}else {
  // 			res.send({
  // 				success: 0,
  // 				message: "File not found"
  // 			})
  // 		}
  // 		}
  // })
};

export default {
  uploadFile,
};
