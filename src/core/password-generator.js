/**
 * Password Generator Core Module
 *
 * Provides secure password generation using cryptographic randomness.
 * Uses Web Crypto API (crypto.getRandomValues) for secure random number generation.
 */

// Character sets for password generation
const CHAR_SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*-_+=?',
};

// Default password generation options
const DEFAULT_OPTIONS = {
  length: 16,
  lowercase: true,
  uppercase: true,
  digits: true,
  symbols: true,
};

/**
 * Generates a cryptographically secure random index.
 *
 * Uses rejection sampling to ensure uniform distribution
 * and avoid modulo bias.
 *
 * @param {number} max - Upper bound (exclusive)
 * @returns {number} Random integer in range [0, max)
 */
function getSecureRandomIndex(max) {
  const randomBuffer = new Uint32Array(1);
  const maxValid = Math.floor(0xffffffff / max) * max;

  let randomValue;
  do {
    crypto.getRandomValues(randomBuffer);
    randomValue = randomBuffer[0];
  } while (randomValue >= maxValid);

  return randomValue % max;
}

/**
 * Builds character pool based on selected options.
 *
 * @param {Object} options - Character type options
 * @returns {string} Combined character pool
 * @throws {Error} If no character types are selected
 */
function buildCharacterPool(options) {
  let pool = '';

  if (options.lowercase) pool += CHAR_SETS.lowercase;
  if (options.uppercase) pool += CHAR_SETS.uppercase;
  if (options.digits) pool += CHAR_SETS.digits;
  if (options.symbols) pool += CHAR_SETS.symbols;

  if (pool.length === 0) {
    throw new Error('At least one character type must be selected');
  }

  return pool;
}

/**
 * Generates a secure random password.
 *
 * @param {Object} options - Password generation options
 * @param {number} [options.length=16] - Password length (8-128)
 * @param {boolean} [options.lowercase=true] - Include lowercase letters
 * @param {boolean} [options.uppercase=true] - Include uppercase letters
 * @param {boolean} [options.digits=true] - Include digits
 * @param {boolean} [options.symbols=false] - Include special symbols
 * @returns {string} Generated password
 * @throws {Error} If options are invalid
 */
function generatePassword(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };

  // Validate length
  if (config.length < 8 || config.length > 128) {
    throw new Error('Password length must be between 8 and 128 characters');
  }

  const pool = buildCharacterPool(config);
  let password = '';

  for (let i = 0; i < config.length; i++) {
    const index = getSecureRandomIndex(pool.length);
    password += pool[index];
  }

  return password;
}

/**
 * Calculates password strength based on length and character diversity.
 *
 * @param {string} password - Password to evaluate
 * @returns {Object} Strength assessment { score: 0-4, label: string, percent: number }
 */
function calculateStrength(password) {
  if (!password) {
    return { score: 0, label: 'None', percent: 0 };
  }

  let score = 0;

  // Length scoring
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Character diversity scoring
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  const diversity = [hasLowercase, hasUppercase, hasDigits, hasSymbols].filter(
    Boolean
  ).length;

  if (diversity >= 2) score++;
  if (diversity >= 3) score++;
  if (diversity === 4) score++;

  // Normalize score to 0-4 range
  const normalizedScore = Math.min(4, Math.floor(score / 1.5));

  const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  const percents = [20, 40, 60, 80, 100];

  return {
    score: normalizedScore,
    label: labels[normalizedScore],
    percent: percents[normalizedScore],
  };
}

export { generatePassword, calculateStrength, CHAR_SETS, DEFAULT_OPTIONS };
