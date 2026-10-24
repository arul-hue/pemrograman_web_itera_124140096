const PRIORITY_LABELS = { high: 'Tinggi', medium: 'Sedang', low: 'Rendah' };

export class TaskItem {
  constructor({ id, name, course, deadline, priority = 'medium', completed = false, source = 'user' }) {
    this.id = id;
    this.name = name;
    this.course = course;
    this.deadline = deadline;
    this.priority = priority;
    this.completed = completed;
    this.source = source;
  }

  getPriorityLabel() {
    return PRIORITY_LABELS[this.priority] || PRIORITY_LABELS.medium;
  }

  // Selisih hari dari hari ini ke tenggat (negatif = sudah lewat)
  getDaysLeft() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((new Date(`${this.deadline}T00:00:00`) - today) / 86400000);
  }

  // Mengembalikan TaskItem baru (immutable), objek lama tidak diubah
  update(changes) {
    return new TaskItem({ ...this, ...changes });
  }

  toJSON() {
    return { ...this };
  }
}
