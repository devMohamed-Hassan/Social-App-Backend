import CryptoJS from "crypto-js";
import { ENV } from "../../config/env";

export class CryptoUtil {
  private static readonly cryptoKey = ENV.CRYPTO_KEY;

  static encrypt(plainText: string): string {
    if (!plainText) return "";
    return CryptoJS.AES.encrypt(plainText, this.cryptoKey).toString();
  }

  static decrypt(cipherText: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, this.cryptoKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (err) {
      console.error("Failed to decrypt value:", err);
      return "";
    }
  }
}
