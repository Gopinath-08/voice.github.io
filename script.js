// Initialize the Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Capture speech input
recognition.onstart = () => {
  console.log('Voice recognition started. Speak now!');
};

recognition.onresult = event => {
  const speechToText = event.results[0][0].transcript;
  console.log('Speech to text:', speechToText);
  document.getElementById('result').textContent = speechToText;
  respondToUser(speechToText);
};

// Output text response
function respondToUser(userText) {
  let responseText = '';

  switch (userText) {
    case 'hello':
      responseText = 'Hello! How can I help you today?';
      break;
    case 'what is the time':
      const now = new Date();
      const time = now.toLocaleTimeString();
      responseText = `The time is currently ${time}.`;
      break;
    case 'what is the weather like today':
      responseText = 'I am sorry, I am not able to provide weather information at the moment.';
      break;
    default:
      responseText = 'I am sorry, I do not understand what you mean.';
      break;
  }

  console.log('Text response:', responseText);
  const speech = new SpeechSynthesisUtterance(responseText);
  window.speechSynthesis.speak(speech);
}

// Start and stop listening for speech input
document.getElementById('start-btn').addEventListener('click', () => {
  recognition.start();
  document.getElementById('start-btn').disabled = true;
  document.getElementById('stop-btn').disabled = false;
});

document.getElementById('stop-btn').addEventListener('click', () => {
  recognition.stop();
  document.getElementById('stop-btn').disabled = true;
  document.getElementById('start-btn').disabled = false;
});
