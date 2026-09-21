import multer from 'multer';
var maxSize = 1 * 1024 * 1024; //1mb
import fs from 'fs';


const csvupload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./");
    },
    filename: function (req, file, cb) {
      var mimeType = file.mimetype.split("/");
      var myType = "/" + mimeType[0] + "/";
      const dir = "../uploads" + myType;
     
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true,
        });
      }
      var fileUrl = dir + file.originalname;
      cb(null, fileUrl);
    },
  }),
  fileFilter:function (req, file, cb) {
    file.fieldname
    if(file.fieldname === "file" && file.mimetype == "text/csv"){
      cb(null,true)
    }else{
      let file_field_name:any = file.fieldname
      let error_message:any = file_field_name +" "+"file Format not Allowed";
      let new_error:any =new Error(error_message)
       cb(new_error)
    }
  },
  limits: { fileSize: maxSize },
}).single("file");


export default csvupload;