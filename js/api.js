// ================= API CONFIG =================

// 👉 PASTE YOUR WEB APP URL HERE
const API_URL = "https://script.google.com/macros/s/AKfycbxHvce7F5AtWiKw-nifG9egDAEQWeLYPn9MSEkcxKjjrWYGX9aVrUnFN-VzeTBeTWGW/exec";


// ================= GENERIC REQUEST =================

async function apiRequest(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data)
    });
    return await res.json();
}


// ================= USER =================

async function registerUser(data) {
    return await apiRequest({
        action: "register",
        data
    });
}

async function loginUser(email, password) {
    return await apiRequest({
        action: "login",
        email,
        password
    });
}


// ================= LIST =================

async function createList(userId, name) {
    return await apiRequest({
        action: "createList",
        userId,
        name
    });
}

async function getLists(userId) {
    return await apiRequest({
        action: "getLists",
        userId
    });
}


// ================= TASK =================

async function createTask(task) {
    return await apiRequest({
        action: "createTask",
        ...task
    });
}

async function getTasks(userId) {
    return await apiRequest({
        action: "getTasks",
        userId
    });
}


// ================= DELETE =================

async function deleteItem(type, id) {
    return await apiRequest({
        action: "deleteItem",
        type,
        id
    });
}
