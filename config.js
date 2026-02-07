// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    valentineName: "Hey, Sharma",

    pageTitle: "Will You Be My Valentine? 💝",

    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        bears: ['🧸', '🐻']
    },

    questions: {
        first: {
            text: "Do you like me?",
            yesBtn: "Yes",
            noBtn: "No",
            secretAnswer: "I don't like you, I love you! ❤️"
        },
        second: {
            text: "How much do you love me?",
            startText: "This much!",
            nextBtn: "Next ❤️"
        },
        third: {
            text: "So… what do you say about being my Valentine on February 14th, 2026? 💘 🌹",
            yesBtn: "Yes!",
            noBtn: "No"
        }
    },

    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",
        high: "To infinity and beyond! 🚀💝",
        normal: "And beyond! 🥰"
    },

    celebration: {
        title: "Yay! My heart is so happy right now 🎉💝💖💝💓",
        message: "Now come get your gift, a big warm hug and a huge kiss!",
        emojis: "🎁💖🤗💝💋❤️💕"
    },

    colors: {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    },

    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },

    // 🎵 MUSIC SETTINGS
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    }
};

// Make config global
window.VALENTINE_CONFIG = CONFIG;

// ============================================
// 🎵 AUTOPLAY MUSIC LOGIC (ALL DEVICES SAFE)
// ============================================

let audio;
let musicBtn;

window.addEventListener("load", () => {
    if (!VALENTINE_CONFIG.music.enabled) return;

    audio = new Audio(VALENTINE_CONFIG.music.musicUrl);
    audio.loop = true;
    audio.volume = VALENTINE_CONFIG.music.volume;

    // Try autoplay (muted first – higher success rate)
    if (VALENTINE_CONFIG.music.autoplay) {
        audio.muted = true;

        audio.play().then(() => {
            // Unmute on first user interaction
            document.addEventListener("click", () => {
                audio.muted = false;
            }, { once: true });
        }).catch(() => {
            // Autoplay blocked → show button
            showMusicButton();
        });
    }
});

function showMusicButton() {
    musicBtn = document.createElement("button");
    musicBtn.innerText = VALENTINE_CONFIG.music.startText;

    musicBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        padding: 10px 16px;
        border-radius: 25px;
        border: none;
        background: ${VALENTINE_CONFIG.colors.buttonBackground};
        color: white;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    `;

    musicBtn.onclick = () => {
        audio.muted = false;
        audio.play();
        musicBtn.remove();
    };

    document.body.appendChild(musicBtn);
}
