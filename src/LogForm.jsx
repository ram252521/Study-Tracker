  export default function LogForm({
  subject,
  setSubject,
  minutes,
  setMinutes,
  note,
  date,
  setNote,
  setDate,
  onSubmit,
  onCancel,
  editingId,
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        editingId
          ? "bg-amber-50 dark:bg-amber-900/30"
          : "bg-slate-50 dark:bg-slate-700"
      }`}
    >
      <h2 className="mb-4 text-xl font-semibold text-slate-700 dark:!text-slate-100">
        {editingId ? "記録を編集" : "記録を追加"}
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          type="text"
          placeholder="科目"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          type="number"
          placeholder="分"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <input
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          type="text"
          placeholder="メモ"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <input
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          onClick={onSubmit}
        >
          {editingId ? "更新" : "追加"}
        </button>
        {editingId && (
          <button
            className="rounded-lg bg-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-400 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-500"
            onClick={onCancel}
          >
            キャンセル
          </button>
        )}
      </div>
    </div>
  );
}

