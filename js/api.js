// ================= API CONFIG =================

// 👉 PASTE YOUR WEB APP URL HERE
const API_URL = "PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE";


// ================= GENERIC REQUEST =================

async function apiRequest(data) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(data)
        });

        return await res.json();
    } catch (err) {
        showToast("API Error", "error");
    }
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