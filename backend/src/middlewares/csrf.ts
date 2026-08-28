import { doubleCsrf } from 'csrf-csrf'
import { CSRF_SECRET } from '../config'

const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => CSRF_SECRET,
    getSessionIdentifier: () => 'anonymous',
    cookieName: '_csrf',
    cookieOptions: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    },
    getCsrfTokenFromRequest: (req) => req.headers['x-csrf-token'] as string,
})

export { generateCsrfToken, doubleCsrfProtection }