const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisp = document.getElementById("score");
const gameOverMenu = document.getElementById("game-over");

let score = 0;
let isDead = false;
let lastMilestone = 0;

// Masukkan Sound
const jumpSound = new Audio('jump sound.mp3');
const milestoneSound = new Audio('100 sound.mp3');

function jump() {
    if (player.classList != "jump" && !isDead) {
        player.classList.add("jump");
        jumpSound.play(); // Bunyi pas lompat
        setTimeout(() => player.classList.remove("jump"), 500);
    }
}

obstacle.classList.add("run");
document.addEventListener("keydown", (e) => { if(e.code === "Space") jump(); });
document.addEventListener("touchstart", jump);

setInterval(() => {
    let pBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let oLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (oLeft > 50 && oLeft < 85 && pBottom <= 45) {
        isDead = true;
        obstacle.style.animation = "none";
        gameOverMenu.style.display = "flex";
        document.getElementById("final-score").innerText = Math.floor(score);
    } else if (!isDead) {
        score += 0.1;
        let currentScore = Math.floor(score);
        scoreDisp.innerText = "Score: " + currentScore;

        // Logika Sound setiap 100 poin
        if (currentScore > 0 && currentScore % 100 === 0 && currentScore !== lastMilestone) {
            milestoneSound.play();
            lastMilestone = currentScore; // Biar gak bunyi terus-menerus di angka 100
        }
    }
}, 10);

function resetGame() { location.reload(); }
