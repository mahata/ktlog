export type ApiResponse = {
  success: boolean
  // biome-ignore lint/suspicious/noExplicitAny: data is arbitrary
  data?: any
  errorMessage?: string
}
