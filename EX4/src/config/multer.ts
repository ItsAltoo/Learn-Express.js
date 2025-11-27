import multer from "multer";
import fs from "fs"
import path from "path";

const uploadDir = path.join(__dirname, "../../public/uploads")
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive : true})
}

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, uploadDir)
    },
    filename(req, file, callback) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = path.extname(file.originalname)

        callback(null, `profile-${uniqueSuffix}${ext}`)
    },
})

const fileFilter = (req: any, file: Express.Multer.File, callback : any) => {
    if ( file.mimetype.startsWith("image/")){
        callback(null, true)
    } else {
        callback(new Error("Only image file!"), false)
    }
}

export const upload = multer({
    storage : storage,
    fileFilter: fileFilter,
    limits: {fileSize : 2 * 1024 * 1024}
})