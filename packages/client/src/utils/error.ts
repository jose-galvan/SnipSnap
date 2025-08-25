export const isGraphQLError = (error: unknown): error is { errors: Array<{ message: string }> } => {
  return error !== null && typeof error === 'object' && 'errors' in error && Array.isArray((error as any).errors)
}
