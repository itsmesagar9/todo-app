
// ================= UI CONTROLLER =================


// ================= TOAST SYSTEM =================
function showToast(message, type = "success") {

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    toast.innerText = message;

    document.body.appendChild(toast);

    // Auto remove after 3s
    setTimeout(() => {
        toast.classList.add("hide");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);
}


// ================= MODAL SYSTEM =================
function openModal(contentHTML) {

    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-box">
            ${contentHTML}
            <button onclick="closeModal()" class="close-btn">Close</button>
        </div>
    `;

    document.body.appendChild(modal);
}


// CLOSE MODAL
function closeModal() {

    const modal = document.querySelector(".modal");
    if (modal) modal.remove();
}


// ================= DARK / LIGHT MODE =================
function toggleTheme() {

    document.body.classList.toggle("light");

    // Save preference
    const mode = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", mode);
}


// LOAD THEME ON START
(function initTheme() {

    const saved = localStorage.getItem("theme");

    if (saved === "light") {
        document.body.classList.add("light");
    }

})();


// ================= EMPTY STATE HANDLER =================
function showEmptyState(containerId, message = "No data found") {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `
        <div class="empty-state">
            <p>${message}</p>
        </div>
    `;
}


// ================= LOADING OVERLAY (OPTIONAL) =================
function showLoading(text = "Loading...") {

    const loader = document.createElement("div");
    loader.id = "globalLoader";

    loader.innerHTML = `
        <div class="loader-box">
            <h3>${text}</h3>
        </div>
    `;

    document.body.appendChild(loader);
}


// REMOVE LOADING
function hideLoading() {

    const loader = document.getElementById("globalLoader");
    if (loader) loader.remove();
}


// ================= BUTTON LOADING STATE =================
function setButtonLoading(btn, state = true) {

    if (!btn) return;

    if (state) {
        btn.dataset.original = btn.innerText;
        btn.innerText = "Loading...";
        btn.disabled = true;
    } else {
        btn.innerText = btn.dataset.original;
        btn.disabled = false;
    }
}
