// DOM elements
const encodedMessageParagraph = document.querySelector('#encoded-message');
const messageTextArea = document.querySelector('#message');
const resultMessage = document.querySelector('#result-message');
const reverseButton = document.querySelector('#reverse-button');

const START_INDEX = 32;
const END_INDEX = 126;
const CESAR_CIPHER_POSITIONS = 10;
const ACTIONS = {
  ENCODE: 'encode',
  DECODE: 'decode',
};
let currentAction = ACTIONS.ENCODE;

// Functions
/**
 * Decode a string using Cesar cipher.
 *
 * @param {string} message
 * @returns {string}
 */
const decodeMessage = (message) =>
  message
    .split('')
    .map((char) => {
      const charCode = char.charCodeAt();

      // Convert 'enter' into break line HTML.
      if (charCode === 10) return '<br>';

      let newCharCode = charCode - CESAR_CIPHER_POSITIONS;

      if (newCharCode < START_INDEX) {
        // Subtract one to make range inclusive.
        newCharCode = newCharCode + END_INDEX - START_INDEX + 1;
      }

      return String.fromCharCode(newCharCode);
    })
    .join('');

/**
 * Encode a string using Cesar cipher.
 *
 * @param {string} message
 * @returns {string}
 */
const encodeMessage = (message) =>
  message
    .split('')
    .map((char) => {
      const charCode = char.charCodeAt();

      // Convert 'enter' into break line HTML.
      if (charCode === 10) return '<br>';

      let newCharCode = charCode + CESAR_CIPHER_POSITIONS;

      if (newCharCode > END_INDEX) {
        // Subtract one to make range inclusive.
        newCharCode = newCharCode - END_INDEX + START_INDEX - 1;
      }

      return String.fromCharCode(newCharCode);
    })
    .join('');

const performAction = () => {
  const message = messageTextArea.value;
  let encodedMessage = '';

  if (currentAction === ACTIONS.ENCODE) {
    encodedMessage = encodeMessage(message);
  } else {
    encodedMessage = decodeMessage(message);
  }

  encodedMessageParagraph.innerHTML = '';
  encodedMessageParagraph.insertAdjacentHTML('beforeend', encodedMessage);
};

const changeAction = () => {
  if (currentAction === ACTIONS.ENCODE) {
    currentAction = ACTIONS.DECODE;
    reverseButton.textContent = 'Decode';
    resultMessage.textContent = 'Decoded message:';
  } else {
    currentAction = ACTIONS.ENCODE;
    reverseButton.textContent = 'Encode';
    resultMessage.textContent = 'Encoded message:';
  }

  performAction();
};

// Events
messageTextArea.addEventListener('keyup', performAction);
reverseButton.addEventListener('click', changeAction);
