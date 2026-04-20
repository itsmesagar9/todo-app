
let currentUser = null;
let tasks = [];
let lists = [];
let selectedListId = null;


// ================= INIT =================
document.addEventListener("DOMContentLoaded", async () => {

    currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
        window.location.href = "index.html";
        return;
    }

    console.log("Dashboard Loaded for:", currentUser.email);

    await loadLists();
    await loadTasks();

    bindEvents();
});


// ================= LOAD LISTS =================
async function loadLists() {

    const res = await getLists(currentUser.id);

    if (res.status === "success") {
        lists = res.lists;
        renderLists();
    }
}


// ================= LOAD TASKS =================
async function loadTasks() {

    const res = await getTasks(currentUser.id);

    if (res.status === "success") {
        tasks = res.tasks;
        renderTasks();
    }
}


// ================= RENDER LISTS =================
function renderLists() {

    const container = document.getElementById("listContainer");
    container.innerHTML = "";

    lists.forEach(list => {

        const li = document.createElement("li");
        li.innerText = list.name;

        li.onclick = () => {
            selectedListId = list.id;
            renderTasks();
        };

        container.appendChild(li);
    });
}


// ================= RENDER TASKS =================
function renderTasks() {

    const container = document.getElementById("taskContainer");
    const empty = document.getElementById("emptyState");

    container.innerHTML = "";

    let filtered = tasks;

    // Filter by list
    if (selectedListId) {
        filtered = filtered.filter(t => t.listId === selectedListId);
    }

    // Filter by search
    const search = document.getElementById("searchTask")?.value || "";
    if (search) {
        filtered = filtered.filter(t =>
            t.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Filter by status
    const status = document.getElementById("filterStatus")?.value;
    if (status) {
        filtered = filtered.filter(t => t.status === status);
    }

    if (filtered.length === 0) {
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";

    filtered.forEach(task => {

        const div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-status", task.status);

        div.innerHTML = `
            <h4>${task.title}</h4>
            <p>Status: ${task.status}</p>
            <button onclick="deleteTask('${task.id}')">Delete</button>
            <button onclick="editTask('${task.id}')">Edit</button>
        `;

        container.appendChild(div);
    });
}


// ================= CREATE TASK =================
async function createTaskHandler() {

    const title = prompt("Task Title");
    if (!title) return;

    const task = {
        userId: currentUser.id,
        listId: selectedListId || "",
        title,
        description: "",
        status: "Not Started"
    };

    const res = await createTask(task);

    if (res.status === "success") {
        await loadTasks();
    }
}


// ================= DELETE TASK =================
async function deleteTask(id) {

    const res = await deleteItem(id, "task");

    if (res.status === "success") {
        await loadTasks();
    }
}


// ================= EDIT TASK =================
async function editTask(id) {

    const task = tasks.find(t => t.id === id);

    const newTitle = prompt("Edit Task", task.title);

    if (!newTitle) return;

    const updated = {
        id,
        title: newTitle,
        description: task.description,
        status: task.status
    };

    const res = await updateTaskAPI(updated);

    if (res.status === "success") {
        await loadTasks();
    }
}


// ================= FILTER EVENTS =================
function bindEvents() {

    document.getElementById("searchTask").addEventListener("input", renderTasks);
    document.getElementById("filterStatus").addEventListener("change", renderTasks);

    document.getElementById("addTaskBtn").addEventListener("click", createTaskHandler);
}


// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}
