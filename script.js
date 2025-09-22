const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// 5 sabit görev
const defaultTasks = [
  "Sağlıklı beslenmek",
  "Spor yapmak",
  "Ders çalışmak",
  "Uyku düzenine dikkat etmek",
  "Yeni yerler keşfetmek",
];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (tasks.length === 0) {
  tasks = defaultTasks;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Görevleri listeye ekle
tasks.forEach((task) => {
  const li = createTaskElement(task);
  taskList.appendChild(li);
});

// Ekle butonuna tıklayınca
addBtn.addEventListener("click", addTask);

// Görev oluşturma fonksiyonu
function createTaskElement(text) {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";

  const span = document.createElement("span");
  span.textContent = text;

  // Yapıldı tıklama
  span.addEventListener("click", () => {
    span.parentElement.classList.toggle("done");
  });

  // Silme butonu
  const delBtn = document.createElement("button");
  delBtn.textContent = "Sil";
  delBtn.addEventListener("click", () => {
    li.remove();
    tasks = tasks.filter((t) => t !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showToast("Görev silindi!");
  });

  li.appendChild(span);
  li.appendChild(delBtn);

  return li;
}

// Görev ekleme
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    showToast("Lütfen bir görev girin!");
    return;
  }

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  showToast("Görev eklendi!");
}

// Toast bildirim
function showToast(message) {
  const toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    const div = document.createElement("div");
    div.className = "toast-container position-fixed top-0 end-0 p-3";
    div.innerHTML = `
      <div class="toast" role="alert">
        <div class="toast-header">
          <strong class="me-auto">Uyarı</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">${message}</div>
      </div>
    `;
    document.body.appendChild(div);
  }

  const toastEl = document.querySelector(".toast");
  toastEl.querySelector(".toast-body").textContent = message;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
