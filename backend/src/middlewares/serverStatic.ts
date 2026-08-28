import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default function serveStatic(baseDir: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Определяем полный путь к запрашиваемому файлу
        const resolvedBase = path.resolve(baseDir)
        const filePath = path.join(baseDir, req.path)
        const resolvedPath = path.resolve(filePath)

        if (
            resolvedPath !== resolvedBase &&
            !resolvedPath.startsWith(resolvedBase + path.sep)
        ) {
            return next()
        }
        // Проверяем, существует ли файл
        fs.access(resolvedPath, fs.constants.F_OK, (accessErr) => {
            if (accessErr) {
                // Файл не существует отдаем дальше мидлварам
                return next()
            }
            // Файл существует, отправляем его клиенту
            return res.sendFile(resolvedPath, (sendErr) => {
                if (sendErr) {
                    next(sendErr)
                }
            })
        })
    }
}
