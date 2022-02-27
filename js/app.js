// DOM elements
const messageTextArea = document.querySelector('#message');
const encodedMessageParagraph = document.querySelector('#encoded-message');

// Functions
const encodeMessage = () => {
  const START_INDEX = 32;
  const END_INDEX = 126;
  const CESAR_CIPHER_POSITIONS = 10;
  const message = messageTextArea.value;
  const encodedMessage = message
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
  encodedMessageParagraph.innerHTML = '';
  encodedMessageParagraph.insertAdjacentHTML('beforeend', encodedMessage);
};

// Events
messageTextArea.addEventListener('keyup', encodeMessage);
