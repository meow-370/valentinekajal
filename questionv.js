// script.js

// Start background music on first user interaction (due to autoplay policies)
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.2;
document.body.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(err => console.log("Autoplay prevented:", err));
  }
}, { once: true });

// Floating hearts effect
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 24 + 16) + 'px';
  heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
  document.getElementById('hearts-container').appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// Get references to elements
const yesBtn = document.getElementById('yesBtn');
let noBtn = document.getElementById('noBtn');
const pet = document.getElementById('pet');
const rollMessages = document.getElementById('rollMessages');
const noFeedback = document.getElementById('noFeedback');
const sideLeft = document.getElementById('sideLeft');
const sideRight = document.getElementById('sideRight');
const yesSound = document.getElementById('yesSound');
const noSound = document.getElementById('noSound');
const confettiContainer = document.getElementById('confetti-container');

// Array of playful messages for No clicks
const noMessages = [
  "You sure?",
  "Pinky promise?",
  "I'll be really sad!",
  "I might die!",
  "Please say yes!",
  "Don't break my heart!",
  "I can't live without your yes!",
  "Come on, be my Valentine!"
];

// Rolling messages for Yes sequence
const yesMessages = [
  "She said yesss!!",
  "YIPPPIEE!!",
  "My heart is dancing!",
  "I LOVE YOU SO MUCH!",
  "THANK YOU FOR CHOOSING ME",
  "I'm so grateful"
];
let currentYesMsgIndex = 0;
let yesMessageInterval;

// Function to start the slide-show style message transition for Yes clicks
function startRollingMessages() {
  rollMessages.style.display = "inline-block";
  rollMessages.textContent = yesMessages[currentYesMsgIndex];
  yesMessageInterval = setInterval(() => {
    rollMessages.classList.add('fade-out');
    setTimeout(() => {
      currentYesMsgIndex = (currentYesMsgIndex + 1) % yesMessages.length;
      rollMessages.textContent = yesMessages[currentYesMsgIndex];
      rollMessages.classList.remove('fade-out');
      rollMessages.classList.add('fade-in');
      setTimeout(() => {
        rollMessages.classList.remove('fade-in');
      }, 500);
    }, 500);
  }, 2000);
}

// Function to launch confetti effect (improved)
function launchConfetti() {
  const colors = ["#fde132", "#009bde", "#ff6b00", "#ff3366", "#00cc66"];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-20px";
    confetti.style.width = Math.random() * 8 + 5 + "px";
    confetti.style.height = Math.random() * 8 + 5 + "px";
    confetti.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Yes Button Click Handler
yesBtn.addEventListener('click', () => {
  // Change pet image to happy
  pet.src = "https://media.tenor.com/Ka7sVbRXQUwAAAAj/tkthao219-bubududu.gif";
  // Play yes sound
  yesSound.play();
  // Update side images to cat-kitten gif and reveal them
  sideLeft.src = "https://media.tenor.com/Do2tfm6klgQAAAAM/cat-kitten.gif";
  sideRight.src = "https://media.tenor.com/Do2tfm6klgQAAAAM/cat-kitten.gif";
  sideLeft.style.opacity = 1;
  sideRight.style.opacity = 1;
  // Remove the No button and re-center the buttons container
  if (noBtn && noBtn.parentNode) {
    noBtn.parentNode.removeChild(noBtn);
    document.querySelector('.buttons').style.justifyContent = "center";
  }
  // Start rolling Yes messages
  if (!yesMessageInterval) {
    startRollingMessages();
  }
  // Launch confetti for excitement!
  launchConfetti();
});

// No Button Click Handler
function moveNoButton() {
  // Vibrate device for 100ms (if supported)
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
  // Change pet image to sad
  pet.src = "https://media.tenor.com/RJgIui1E_2QAAAAj/teddy-bear.gif";
  // Play no sound
  noSound.play();
  // Update side images to banana-cat-crying gif and reveal them
  sideLeft.src = "https://media.tenor.com/u8M7kk5ZXmwAAAAM/banana-cat-crying.gif";
  sideRight.src = "https://media.tenor.com/u8M7kk5ZXmwAAAAM/banana-cat-crying.gif";
  sideLeft.style.opacity = 1;
  sideRight.style.opacity = 1;
  // Show a random No feedback message
  const randomIndex = Math.floor(Math.random() * noMessages.length);
  noFeedback.textContent = noMessages[randomIndex];
  noFeedback.style.opacity = 1;
  setTimeout(() => { noFeedback.style.opacity = 0; }, 1500);
  // Ensure the No button is positioned absolutely so it can move freely
  noBtn.style.position = "absolute";
  // Calculate new random position within viewport bounds with a margin
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  const margin = 20;
  const maxX = window.innerWidth - btnWidth - margin;
  const maxY = window.innerHeight - btnHeight - margin;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

if (noBtn) {
  noBtn.addEventListener('click', moveNoButton);
}
