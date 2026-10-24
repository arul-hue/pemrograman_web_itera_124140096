import { formatDate, escapeHTML } from './helpers.js';

// Fungsi-fungsi kecil yang hanya mengubah data menjadi string HTML (template literals)

export const taskCard = (task) => {
  const { id, name, course, deadline, priority, completed, source } = task;
  const date = formatDate(new Date(`${deadline}T00:00:00`), { day: 'numeric', month: 'short', year: 'numeric' });
  const overdue = !completed && task.getDaysLeft() < 0;
  const button = (action, label, icon) =>
    `<button class="icon-button" type="button" data-action="${action}" data-id="${escapeHTML(id)}" aria-label="${label} tugas" title="${label}">${icon}</button>`;

  return `<article class="task-item ${completed ? 'completed' : ''}">
    <input class="task-check" type="checkbox" aria-label="Tandai ${escapeHTML(name)} selesai" data-action="toggle" data-id="${escapeHTML(id)}" ${completed ? 'checked' : ''}>
    <div class="task-content"><div class="task-name">${escapeHTML(name)}</div>
      <div class="task-meta"><span class="course-tag">${escapeHTML(course)}</span><span class="priority ${priority}">${task.getPriorityLabel()}</span>${source === 'api' ? '<span class="course-tag">Contoh API</span>' : ''}</div>
      <div class="task-deadline ${overdue ? 'overdue' : ''}">${overdue ? 'Terlambat' : 'Tenggat'} · ${date}</div>
    </div>
    <div class="task-actions">${button('edit', 'Edit', '✎')}${button('delete', 'Hapus', '×')}</div>
  </article>`;
};

export const emptyState = (hasTasks) => {
  const [icon, title, hint] = hasTasks
    ? ['⌕', 'Tugas tidak ditemukan', 'Coba ubah kata pencarian atau filter.']
    : ['＋', 'Belum ada tugas', 'Tambahkan tugas pertamamu melalui formulir di samping.'];
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><strong>${title}</strong><p>${hint}</p></div>`;
};

export const scheduleItem = ({ time, name, room, note }) =>
  `<article class="schedule-item"><span class="schedule-time">${time}</span><div><strong>${name}</strong><small>${room}</small>${note ? `<small class="class-note">${note}</small>` : ''}</div></article>`;

export const scheduleEmpty = (isWeekend) =>
  `<div class="schedule-empty"><strong>${isWeekend ? 'Tidak ada jadwal kuliah hari ini' : 'Hari ini tidak ada kelas terjadwal'}</strong><p>Gunakan waktu luang untuk mengejar tugas atau mengulang materi.</p></div>`;

export const deadlineItem = ({ task: { name, course }, days }) => {
  const label = days < 0 ? `Terlambat ${-days} hari` : days === 0 ? 'Tenggat hari ini' : `${days} hari lagi`;
  const badge = days < 0 ? 'late' : days === 0 ? 'today' : '';
  return `<div class="deadline-item"><div><strong>${escapeHTML(name)}</strong><small>${escapeHTML(course)}</small></div><span class="deadline-badge ${badge}">${label}</span></div>`;
};
