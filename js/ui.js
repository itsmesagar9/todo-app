// ================= FORM SWITCH =================

const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

document.getElementById("showRegister").addEventListener("click", () => {
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
});

document.getElementById("showLogin").addEventListener("click", () => {
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
});


// ================= PASSWORD TOGGLE =================

const toggleIcons = document.querySelectorAll(".toggle-password");

toggleIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;

        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    });
});


// ================= THEME TOGGLE =================

const themeIcon = document.getElementById("themeIcon");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeIcon.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
    }
});


// ================= TOAST SYSTEM =================

// 👉 You will use this in other JS files
function showToast(message, type = "success") {

    const toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


// ================= MODAL CONFIRM =================

// 👉 Reusable confirm popup
function confirmAction(message, callback) {

    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-box">
            <p>${message}</p>
            <button id="yesBtn">Yes</button>
            <button id="noBtn">No</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("yesBtn").onclick = () => {
        callback();
        modal.remove();
    };

    document.getElementById("noBtn").onclick = () => {
        modal.remove();
    };
}