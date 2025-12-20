/**
 * Clipboard Utility Module
 *
 * Provides secure clipboard operations using the modern Clipboard API.
 */

/**
 * Copies text to clipboard using the Clipboard API.
 *
 * @param {string} text - Text to copy to clipboard
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
async function copyToClipboard(text) {
  if (!text) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

export { copyToClipboard };
