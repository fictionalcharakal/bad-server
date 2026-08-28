// Типизация ESM-экспортов dompurify нестабильна между версиями пакета,
// поэтому вся эта "магия" изолирована здесь, а не размазана по компонентам.
import * as DOMPurifyModule from 'dompurify'

type Sanitizer = { sanitize: (dirty: string) => string }

const DOMPurify = (
    (DOMPurifyModule as unknown as { default?: Sanitizer }).default ??
    (DOMPurifyModule as unknown as Sanitizer)
)

export function sanitizeHtml(dirty: string): string {
    return DOMPurify.sanitize(dirty)
}