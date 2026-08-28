import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import { unlink } from 'fs'
import BadRequestError from '../errors/bad-request-error'

const MIN_FILE_SIZE = 2 * 1024 // 2 КБ

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }
    try {
        if (req.file.size < MIN_FILE_SIZE) {
            unlink(req.file.path, () => {})
            return next(new BadRequestError('Файл слишком маленький. Минимальный размер — 2 КБ'))
        }

        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${req.file.filename}`
            : `/${req.file?.filename}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        return next(error)
    }
}

export default {}
