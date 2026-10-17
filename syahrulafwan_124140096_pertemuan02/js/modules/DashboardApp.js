import { TaskItem } from './TaskItem.js';
import { DEFAULT_COURSES, SCHEDULE, FALLBACK_QUOTES } from './data.js';
import { $, lower, formatDate, makeId, dateAfter, escapeHTML } from './helpers.js';
import { taskCard, emptyState, scheduleItem, scheduleEmpty, deadlineItem } from './views.js';

const STORAGE_KEY = 'taskora-paw-tasks-v1';
const LAST_QUOTE_KEY = 'taskora-paw-last-quote-v1';
const PREVIEW_LIMIT = 4;
const OLD_COURSE_NAMES = ['Jarkom', 'Praktikum Jarkom'];
const FORM_FIELDS = ['name', 'course', 'deadline', 'priority']; // sesuai id input: #task-name, #task-course, dst.

export class DashboardApp {
  constructor() {
    this.tasks = this.loadTasks();
    this.showAll = false;
    this.fallbackIndex = -1;
    this.migrateCourseNames();
  }

  // ---------- Data & localStorage ----------
  loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved.map((task) => new TaskItem(task)) : [];
    } catch {
      return [];
    }
  }

  saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  // Simpan, lalu perbarui semua tampilan yang bergantung pada data tugas
  refresh() {
    this.saveTasks();
    this.updateCourseOptions();
    this.render();
    this.renderDeadlineReminder();
  }

  // Nama mata kuliah lama ("Jarkom") digabung ke nama baru
  migrateCourseNames() {
    let changed = false; // let: nilainya berubah kalau ada nama lama
    this.tasks = this.tasks.map((task) => {
      if (!OLD_COURSE_NAMES.includes(task.course)) return task;
      changed = true;
      return task.update({ course: 'Jaringan Komputer' });
    });
    if (changed) this.saveTasks();
  }

  // ---------- Event listener ----------
  start() {
    $('#task-form').addEventListener('submit', (event) => this.handleSubmit(event));
    ['#cancel-edit', '#close-form'].forEach((selector) => $(selector).addEventListener('click', () => this.resetForm()));
    $('#load-samples').addEventListener('click', () => this.loadApiSamples());
    $('#delete-all-tasks').addEventListener('click', () => this.deleteAllTasks());
    $('#refresh-quote').addEventListener('click', () => this.loadDailyQuote());
    $('#open-form').addEventListener('click', () => {
      this.resetForm();
      this.showForm(true);
    });
    $('#toggle-tasks').addEventListener('click', () => {
      this.showAll = !this.showAll;
      this.render();
    });
    ['#search-input', '#course-filter', '#status-filter'].forEach((selector) =>
      $(selector).addEventListener('input', () => this.render()));

    // Menu sidebar: tandai menu yang sedang aktif
    const links = [...document.querySelectorAll('.nav-link')];
    const setActive = (isActive) => links.forEach((link, i) => link.classList.toggle('active', isActive(link, i)));
    links.forEach((link) => link.addEventListener('click', () => setActive((item) => item === link)));
    $('.brand').addEventListener('click', () => setActive((item, i) => i === 0));

    // Satu listener untuk semua tombol di daftar tugas (event delegation)
    $('#task-list').addEventListener('click', ({ target }) => {
      const button = target.closest('[data-action]');
      if (!button) return;
      const { action, id } = button.dataset;
      if (action === 'edit') this.editTask(id);
      if (action === 'delete') this.deleteTask(id);
    });
    $('#task-list').addEventListener('change', ({ target }) => {
      if (target.dataset.action === 'toggle') this.toggleTask(target.dataset.id, target.checked);
    });

    this.updateCourseOptions();
    this.render();
    this.renderDailySchedule();
    this.renderDeadlineReminder();
    this.loadDailyQuote();
  }

  // ---------- Tambah, edit, hapus ----------
  handleSubmit(event) {
    event.preventDefault();
    const id = $('#task-id').value;
    const data = {};
    FORM_FIELDS.forEach((field) => { data[field] = $(`#task-${field}`).value.trim(); });
    if (!data.name || !data.course || !data.deadline) return;

    this.tasks = id
      ? this.tasks.map((task) => (task.id === id ? task.update(data) : task))
      : [new TaskItem({ id: makeId(), ...data }), ...this.tasks];
    this.refresh();
    this.resetForm();
  }

  editTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return;
    ['id', ...FORM_FIELDS].forEach((field) => { $(`#task-${field}`).value = task[field]; });
    this.setFormMode(true);
    this.showForm(true);
  }

  // Formulir hanya tampil saat menambah atau mengedit tugas
  showForm(open) {
    $('#form-panel').classList.toggle('hidden', !open);
    $('.content-grid').classList.toggle('form-closed', !open);
    if (!open) return;
    $('#form-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    $('#task-name').focus();
  }

  setFormMode(editing) {
    $('#form-title').textContent = editing ? 'Edit tugas' : 'Tugas baru';
    $('#save-task').textContent = editing ? 'Simpan perubahan' : 'Simpan tugas';
    $('#cancel-edit').textContent = editing ? 'Batal mengedit' : 'Batal';
  }

  resetForm() {
    $('#task-form').reset();
    $('#task-id').value = ''; // input hidden tidak ikut di-reset oleh form.reset()
    this.setFormMode(false);
    this.showForm(false);
  }

  deleteTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task || !window.confirm(`Hapus tugas "${task.name}"?`)) return;
    this.tasks = this.tasks.filter((item) => item.id !== id);
    this.refresh();
    if ($('#task-id').value === id) this.resetForm();
  }

  toggleTask(id, completed) {
    this.tasks = this.tasks.map((task) => (task.id === id ? task.update({ completed }) : task));
    this.refresh();
  }

  deleteAllTasks() {
    if (!this.tasks.length) {
      $('#api-message').textContent = 'Daftar tugas sudah kosong.';
      return;
    }
    if (!window.confirm(`Hapus semua ${this.tasks.length} tugas? Tindakan ini tidak dapat dibatalkan.`)) return;
    this.tasks = [];
    this.refresh();
    this.resetForm();
    $('#api-message').textContent = 'Semua tugas berhasil dihapus.';
  }

  // ---------- Tampilan ----------
  renderDailySchedule() {
    const now = new Date();
    const day = now.getDay();
    const lessons = SCHEDULE[day] || [];
    const today = formatDate(now, { weekday: 'long', day: 'numeric', month: 'long' });
    $('#today-label').textContent = today;
    $('#schedule-date').textContent = `${today} · Jadwal ${formatDate(now, { weekday: 'long' })}`;
    $('#daily-schedule').innerHTML = lessons.length ? lessons.map(scheduleItem).join('') : scheduleEmpty([0, 6].includes(day));
  }

  renderDeadlineReminder() {
    const upcoming = this.tasks
      .filter((task) => !task.completed)
      .map((task) => ({ task, days: task.getDaysLeft() }))
      .filter(({ days }) => days <= 3)
      .sort((a, b) => a.days - b.days);

    $('#deadline-message').textContent = upcoming.length
      ? `${upcoming.length} tugas perlu diperhatikan karena tenggatnya dekat atau sudah terlewat.`
      : 'Belum ada tugas yang tenggatnya dalam 3 hari ke depan.';
    $('#deadline-list').innerHTML = upcoming.slice(0, 5).map(deadlineItem).join('');
  }

  updateCourseOptions() {
    const filter = $('#course-filter');
    const current = filter.value || 'all';
    const userCourses = this.tasks.filter((task) => task.source !== 'api').map((task) => task.course);
    const courses = [...new Set([...DEFAULT_COURSES, ...userCourses])].sort((a, b) => a.localeCompare(b, 'id'));
    const option = (course, label = escapeHTML(course)) => `<option value="${escapeHTML(course)}">${label}</option>`;

    filter.innerHTML = option('all', 'Semua mata kuliah') + courses.map((course) => option(course)).join('');
    filter.value = courses.includes(current) ? current : 'all';
    $('#course-options').innerHTML = courses.map((course) => option(course, '')).join('');
  }

  getVisibleTasks() {
    const search = lower($('#search-input').value.trim());
    const course = $('#course-filter').value;
    const status = $('#status-filter').value;
    return this.tasks
      .filter((task) => [task.name, task.course].some((text) => lower(text).includes(search))
        && (course === 'all' || task.course === course)
        && (status === 'all' || task.completed === (status === 'done')))
      .sort((a, b) => Number(a.completed) - Number(b.completed) || a.deadline.localeCompare(b.deadline));
  }

  render() {
    const visible = this.getVisibleTasks();
    const shown = this.showAll ? visible : visible.slice(0, PREVIEW_LIMIT);
    const extra = Math.max(visible.length - PREVIEW_LIMIT, 0);
    const total = this.tasks.length;
    const done = this.tasks.filter((task) => task.completed).length;
    const toggle = $('#toggle-tasks');

    $('#total-count').textContent = total;
    $('#active-count').textContent = total - done;
    $('#done-count').textContent = done;
    $('#visible-count').textContent = `${shown.length} dari ${total} tugas ditampilkan`;
    toggle.classList.toggle('hidden', extra === 0);
    toggle.textContent = this.showAll ? '↑ Tampilkan lebih sedikit' : `↓ Selengkapnya (${extra} tugas lagi)`;
    toggle.setAttribute('aria-expanded', String(this.showAll));
    $('#task-list').innerHTML = shown.length ? shown.map(taskCard).join('') : emptyState(total > 0);
  }

  // ---------- Fetch API (async/await) ----------
  async loadApiSamples() {
    const message = $('#api-message');
    message.textContent = 'Sedang mengambil contoh tugas dari JSONPlaceholder...';
    $('#load-samples').disabled = true;
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      if (!response.ok) throw new Error('Permintaan API gagal');
      const existing = new Set(this.tasks.map((task) => lower(task.name)));
      const samples = (await response.json())
        .filter(({ title }) => !existing.has(lower(title)))
        .map(({ id, title, completed }, index) => new TaskItem({
          id: `api-${id}-${Date.now()}-${index}`,
          name: title.charAt(0).toLocaleUpperCase('id') + title.slice(1),
          course: 'Contoh JSONPlaceholder',
          deadline: dateAfter(index + 1),
          priority: 'low',
          completed,
          source: 'api'
        }));

      this.tasks = [...this.tasks, ...samples];
      this.refresh();
      message.textContent = samples.length
        ? `${samples.length} contoh tugas berhasil ditambahkan. Tugas yang sudah ada tidak dihapus.`
        : 'Contoh tugas yang diterima sudah ada di daftar.';
    } catch {
      message.textContent = 'Data API tidak dapat dimuat. Periksa koneksi internet lalu coba lagi.';
    } finally {
      $('#load-samples').disabled = false;
    }
  }

  async loadDailyQuote() {
    const show = (text, author = '') => {
      $('#daily-quote').textContent = text;
      $('#quote-author').textContent = author && `— ${author}`;
    };
    const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];
    $('#refresh-quote').disabled = true;
    show('Mencari inspirasi...');
    try {
      const response = await fetch('https://dummyjson.com/quotes?limit=0');
      if (!response.ok) throw new Error('Gagal mengambil kutipan');
      const { quotes = [] } = await response.json();
      if (!quotes.length) throw new Error('Data kutipan kosong');

      // Pilih kutipan acak yang berbeda dari kutipan terakhir
      const lastId = localStorage.getItem(LAST_QUOTE_KEY);
      const choices = quotes.filter(({ id }) => String(id) !== lastId);
      const { id, quote, author } = pickRandom(choices.length ? choices : quotes);
      show(`“${quote}”`, author);
      localStorage.setItem(LAST_QUOTE_KEY, String(id));
    } catch {
      this.fallbackIndex = (this.fallbackIndex + 1) % FALLBACK_QUOTES.length; // kutipan cadangan bergantian
      const { quote, author } = FALLBACK_QUOTES[this.fallbackIndex];
      show(`“${quote}”`, author);
    } finally {
      $('#refresh-quote').disabled = false;
    }
  }
}
