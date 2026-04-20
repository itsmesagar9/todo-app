// ================= PRELOADER =================

let progress = 0;
const progressBar = document.getElementById("progress");
const percentText = document.getElementById("percent");
const preloader = document.getElementById("preloader");
const authContainer = document.getElementById("authContainer");

function startLoader() {
    let interval = setInterval(() => {
        progress++;

        progressBar.style.width = progress + "%";
        percentText.innerText = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);

            // Smooth fade out
            preloader.style.opacity = "0";

            setTimeout(() => {
                preloader.style.display = "none";
                authContainer.classList.remove("hidden");
            }, 500);
        }
    }, 20); // speed control
}

// Start when page loads
window.addEventListener("load", startLoader);