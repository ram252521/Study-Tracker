import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function Graph({ subjectTotals }) {
  const data = Object.entries(subjectTotals).map(([subject, minutes]) => ({
    subject,
    minutes,
  }));

  if (data.length === 0) return null;

  return (
    <div className="w-full  ovar-flow-x-auto mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-700">
      <h2 className="mb-3 text-xl font-semibold text-slate-700 dark:!text-slate-100">
        科目別グラフ
      </h2>

      <BarChart width={250} height={220} data={data}>
        <defs>
          <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>

        <XAxis dataKey="subject" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="minutes"
          fill="url(#studyGradient)"
          r
          adius={[8, 8, 0, 0]}
        />
      </BarChart>
    </div>
  );
}
