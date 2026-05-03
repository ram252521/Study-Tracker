export default function Summary({
  totalCount,
  totalMinutes,
  todayMinutes,
  remainingMinutes,
  subjectTotals,
}) {
  return (
    <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-700">
      <h2 className="text-lg font-semibold text-slate-700 dark:!text-slate-100">
        集計
      </h2>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">記録数</p>
          <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-slate-100">
            {totalCount}件
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">合計時間</p>
          <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-slate-100">
            {totalMinutes}分
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            今日の勉強時間
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-slate-100">
            {todayMinutes}分
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">目標まで</p>
          <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-slate-100">
            {remainingMinutes > 0 ? `${remainingMinutes}分` : "達成！"}
          </p>
        </div>

        <div className="mt-4 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800 md:col-span-3">
          <h3 className="mb-3 text-lg font-semibold text-slate-700 dark:text-slate-100">
            科目ごとの合計時間
          </h3>

          {Object.keys(subjectTotals).length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              記録がありません
            </p>
          ) : (
            <ul className="space-y-2 text-slate-700 dark:text-slate-200">
              {Object.entries(subjectTotals).map(([subject, total]) => (
                <li
                  key={subject}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-600"
                >
                  <span className="text-slate-700 dark:text-slate-200">
                    {subject}
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-100">
                    {total}分
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}