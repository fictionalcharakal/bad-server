const MAX_LIMIT = 100

export function clampLimit(limit: unknown): number {
    const parsed = Number(limit) || 10
    return Math.min(Math.max(parsed, 1), MAX_LIMIT)
}