export type Result =
  | { success: true }
  | { success: false; reason: string };
