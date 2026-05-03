import { useState, useEffect } from "react";
import LogItem from "./LogItem";
import LogForm from "./LogForm";
import Summary from "./Summary";
import Graph from "./Graph";

export default function App() {
  //subject=今入力してる文字、setSubject=それを更新する関数
  const today = new Date().toISOString().slice(0, 10);

  const [subject, setSubject] = useState("");

  const [minutes, setMinutes] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(today);
  const [filterSubject, setFilterSubject] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [sortType, setSortType] = useState("newest");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  //itemsは追加された項目
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("studyLogs");
    //文字列になってるのでJSON.parseでオブジェクトに戻す
    return saved ? JSON.parse(saved) : []; //データがなければ空配列にする
  });

  //useEffectでitemsが変わるたび保存
  useEffect(() => {
    localStorage.setItem("studyLogs", JSON.stringify(items));
  }, [items]); //itemsに依存して保存が発動
  //useEffect=>((){itemsが変わるたびに処理したいこと},[items])

  const resetForm = () => {
    setSubject("");
    setMinutes("");
    setNote("");
    setDate(today);
    setEditingId(null);
  };

  //ボタンを押したときの処理
  const addItem = () => {
    //!subjectはsubjectがfalseなら、つまり空白はfalseなので処理終える
    if (!subject.trim()) return;
    if (!minutes) return;
    //↓最適化　if(Number(minutes) <=0) return;
    if (!minutes || Number(minutes) <= 0) return;
    if (!date) return;

    const newItem = {
      //左はオブジェクトの項目名、右はstateの中身
      id: Date.now(), //ランダムなID生成
      subject: subject.trim(), //subject:英語みたいに
      minutes: Number(minutes),
      note: note.trim(),
      date: date || new Date().toISOString().slice(0, 10),
      createdAt: new Date().toLocaleString(),
    }; //日時を文字列で保存

    //スプレッド構文で広げてその最後に項目を追加
    setItems([newItem, ...items]);
    //setItems(items.push)だとあかん
    //入力された後空にする
    resetForm();
  }; //ここまでaddItem、アロー関数なので見落とさないよう
  const deleteItem = (id) => {
    if (!window.confirm("削除しますか？")) return;
    setItems(items.filter((item) => item.id !== id)); //iがindexと同じならfalseになり消える
    if (editingId === id) {
      resetForm();
    }
  }; //もし編集中の項目を消したら編集中のIDもリセットする};
  //array.reduce((累積値, 今の要素) => 新しい累積値, 初期値)
  const totalMinutes = items.reduce((sum, item) => {
    return sum + item.minutes;
  }, 0);
  //0は初期値でitemの時間をsumに足して合計している
  //集計はstateにしなくていい
  const updateItem = () => {
    if (!subject.trim()) return;
    if (!minutes || Number(minutes) <= 0) return;
    if (!date) return;
    if (editingId === null) return;

    setItems(
      items.map((item) =>
        item.id === editingId
          ? {
              ...item,
              subject: subject.trim(),
              minutes: Number(minutes),
              note: note.trim(),
              date: date,
            }
          : item,
      ),
    );

    resetForm();
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      updateItem();
    } else {
      addItem();
    }
  };
  const startEdit = (item) => {
    setSubject(item.subject);
    setMinutes(item.minutes.toString());
    setNote(item.note);
    setDate(item.date);
    setEditingId(item.id);
  };

  const resetFilters = () => {
    setFilterSubject("all");
    setSearchText("");
    setSortType("newest");
  };

  const totalCount = items.length;

  const todayMinutes = items
    .filter((item) => item.date === today)
    .reduce((sum, item) => sum + item.minutes, 0);

  const goalMinutes = 180;
  const remainingMinutes = goalMinutes - todayMinutes;

  const subjectTotals = items.reduce((acc, item) => {
    if (!acc[item.subject]) {
      acc[item.subject] = 0; //もし科目がなければ作る
    }
    acc[item.subject] += item.minutes; //時間を足す

    return acc; //accは2週目以降も使い回すのでreturnしている
  }, {}); //{}で最初の点数入れる箱を作り、その後は足していく

  const uniqueSubjects = [...new Set(items.map((item) => item.subject))];

  const filteredBySubject =
    filterSubject === "all"
      ? items
      : items.filter((item) => item.subject === filterSubject); //filterはtrueのみ返す
  //item.subjectが英語だったらfilterは英語のみを表示

  const filteredItems = filteredBySubject.filter((item) => {
    //科目でフィルターかけてキーワードでさらにフィルター

    const keyword = searchText.trim().toLowerCase();

    if (!keyword) return true;
    return (
      item.subject.toLowerCase().includes(keyword) ||
      item.note.toLowerCase().includes(keyword) ||
      item.createdAt.toLowerCase().includes(keyword) ||
      (item.date || "").includes(keyword)
    );
  });

  const filterdBySearch = filteredBySubject.filter((item) => {
    const keyword = searchText.trim().toLowerCase();

    if (!keyword) return true;
    return (
      item.subject.toLowerCase().includes(keyword) ||
      item.note.toLowerCase().includes(keyword) ||
      item.createdAt.toLowerCase().includes(keyword) ||
      (item.date || "").includes(keyword)
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortType === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortType === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortType === "longest") {
      return b.minutes - a.minutes;
    } else if (sortType === "shortest") {
      return a.minutes - b.minutes;
    }
    return 0;
  });

  //ここからUI
  return (
    <>
      <div
        className={`${darkMode ? "dark" : ""} min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-8`}
      >
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mb-4 rounded-lg px-3 py-1 bg-slate-800 text-white dark:bg-white dark:text-black"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          <h1 className="mb-6 text-3xl font-bold text-slate-800 dark:!text-slate-100 ">
            Study Log
          </h1>

          <LogForm
            subject={subject}
            setSubject={setSubject}
            minutes={minutes}
            setMinutes={setMinutes}
            note={note}
            setNote={setNote}
            date={date}
            setDate={setDate}
            addItem={addItem}
            onSubmit={handleSubmit}
            editingId={editingId}
            onCancel={resetForm}
          />

          <Summary
            totalCount={totalCount}
            totalMinutes={totalMinutes}
            todayMinutes={todayMinutes}
            remainingMinutes={remainingMinutes}
            subjectTotals={subjectTotals}
          />
          <Graph subjectTotals={subjectTotals} />

          <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-700 p-4">
            <h2 className="mb-3 text-slate-700 dark:text-slate-100">
              絞り込み
            </h2>
            <div className="flex flex-col gap-3 md:flex-row">
              <select
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100
      text-slate-700 outline-none focus:border-blue-500"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                <option value="all">全部</option>
                {uniqueSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              <input
                className="flex-1 rounded-lg border border-slate-300
      dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 px-3 py-2 text-slate-700 outline-none focus:border-blue-500"
                type="text"
                placeholder="科目,メモ,日付で検索"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <p className="mt-3 text-sm text-slate-600">
              表示中: {sortedItems.length}件
            </p>
          </div>
          <div className="mt-6">
            <h2
              className="mb-3 text-xl font-semibold
            text-slate-700 dark:text-slate-100"
            >
              ログ一覧
            </h2>

            {sortedItems.length === 0 ? (
              <div
                className="border-dashed border-slate-300 py-10 
          bg-slate-50 dark:bg-slate-700 p-6 text-center text-slate-500"
              >
                ログが見つかりません
              </div>
            ) : (
              <ul className="space-y-3">
                {sortedItems.map((item) => (
                  <LogItem
                    key={item.id}
                    item={item}
                    onDelete={deleteItem}
                    onEdit={startEdit}
                    isEditing={editingId === item.id}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
