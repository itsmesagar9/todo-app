
// ================= CONFIG =================
const API_URL = "https://script.google.com/macros/s/AKfycbxHvce7F5AtWiKw-nifG9egDAEQWeLYPn9MSEkcxKjjrWYGX9aVrUnFN-VzeTBeTWGW/exec";


// ================= CORE REQUEST FUNCTION =================
async function apiRequest(payload) {

    try {

        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        return data;

    } catch (error) {
        console.error("API Error:", error);
        return { status: "error", message: "Network error" };
    }
}


// ================= AUTH APIs =================

// REGISTER USER (final step after OTP)
function registerUser(userData) {
    return apiRequest({
        action: "register",
        data: userData
    });
}


// LOGIN USER
function loginUser(email, password) {
    return apiRequest({
        action: "login",
        email,
        password
    });
}


// ================= OTP APIs =================

// SEND OTP TO EMAIL
function sendOTP(email) {
    return apiRequest({
        action: "sendOTP",
        email
    });
}


// VERIFY OTP
function verifyOTP(email, otp) {
    return apiRequest({
        action: "verifyOTP",
        email,
        otp
    });
}


// ================= TASK APIs =================

// CREATE TASK
function createTask(task) {
    return apiRequest({
        action: "createTask",
        ...task
    });
}


// GET TASKS
function getTasks(userId) {
    return apiRequest({
        action: "getTasks",
        userId
    });
}


// UPDATE TASK
function updateTaskAPI(task) {
    return apiRequest({
        action: "updateTask",
        ...task
    });
}


// DELETE ITEM (task or list)
function deleteItem(id, type) {
    return apiRequest({
        action: "deleteItem",
        id,
        type
    });
}


// ================= LIST APIs =================

// CREATE LIST
function createList(userId, name) {
    return apiRequest({
        action: "createList",
        userId,
        name
    });
}


// GET LISTS
function getLists(userId) {
    return apiRequest({
        action: "getLists",
        userId
    });
}
