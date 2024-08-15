const wordCloudHL = document.getElementById('wordCloudHL');
const wordCloudHR = document.getElementById('wordCloudHR');

const freedom = [
  "Autonomy",
  "Liberty",
  "Liberation",
  "Individuality",
  "Identity",
  "Anarchy",
  "Chaos",
  "Turmoil",
  "Art",
  "Culture",
  "Expression",
  "Assertion"
];
const security = [
  "Safety",
  "Comfort",
  "Institution",
  "Establishment",
  "Employment",
  "Conformity",
  "Obedience",
  "Docility",
  "Power",
  "Efficacy",
  "Oppression",
  "Coercion"
];

function positionLeftCLoud(wordElement) {
  // Calculate random positions within the container
  const wordCloudPos = wordCloudHL.getBoundingClientRect();
  const wordCloudAbsoluteTop = wordCloudPos.top + window.scrollY;
  const wordCloudAbsoluteBottom = wordCloudPos.bottom + window.scrollY;
  const wordCloudAbsoluteLeft = wordCloudPos.left + window.scrollX
  const wordCloudAbsoluteRight = wordCloudPos.right + window.scrollX
  const wordWidth = wordElement.offsetWidth;
  const wordHeight = wordElement.offsetHeight;

  const usedPositions = [];

  let randomX, randomY;
  do {
    // Generate random positions within boundaries
    randomX = wordCloudAbsoluteLeft + Math.random() * (wordCloudHL.clientWidth - wordWidth);
    randomY = wordCloudAbsoluteTop + Math.random() * (wordCloudHL.clientHeight - wordHeight);

  // Check if position is already used
  } while (usedPositions.some(pos => Math.abs(pos.x - randomX) < 30 && Math.abs(pos.y - randomY) < 30));

  wordElement.style.position = 'absolute';

  // Update used positions and set styles
  usedPositions.push({ x: randomX, y: randomY });

  if (randomX > (0.95 * wordCloudAbsoluteRight) && randomY > (0.95 * wordCloudAbsoluteBottom)){
    wordElement.style.left = Math.floor(0.95 * randomX) + 'px';
    wordElement.style.top = Math.floor(0.95 * randomY) + 'px';
  }
  else if (randomX > (0.95 * wordCloudAbsoluteRight)) {
    wordElement.style.left = Math.floor(0.95 * randomX) + 'px';
  }
  else if (randomY > (0.95 * wordCloudAbsoluteBottom)) {
    wordElement.style.top = Math.floor(0.95 * randomY) + 'px';
  }
  else {
    wordElement.style.left = randomX + 'px';
    wordElement.style.top = randomY + 'px';
  }
}

function positionRightCLoud(wordElement) {
  // Calculate random positions within the container
  const wordCloudPos = wordCloudHR.getBoundingClientRect();
  const wordCloudAbsoluteTop = wordCloudPos.top + window.scrollY;
  const wordCloudAbsoluteBottom = wordCloudPos.bottom + window.scrollY;
  const wordCloudAbsoluteLeft = wordCloudPos.left + window.scrollX
  const wordCloudAbsoluteRight = wordCloudPos.right + window.scrollX
  const wordWidth = wordElement.offsetWidth;
  const wordHeight = wordElement.offsetHeight;

  const usedPositions = [];

  let randomX, randomY;
  do {
    // Generate random positions within boundaries
    randomX = wordCloudAbsoluteLeft + Math.random() * (wordCloudHR.clientWidth - wordWidth);
    randomY = wordCloudAbsoluteTop + Math.random() * (wordCloudHR.clientHeight - wordHeight);

  // Check if position is already used
  } while (usedPositions.some(pos => Math.abs(pos.x - randomX) < 30 && Math.abs(pos.y - randomY) < 30));

  wordElement.style.position = 'absolute';
  wordElement.style.color = 'white';
  // Update used positions and set styles
  usedPositions.push({ x: randomX, y: randomY });

  if (randomX > (0.95 * wordCloudAbsoluteRight) && randomY > (0.95 * wordCloudAbsoluteBottom)){
    wordElement.style.left = Math.floor(0.95 * randomX) + 'px';
    wordElement.style.top = Math.floor(0.95 * randomY) + 'px';
  }
  else if (randomX > (0.95 * wordCloudAbsoluteRight)) {
    wordElement.style.left = Math.floor(0.95 * randomX) + 'px';
  }
  else if (randomY > (0.95 * wordCloudAbsoluteBottom)) {
    wordElement.style.top = Math.floor(0.95 * randomY) + 'px';
  }
  else {
    wordElement.style.left = randomX + 'px';
    wordElement.style.top = randomY + 'px';
  }
}


function generateWordClouds() {
  const shuffledFreedom = freedom.slice();
  shuffledFreedom.sort(() => Math.random() - 0.5);
  // Generate word cloud for Freedom words
  for (const word of shuffledFreedom) {
    const wordElement = document.createElement('span');
    wordElement.textContent = word;
    wordElement.classList.add('blinking-word');

    positionLeftCLoud(wordElement);
    
    wordCloudHL.appendChild(wordElement);

    setTimeout(() => blinkWord(wordElement), Math.random() * 2000);
  }

  // Generate word cloud for Security words (New Section)
  const shuffledSecurity = security.slice();
  shuffledSecurity.sort(() => Math.random() - 0.5);

  for (const word of shuffledSecurity) {
    const wordElement = document.createElement('span');
    wordElement.textContent = word;
    wordElement.classList.add('blinking-word');

    positionRightCLoud(wordElement);
    
    wordCloudHR.appendChild(wordElement); // Append to wordCloudHR element

    setTimeout(() => blinkWord(wordElement), Math.random() * 2000);
  }
}


function blinkWord(wordElement) {
  wordElement.style.opacity = 0; // Initially hide the word
  setInterval(() => {
    wordElement.style.opacity = wordElement.style.opacity === '0' ? '1' : '0';
  }, 1000); // Adjust the interval for blinking speed
}

window.addEventListener('resize', function() {
  const wordElementsHL = wordCloudHL.querySelectorAll('.blinking-word'); // Select all word elements
  const wordElementsHR = wordCloudHR.querySelectorAll('.blinking-word');
  for (const wordElement of wordElementsHL) {
    positionLeftCLoud(wordElement);
  }
  for (const wordElement of wordElementsHR) {
    positionRightCLoud(wordElement);
  }
});

window.addEventListener('load', generateWordClouds);
