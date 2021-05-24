import { randomBytes } from 'crypto'
import { Options, diskStorage } from 'multer'
import { resolve } from 'path'

export const multerConfig = {
  dest: resolve(__dirname, '..', '..', '..', 'uploads'),
  storage: diskStorage({
    destination: (_req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', '..', 'uploads'))
    },
    filename: (_req, file, cb) => {
      randomBytes(16, (error, hash) => {
        if (error) cb(error, file.filename)
        const fileName = `${hash.toString('hex')}-${Date.now()}-${
          file.originalname
        }`
        cb(null, fileName)
      })
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const formats = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']
    if (!formats.includes(file.mimetype)) cb(new Error('Invalid File Type'))
    cb(null, true)
  },
} as Options
