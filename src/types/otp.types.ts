export interface IOtp {
  code: string;
  expiresAt: Date;
  verified: boolean;
  attempts: number;
  maxAttempts: number;
}
