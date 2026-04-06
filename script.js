const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisp = document.getElementById("score");
const gameOverMenu = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");

let score = 0;
let isDead = false;

// Fungsi Lompat
function jump() {
    if (player.classList != "jump" && !isDead) {
        player.classList.add("jump");
        setTimeout(() => player.classList.remove("jump"), 500);
    }
}

// Start Game Otomatis
obstacle.classList.add("run");

// Kontrol
document.addEventListener("keydown", (e) => { if(e.code === "Space") jump(); });
document.addEventListener("touchstart", jump);

// Loop Cek Tabrakan
setInterval(() => {
    let pBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let oLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // Logika Tabrakan (Disesuaikan posisinya)
    if (oLeft > 50 && oLeft < 80 && pBottom <= 40) {
        isDead = true;
        obstacle.style.animation = "none";
        obstacle.style.display = "none";
        gameOverMenu.style.display = "flex";
        finalScore.innerText = Math.floor(score);
    } else {
        if(!isDead) {
            score += 0.1;
            scoreDisp.innerText = "Score: " + Math.floor(score);
        }
    }
}, 10);

function resetGame() {
    location.reload();
}
