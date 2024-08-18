import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const salt = crypto.randomBytes(16); // Generate a new salt for each key derivation
const iterations = 100000; // Number of iterations for the KDF
const keyLength = 32; // Length of the key in bytes
const digest = 'sha256'; // Hash function to use

export function deriveKey(): Buffer {
  const passphrase: string = process.env.CIPHER_KEY ?? 'test';
  return crypto.pbkdf2Sync(passphrase, salt, iterations, keyLength, digest);
}

export function encrypt(text: string) {
  const key = deriveKey(); // Derive the key from the passphrase
  const iv = crypto.randomBytes(16); // Initialization vector
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
    salt: salt.toString('hex'),
  };
}

export function decrypt(text: {
  iv: string;
  encryptedData: string;
  salt: string;
}) {
  const ivBuffer = Buffer.from(text.iv, 'hex');
  const encryptedTextBuffer = Buffer.from(text.encryptedData, 'hex');
  const saltBuffer = Buffer.from(text.salt, 'hex');
  const key = deriveKey(); // Derive the key from the passphrase

  let decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  let decrypted = decipher.update(encryptedTextBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
