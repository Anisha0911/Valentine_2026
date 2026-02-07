// ============================================
// 💝 VALENTINE CONFIG
// ============================================

const CONFIG = {
    valentineName: "Hey, Sharma",
    pageTitle: "Will You Be My Valentine? 💝",

    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        volume: 0.5,
        startText: "🎵 Tap to Play Music"
    }
};

window.VALENTINE_CONFIG = CONFIG;

// ============================================
// 🎵 MUSIC AUTOPLAY LOGIC (MOBILE SAFE)
// ============================================

let audio;
let musicStarted = false;

window.addEventListener("load", () => {
    if (!VALENTINE_CONFIG.music.enabled) return;

    audio = new Audio(VALENTINE_CONFIG.music.musicUrl);
    audio.loop = true;
    audio.volume = VALENTINE_CONFIG.music.volume;

    // 🔇 MUTED autoplay (only thing mobile allows)
    audio.muted = true;

    audio.play().then(() => {
        console.log("Muted autoplay success");

        // First user interaction → unmute + full volume
        document.addEventListener("click", enableSound, { once: true });
        document.addEventListener("touchstart", enableSound, { once: true });

    }).catch(() => {
        console.log("Autoplay blocked, showing button");
        showMusicButton();
    });
});

function enableSound() {
    if (musicStarted) return;
    musicStarted = true;

    audio.muted = false;
    audio.play();
}

function showMusicButton() {
    const btn = document.createElement("button");
    btn.innerText = VALENTINE_CONFIG.music.startText;

    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        padding: 12px 18px;
        border-radius: 30px;
        border: none;
        background: #ff6b6b;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 6px 15px rgba(0,0,0,0.25);
    `;

    btn.onclick = () => {
        audio.muted = false;
        audio.play();
        btn.remove();
    };

    document.body.appendChild(btn);
}
