const STORAGE_KEY = 'snaptodo_todos';
const STREAK_KEY = 'snaptodo_streak';
const LAST_DATE_KEY = 'snaptodo_last_date';

let todos = [];
let streak = 0;
let lastActiveDate = null;

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    todos = saved ? JSON.parse(saved) : [];
    streak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
    lastActiveDate = localStorage.getItem(LAST_DATE_KEY);
  } catch {
    todos = [];
    streak = 0;
    lastActiveDate = null;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  localStorage.setItem(STREAK_KEY, streak.toString());
  localStorage.setItem(LAST_DATE_KEY, lastActiveDate);
}

function getToday() {
  return new Date().toDateString();
}

function updateStreak() {
  const today = getToday();
  if (lastActiveDate === today) return;

  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastActiveDate === yesterday) {
    streak++;
  } else if (lastActiveDate !== today) {
    streak = 1;
  }

  lastActiveDate = today;
  saveState();
  renderStreak();
}

function renderStreak() {
  document.getElementById('streak-count').textContent = streak;
}

function flashScreen() {
  const flash = document.getElementById('snap-flash');
  flash.classList.remove('active');
  void flash.offsetWidth;
  flash.classList.add('active');
}

function renderTodos() {
  const list = document.getElementById('todo-list');
  const isEmpty = todos.length === 0;

  if (isEmpty) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="ghost">👻</div>
        <h2>No snaps yet</h2>
        <p>Snap a todo to get started!</p>
      </div>
    `;
    return;
  }

  list.innerHTML = todos.map((todo, index) => {
    const timeStr = todo.createdAt
      ? new Date(todo.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';
    return `
      <div class="todo-item" data-index="${index}">
        <button class="todo-check ${todo.done ? 'done' : ''}" data-action="toggle" data-index="${index}"></button>
        <span class="todo-text ${todo.done ? 'done' : ''}">${escapeHtml(todo.text)}</span>
        <span class="todo-time">${timeStr}</span>
        <button class="todo-delete" data-action="delete" data-index="${index}">✕</button>
      </div>
    `;
  }).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  todos.unshift({
    text: trimmed,
    done: false,
    createdAt: Date.now(),
  });

  saveState();
  renderTodos();
  updateStreak();
}

function toggleTodo(index) {
  if (index < 0 || index >= todos.length) return;
  todos[index].done = !todos[index].done;

  if (todos[index].done) {
    flashScreen();
    const items = document.querySelectorAll('.todo-item');
    if (items[index]) {
      items[index].classList.add('snapping');
    }
    setTimeout(() => {
      todos.splice(index, 1);
      saveState();
      renderTodos();
      updateStreak();
    }, 450);
    return;
  }

  saveState();
  renderTodos();
}

function deleteTodo(index) {
  if (index < 0 || index >= todos.length) return;
  todos.splice(index, 1);
  saveState();
  renderTodos();
}

function handleAction(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const action = btn.dataset.action;
  const index = parseInt(btn.dataset.index, 10);

  if (action === 'toggle') toggleTodo(index);
  if (action === 'delete') deleteTodo(index);
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderTodos();
  renderStreak();

  document.getElementById('todo-list').addEventListener('click', handleAction);

  document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (text) {
      addTodo(text);
      input.value = '';
      input.focus();
    }
  });
});
