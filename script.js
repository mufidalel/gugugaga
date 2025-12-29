// Scene variables
const scene0 = document.getElementById('scene0');
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const scene3 = document.getElementById('scene3');
const scene4 = document.getElementById('scene4');
const scene5 = document.getElementById('scene5');
const passcodeInput = document.getElementById('passcode-input');
const submitPasscode = document.getElementById('submit-passcode');
const passcodeError = document.getElementById('passcode-error');
const clickAnywhere = document.getElementById('click-anywhere');
const birthdayText = document.getElementById('birthday-text');
const gameCanvas = document.getElementById('game-canvas');
const gameInstruction = document.getElementById('game-instruction');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const jumpBtn = document.getElementById('jump-btn');
const matchContainer = document.getElementById('match-container');
const matchInstruction = document.getElementById('match-instruction');
const matchCounter = document.getElementById('match-counter');
const typewriterContainer = document.getElementById('typewriter-container');
const typewriterTextbox = document.getElementById('typewriter-textbox');
const typewriterCursor = document.getElementById('typewriter-cursor');

// Messages for scene 2
const messages = [
    "Hi my love...",
    "it's your birthday",
    "Here's my gift for your birthday"
];

// Credit text (full message)
const creditMessage = `Dear Parisya Kalyani Maleeka

Ini adalah hari yang spesial untuk mu, hari dengan tanggal yang sama dengan engkau lahir ke dunia ini. Hari dimana segala kebaikan datang kepada engkau. Hari dimana orang yang kamu sayangi, cintai, peduli, dan engkau kasihi, Terlampau bahagia karena engkau lahir di dunia ini.

Ini adalah, Hari ulang tahun mu. Hari dimana kamu bertambah usia, hari yang menjadi tanda, bahwa seseorang yang lahir pada tanggal Makassar,19 Januari 2012 , telah bertumbuh semakin dewasa, semakin bijak, semakin pintar, dan semakin peduli tentang banyak hal yang ada di dunia.

Selamat ulang tahun sayangg, aku mungkin tidak bisa merangkai kata yang indah, yang pantas, ataupun yang sangat bermakna.

Namun, aku hanya ingin menyatakan. 
Selamat ulang tahun yaa sayang, aku harap kamu semakin pintar, cantik, manis, peduli, berdedikasi, dan panjang umur tentunya. 

Aku mungkin orang yang belum terlalu bermakna di hidup kamu, namun mengingat status kita yang lebih daripada itu membuat aku sadar, betapa beruntungnya aku bisa memiliki orang seperti mu di hidup ku yang flat seperti papan ini.

Terima kasih karena telah mewarnai hidupku yang sebelum nya hanya abu abu, terima kasih karena telah menjadi lampu yang memberi penerangan untuk hidup aku, terima kasih karena selalu menyemangati dan peduli serta mendukung dan juga menyayangi aku semenjak kita bertemu. Terima kasih atas segelaaa bentuk perlakuan, apresiasi, dan sifat yang kamu tunjukkan kepada ku.

Aku harap untuk hari ini, aku ingin kamu sadar bahwa aku telah mencintai mu lebih dari segala cinta yang ada di bumi ini. Teruskan perbuatan baik yang kamu lakukan kepada ku dan juga orang lain di sekitar mu.

Untuk hari ini, aku mengucapkan segala bentuk syukur dan terima kasih, serta segala permintaan maaf dari salah yang aku lakukan kepada mu, jika ada yang tertinggal di hati maka maafkan lah, jika tidak maka itu lah jalannya. Maaf yaa kalau aku banyak salah kepada mu sayang.

Di hari yang spesial ini... aku tidak bisa melakukan hal lebih untuk kamu, maaf jika aku hanya memberikan sekedar ucapan yang tak bermakna kepadamu.

Aku harap, kita bisa lebih banyak meluangkan waktu bersama kedepannya meski diantara kesibukan kita masing masing.
 
Jujur, aku bingung harus memberikan apa lagi untukmu dan sebenarnya ucapan ini aku ingin menggunakan bahasa inggris, namun aku sangat malas menggunakan nya. 

Intinyaa, selamat ulang tahun yaa. WYATB
Semogaa segalaa impian dan cita citaa kamuuu segera tercapai, Aamiin

Sayang kamu
- Mufid Alghifari Elshirazy

Salin link dibawah

- https://drive.google.com/drive/folders/1AWa2DKfAydEnmI7LXF1_w6MLUW1JklCJ`;

// Flags to prevent multiple triggers
let isAnimating = false;
let matchesLit = 0;
let matches = [false, false, false];

// Mini-game variables
const ctx = gameCanvas.getContext('2d');
let player = { x: 50, y: 300, width: 40, height: 40, dx: 0, dy: 0, onGround: false };
let keys = {};
let gameRunning = false;
const gravity = 0.5;
const jumpStrength = -12;
const speed = 5;
const platforms = [
    { x: 0, y: 350, width: 800, height: 50 }, // Ground
    { x: 200, y: 250, width: 100, height: 20 }, // Platform 1
    { x: 400, y: 200, width: 100, height: 20 }, // Platform 2
    { x: 600, y: 150, width: 100, height: 20 }, // Platform 3
];
const obstacles = [{ x: 300, y: 320, width: 20, height: 30 }];
const door = { x: 750, y: 300, width: 40, height: 50 };

