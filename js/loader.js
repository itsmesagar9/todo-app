
// ================= LOADER SYSTEM =================

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const progressText = document.getElementById("progress");

    if (!loader || !progressText) {
        console.error("Loader elements not found");
        return;
    }

    let progress = 0;

    // Smooth fake loading simulation (real SaaS style)
    const interval = setInterval(() => {

        progress += Math.floor(Math.random() * 10) + 1;

        if (progress > 100) progress = 100;

        progressText.innerText = progress + "%";

        // When completed
        if (progress === 100) {

            clearInterval(interval);

            setTimeout(() => {

                // Smooth fade out
                loader.style.opacity = "0";
                loader.style.transition = "0.5s ease";

                setTimeout(() => {
                    loader.style.display = "none";
                }, 500);

            }, 300);

        }

    }, 120);
});
