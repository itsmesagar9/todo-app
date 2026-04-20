// ================= INIT =================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "index.html";
}

const listContainer = document.getElementById("listContainer");
const taskContainer = document.getElementById("taskContainer");
const emptyState = document.getElementById("emptyState");
let editTaskId = null;
let currentListId = null;
let allTasks = [];

// ================= LOAD LISTS =================

async function loadLists() {

    const res = await getLists(user.id);

    listContainer.innerHTML = "";

    res.lists.forEach(list => {
        const li = document.createElement("li");
        li.innerText = list.name;

        li.onclick = () => {
            currentListId = list.id;
            document.getElementById("currentList").innerText = list.name;
            loadTasks();
        };

        listContainer.appendChild(li);
    });
}

// ================= LOAD TASKS =================

async function loadTasks() {

    const res = await getTasks(user.id);

    allTasks = res.tasks;

    renderTasks();
}
// ================= OPEN MODAL =================

// ================= RENDER =================

function renderTasks() {

    taskContainer.innerHTML = "";

    const filter = document.getElementById("filterStatus").value;

    const filtered = allTasks.filter(t =>
        (!currentListId || t.listId === currentListId) &&
        (!filter || t.status === filter)
    );

    if (filtered.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    filtered.forEach(task => {

        const div = document.createElement("div");
        div.className = "task";

        div.setAttribute("data-status", task.status);

        div.innerHTML = `
    <h4>${task.title}</h4>
    <p>Status: ${task.status}</p>
    <p>${task.description || ""}</p>

    <button onclick='openTaskModal(${JSON.stringify(task)})'>Edit</button>
    <button onclick="deleteTask('${task.id}')">Delete</button>
`;
        taskContainer.appendChild(div);
    });
}

function openTaskModal(task = null) {

    document.getElementById("taskModal").classList.remove("hidden");

    if (task) {
        editTaskId = task.id;

        document.getElementById("modalTitle").innerText = "Edit Task";

        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskStatus").value = task.status;

    } else {
        editTaskId = null;
        document.getElementById("modalTitle").innerText = "Add Task";
    }
}

function closeTaskModal() {
    document.getElementById("taskModal").classList.add("hidden");
}
// ================= ADD LIST =================

document.getElementById("addListBtn").onclick = async () => {

    const name = prompt("Enter list name");

    if (!name) return;

    await createList(user.id, name);

    showToast("List created");

    loadLists();
};

// ================= ADD TASK =================

document.getElementById("addTaskBtn").onclick = async () => {

    if (!currentListId) {
        showToast("Select a list first", "error");
        return;
    }

    openTaskModal();
    const status = prompt("Status (Not Started / In Progress / Completed / Delayed)");

    await createTask({
        userId: user.id,
        listId: currentListId,
        title,
        description: "",
        status,
        start: "",
        end: "",
        secStart: "",
        secEnd: "",
        recurring: "no",
        reason: ""
    });

    showToast("Task added");

    loadTasks();
};

// ================= DELETE =================

async function deleteTask(id) {

    confirmAction("Delete this task?", async () => {

        await deleteItem("task", id);

        showToast("Task deleted");

        loadTasks();
    });
}

// ================= FILTER =================

document.getElementById("filterStatus").onchange = renderTasks;

// ================= SEARCH =================

document.getElementById("searchInput").oninput = function () {

    const keyword = this.value.toLowerCase();

    const filtered = allTasks.filter(t =>
        t.title.toLowerCase().includes(keyword)
    );

    taskContainer.innerHTML = "";

    filtered.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";
        div.innerHTML = `<h4>${task.title}</h4>`;
        taskContainer.appendChild(div);
    });
};

// ================= LOGOUT =================

document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
};
document.getElementById("saveTaskBtn").onclick = async () => {

    const title = document.getElementById("taskTitle").value;
    const desc = document.getElementById("taskDesc").value;
    const status = document.getElementById("taskStatus").value;
    const start = document.getElementById("taskStart").value;
    const end = document.getElementById("taskEnd").value;
    const secStart = document.getElementById("taskSecStart").value;
    const secEnd = document.getElementById("taskSecEnd").value;
    const recurring = document.getElementById("taskRecurring").value;

    let reason = document.getElementById("taskReason").value;

    if (reason === "Other") {
        reason = document.getElementById("customReason").value;
    }

    if (!title) {
        showToast("Title required", "error");
        return;
    }

    await createTask({
        userId: user.id,
        listId: currentListId,
        title,
        description: desc,
        status,
        start,
        end,
        secStart,
        secEnd,
        recurring,
        reason
    });

    showToast("Task saved");

    closeTaskModal();
    loadTasks();
};
// ================= INIT LOAD =================

loadLists();
loadTasks();