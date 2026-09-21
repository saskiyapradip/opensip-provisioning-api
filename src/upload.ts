import multer from 'multer';
var maxSize = 2000000
import fs from 'fs';
import { error } from 'console';


const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./");
    },
    filename: function (req, file, cb) {
      var mimeType = file.mimetype.split("/");
      var myType = "/" + mimeType[0] + "/";
      const dir = "../uploads" + myType;
      let file_type_nm = mimeType[0]
      let file_format = mimeType[1]
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true,
        });
      }
      var fileUrl = dir + file.originalname;
      cb(null, fileUrl);
    }
  }),
  fileFilter:function (req, file, cb) {
    file.fieldname
    if(file.fieldname === "logo_file" && file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
      cb(null,true)
    }else if(file.fieldname === "moh_file" && file.mimetype == "audio/wav" || file.mimetype == "audio/mpeg"){
      cb(null,true)
    }else if(file.fieldname === "file" && file.mimetype == "image/jpeg" || file.mimetype == "image/jpg"){
      cb(null,true)
    }else if(file.fieldname === "mohFile" && file.mimetype == "audio/wav" || file.mimetype == "audio/mpeg" || file.mimetype == "audio/wave"){
      cb(null,true)
    }else if(file.fieldname === "logo" && file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
      cb(null,true)
    }
    else{
      let file_field_name:any = file.fieldname
      let error_message:any = file_field_name +" "+"file Format not Allowed";
      let new_error:any =new Error(error_message)
       cb(new_error)
    }
  },
  limits: { fileSize: maxSize },
}).fields(
  [
    {
        name:'logo_file',
        maxCount:1
    },
    {
        name: 'moh_file', 
        maxCount:1
    },
    {
      name: 'file', 
      maxCount:1
    },
    {
      name: 'mohFile', 
      maxCount:1
    },
    {
      name: 'logo', 
      maxCount:1
    }
]
)


export default upload;