/**
 * Popup UI Controller
 *
 * Handles user interactions and connects UI with core modules.
 */

import { generatePassword } from '../core/password-generator.js';
import { copyToClipboard } from '../utils/clipboard.js';

// DOM Elements
const elements = {
  passwordOutput: document.getElementById('password-output'),
  copyBtn: document.getElementById('copy-btn'),
  generateBtn: document.getElementById('generate-btn'),
  lengthSlider: document.getElementById('length'),
  lengthValue: document.getElementById('length-value'),
  lowercase: document.getElementById('lowercase'),
  uppercase: document.getElementById('uppercase'),
  digits: document.getElementById('digits'),
  symbols: document.getElementById('symbols'),
  message: document.getElementById('message'),
};

/**
 * Gets current options from UI controls.
 *
 * @returns {Object} Password generation options
 */
function getOptions() {
  return {
    length: parseInt(elements.lengthSlider.value, 10),
    lowercase: elements.lowercase.checked,
    uppercase: elements.uppercase.checked,
    digits: elements.digits.checked,
    symbols: elements.symbols.checked,
  };
}

/**
 * Displays a temporary message to the user.
 *
 * @param {string} text - Message text
 * @param {string} type - Message type ('success' or 'error')
 */
function showMessage(text, type) {
  elements.message.textContent = text;
  elements.message.className = `message visible ${type}`;

  setTimeout(() => {
    elements.message.classList.remove('visible');
  }, 2000);
}

/**
 * Validates that at least one character type is selected.
 *
 * @returns {boolean} True if valid
 */
function validateOptions() {
  const { lowercase, uppercase, digits, symbols } = getOptions();
  return lowercase || uppercase || digits || symbols;
}

/**
 * Generates a new password and displays it.
 */
function handleGenerate() {
  if (!validateOptions()) {
    showMessage('Select at least one character type', 'error');
    return;
  }

  try {
    const options = getOptions();
    const password = generatePassword(options);
    elements.passwordOutput.value = password;
  } catch (error) {
    showMessage(error.message, 'error');
  }
}

/**
 * Copies the current password to clipboard.
 */
async function handleCopy() {
  const password = elements.passwordOutput.value;

  if (!password) {
    showMessage('Generate a password first', 'error');
    return;
  }

  const success = await copyToClipboard(password);

  if (success) {
    showMessage('Copied to clipboard!', 'success');
  } else {
    showMessage('Failed to copy', 'error');
  }
}

/**
 * Updates the length display value.
 */
function handleLengthChange() {
  elements.lengthValue.textContent = elements.lengthSlider.value;
}

// Event listeners
elements.generateBtn.addEventListener('click', handleGenerate);
elements.copyBtn.addEventListener('click', handleCopy);
elements.lengthSlider.addEventListener('input', handleLengthChange);

// Generate initial password on load
handleGenerate();