// Scene 0: Passcode check
submitPasscode.addEventListener('click', () => {
    const passcode = passcodeInput.value.toLowerCase();
    if (passcode === 'iloveyou') {
        scene0.classList.add('hidden');
        scene1.classList.remove('hidden');
        passcodeError.classList.add('hidden');
    } else {
        passcodeError.classList.remove('hidden');
        passcodeInput.value = '';
    }
});

passcodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitPasscode.click();
});

// Scene 1: Click anywhere to start
clickAnywhere.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    scene1.classList.add('hidden');
    scene2.classList.remove('hidden');
    setTimeout(() => {
        showMessages();
        isAnimating = false;
    }, 2000);
});

// Function to show messages one by one
function showMessages() {
    let index = 0;
    const interval = setInterval(() => {
        birthdayText.textContent = messages[index];
        birthdayText.style.opacity = '1';
        setTimeout(() => {
            birthdayText.style.opacity = '0';
        }, 2000);
        index++;
        if (index >= messages.length) {
            clearInterval(interval);
            setTimeout(() => {
                scene2.classList.add('hidden');
                scene3.classList.remove('hidden');
                startGame();
            }, 2000);
        }
    }, 2500);
}

// Mini-game functions
function startGame() {
    gameRunning = true;
    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

function updateGame() {
    if (keys['ArrowLeft']) player.dx = -speed;
    else if (keys['ArrowRight']) player.dx = speed;
    else player.dx = 0;

    if (keys[' '] && player.onGround) {
        player.dy = jumpStrength;
        player.onGround = false;
    }

    player.dy += gravity;
    player.x += player.dx;
    player.y += player.dy;

    player.onGround = false;
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            if (player.dy > 0) {
                player.y = platform.y - player.height;
                player.dy = 0;
                player.onGround = true;
            }
        }
    });

    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            player.x = 50;
            player.y = 300;
            player.dy = 0;
        }
    });

    if (player.x + player.width > door.x && player.y + player.height > door.y) {
        gameRunning = false;
        scene3.classList.add('hidden');
        scene4.classList.remove('hidden');
        initMatches();
    }

    if (player.y > 400) {
        player.x = 50;
        player.y = 300;
        player.dy = 0;
    }
}

function drawGame() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.fillStyle = '#8B4513';
    platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
    ctx.fillStyle = '#654321';
    obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.width, o.height));
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(door.x, door.y, door.width, door.height);
    ctx.fillStyle = '#FF6B35';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Keyboard events for mini-game
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Mobile control events
leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); keys['ArrowLeft'] = true; });
leftBtn.addEventListener('touchend', () => { keys['ArrowLeft'] = false; });
leftBtn.addEventListener('mousedown', () => { keys['ArrowLeft'] = true; });
leftBtn.addEventListener('mouseup', () => { keys['ArrowLeft'] = false; });

rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); keys['ArrowRight'] = true; });
rightBtn.addEventListener('touchend', () => { keys['ArrowRight'] = false; });
rightBtn.addEventListener('mousedown', () => { keys['ArrowRight'] = true; });
rightBtn.addEventListener('mouseup', () => { keys['ArrowRight'] = false; });

jumpBtn.addEventListener('touchstart', (e) => { e.preventDefault(); keys[' '] = true; });
jumpBtn.addEventListener('touchend', () => { keys[' '] = false; });
jumpBtn.addEventListener('mousedown', () => { keys[' '] = true; });
jumpBtn.addEventListener('mouseup', () => { keys[' '] = false; });

// Scene 4: Match lighting game
function initMatches() {
    matches = [false, false, false];
    matchesLit = 0;
    matchCounter.textContent = '0';
    document.getElementById('match1').classList.remove('lit');
    document.getElementById('match2').classList.remove('lit');
    document.getElementById('match3').classList.remove('lit');
}

['match1', 'match2', 'match3'].forEach((id, index) => {
    document.getElementById(id).addEventListener('click', () => {
        if (matches[index] || isAnimating) return;
        
        matches[index] = true;
        matchesLit++;
        document.getElementById(id).classList.add('lit');
        matchCounter.textContent = matchesLit;
        
        // Sound effect simulation with shake
        document.getElementById(id).style.animation = 'matchStrike 0.8s ease-out';
        setTimeout(() => {
            document.getElementById(id).style.animation = '';
        }, 800);
        
        if (matchesLit === 3) {
            setTimeout(() => {
                isAnimating = true;
                scene4.classList.add('hidden');
                scene5.classList.remove('hidden');
                startTypewriter();
                isAnimating = false;
            }, 1500);
        }
    });
});

// Typewriter effect with scrollable textbox
function startTypewriter() {
    typewriterTextbox.textContent = '';
    let charIndex = 0;
    const typeSpeed = 30; // ms per character
    
    const typeInterval = setInterval(() => {
        if (charIndex < creditMessage.length) {
            typewriterTextbox.textContent += creditMessage[charIndex];
            charIndex++;
            
            // Auto-scroll to bottom
            typewriterContainer.scrollTop = typewriterContainer.scrollHeight;
            
            // Cursor blink effect
            typewriterCursor.style.opacity = Math.random() > 0.5 ? '1' : '0';
        } else {
            clearInterval(typeInterval);
            // Final cursor blink
            const finalBlink = setInterval(() => {
                typewriterCursor.style.opacity = typewriterCursor.style.opacity === '1' ? '0' : '1';
            }, 500);
            setTimeout(() => clearInterval(finalBlink), 3000);
        }
    }, typeSpeed);
}
