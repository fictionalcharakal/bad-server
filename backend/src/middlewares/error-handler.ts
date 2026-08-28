import { ErrorRequestHandler } from 'express'
import { MulterError } from 'multer'

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
   if (err instanceof MulterError) {
        const message =
            err.code === 'LIMIT_FILE_SIZE'
                ? 'Файл слишком большой. Максимальный размер — 5 МБ'
                : 'Ошибка загрузки файла'
        res.status(400).send({ message })
        return next()
    }

    const statusCode = err.statusCode || 500
    const message =
        statusCode === 500 ? 'На сервере произошла ошибка' : err.message
    console.log(err)

    res.status(statusCode).send({ message })

    next()
}

export default errorHandler
