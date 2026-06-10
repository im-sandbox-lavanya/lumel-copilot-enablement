/**
 * types.ts
 * Shared TypeScript types for the demo API.
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CalculationRequest {
  operation: string;
  a: number;
  b: number;
}

export interface CalculationResult {
  operation: string;
  a: number;
  b: number;
  result: number;
}
