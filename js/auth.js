// ================= AUTH SYSTEM =================

// Buttons
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

// ================= VALIDATION FUNCTIONS =================

// Username must contain letters + numbers
function isValidUsername(username) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(username);
}

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Phone validation (simple)
function isValidPhone(phone) {
    return /^[0-9]{7,15}$/.test(phone);
}


// ================= REGISTER =================

registerBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value.trim();
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const agree = document.getElementById("agree").checked;

    // 🔴 VALIDATIONS
    if (!username || !fullname || !email || !phone || !password || !confirmPassword) {
        showToast("All fields are required", "error");
        return;
    }

    if (!isValidUsername(username)) {
        showToast("Username must include letters & numbers", "error");
        return;
    }

    if (!isValidEmail(email)) {
        showToast("Invalid email", "error");
        return;
    }

    if (!isValidPhone(phone)) {
        showToast("Invalid phone number", "error");
        return;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters", "error");
        return;
    }

    if (password !== confirmPassword) {
        showToast("Passwords do not match", "error");
        return;
    }

    if (!agree) {
        showToast("You must agree to Terms", "error");
        return;
    }

    // ================= OTP SIMULATION =================

    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store temporarily
    localStorage.setItem("otp", otp);
    localStorage.setItem("tempUser", JSON.stringify({
        username, fullname, email, phone, password
    }));

    showToast("OTP sent (check console for now)", "success");
    console.log("Your OTP:", otp);

    showOTPModal();
});


// ================= OTP MODAL =================

function showOTPModal() {

    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-box">
            <h3>Enter OTP</h3>
            <input type="text" id="otpInput" placeholder="Enter 6-digit OTP">
            <button id="verifyOtp">Verify</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("verifyOtp").onclick = async () => {

        const entered = document.getElementById("otpInput").value;
        const realOtp = localStorage.getItem("otp");

        if (entered == realOtp) {
            modal.remove();
            showToast("Registration Successful");

            // 👉 CALL API HERE
            await registerUserToSheet();

        } else {
            showToast("Invalid OTP", "error");
        }
    };
}


// ================= SEND TO GOOGLE SHEETS =================

async function registerUserToSheet() {

    const user = JSON.parse(localStorage.getItem("tempUser"));

    try {

        const result = await registerUser(user);

        if (result.status === "success") {

            showToast("Account Created Successfully");

            localStorage.removeItem("tempUser");
            localStorage.removeItem("otp");

            document.getElementById("showLogin").click();

        } else {
            showToast(result.message || "Registration failed", "error");
        }

    } catch (err) {
        showToast("Server error", "error");
    }
}

// ================= LOGIN =================

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        showToast("Enter email & password", "error");
        return;
    }

    try {

        const result = await loginUser(email, password);

        const result = await res.json();

        if (result.status === "success") {

            showToast("Login Successful");

            // Save session
            localStorage.setItem("user", JSON.stringify(result.user));

            // Redirect
            window.location.href = "dashboard.html";

        } else {
            showToast("Invalid credentials", "error");
        }

    } catch (err) {
        showToast("Server error", "error");
    }

});
