export type Result<T = never> =
  | { success: true, value?: T }
  | { success: false; reason: string }
