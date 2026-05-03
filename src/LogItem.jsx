export default function LogItem({
  item,
  onDelete,
  onEdit,
  isEditing
}) {
  return (
    <li
      className={`rounded-xl p-4 shadow-sm transition ${
        isEditing
          ? "bg-amber-50 dark:bg-amber-900/30"
          : "bg-slate-50 dark:bg-slate-700"
      }`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {item.date}
          </p>

          <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {item.subject}
          </p>

          <p className="text-slate-700 dark:text-slate-200">
            {item.minutes}分
          </p>

          <p className="text-slate-600 dark:text-slate-300">
            {item.note || "メモなし"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
            onClick={() => onEdit(item)}
          >
            編集
          </button>

          <button
            className="self-start rounded-lg bg-rose-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
            onClick={() => onDelete(item.id)}
          >
            削除
          </button>
        </div>
      </div>
    </li>
  );
}