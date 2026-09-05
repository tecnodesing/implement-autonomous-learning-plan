"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DaySession } from "@/lib/curriculum";
import { CuartillaView } from "./CuartillaView";
import { RightPanel } from "./RightPanel";

type DayProgressRow = {
  id: number;
  studentId: number;
  dayId: number;
  completed: number;
  checklist: boolean[];
  stepsChecks: boolean[];
  selfEval: string[];
  rubricScores: number[];
  bitacora: string;
  reflection: string;
  exerciseAnswers: Record<string, unknown>;
  exerciseScore: number;
  exerciseTotal: number;
};

export type DayProgress = DayProgressRow;

const MONTH_LABELS = ["M1 · Sep", "M2 · Oct", "M3 · Nov", "M4 · Dic"];
const STORAGE_KEY = "ruben-devacademy-progress-v1";

export function PlatformClient({ curriculum }: { curriculum: DaySession[] }) {
  const [activeMonth, setActiveMonth] = useState(1);
  const [currentDayId, setCurrentDayId] = useState(1);
  const [progressByDay, setProgressByDay] = useState<Record<number, DayProgress>>({});
  const [loaded, setLoaded] = useState(false);

  // Timer
  const [remaining, setRemaining] = useState(90 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentDay = useMemo(
    () => curriculum.find((d) => d.id === currentDayId) ?? curriculum[0],
    [curriculum, currentDayId]
  );

  const currentProgress: DayProgress = useMemo(() => {
    return (
      progressByDay[currentDayId] ?? {
        id: 0,
        studentId: 0,
        dayId: currentDayId,
        completed: 0,
        checklist: new Array(currentDay.checklist.length).fill(false),
        stepsChecks: new Array(currentDay.steps.length).fill(false),
        selfEval: new Array(currentDay.selfEval.length).fill(""),
        rubricScores: new Array(currentDay.rubric.length).fill(0),
        bitacora: "",
        reflection: "",
        exerciseAnswers: {},
        exerciseScore: 0,
        exerciseTotal: 0,
      }
    );
  }, [progressByDay, currentDayId, currentDay]);

  // Load progress locally so the platform works without a database or network.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<number, DayProgress>;
        if (parsed && typeof parsed === "object") {
          setProgressByDay(parsed);
        }
      }
    } catch (e) {
      console.warn("No se pudo cargar el progreso local:", e);
    } finally {
      setLoaded(true);
    }
  }, []);

  const persist = useCallback((dayId: number, patch: Partial<DayProgress>) => {
    setProgressByDay((prev) => {
      const base =
        prev[dayId] ??
        ({
          id: 0,
          studentId: 0,
          dayId,
          completed: 0,
          checklist: [],
          stepsChecks: [],
          selfEval: [],
          rubricScores: [],
          bitacora: "",
          reflection: "",
          exerciseAnswers: {},
          exerciseScore: 0,
          exerciseTotal: 0,
        } as DayProgress);
      const next = { ...prev, [dayId]: { ...base, ...patch } };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn("No se pudo guardar el progreso local:", e);
      }
      return next;
    });
  }, []);

  // Timer logic
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 0) {
            setRunning(false);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const resetTimer = () => {
    setRunning(false);
    setRemaining(90 * 60);
  };

  const timerPhase = useMemo(() => {
    const elapsed = 90 * 60 - remaining;
    if (elapsed < 10 * 60) return "F1: Repaso (10m)";
    if (elapsed < 35 * 60) return "F2: Explora (25m)";
    if (elapsed < 70 * 60) return "F3: Práctica (35m)";
    if (elapsed < 85 * 60) return "F4: Aplicación (15m)";
    return "F5: Cierre (5m)";
  }, [remaining]);

  const timerDisplay = useMemo(() => {
    const m = Math.floor(remaining / 60)
      .toString()
      .padStart(2, "0");
    const s = (remaining % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [remaining]);

  const globalCompletion = useMemo(() => {
    const total = curriculum.length;
    const done = Object.values(progressByDay).filter((p) => p.completed === 1).length;
    return Math.round((done / total) * 100);
  }, [progressByDay, curriculum]);

  const streak = useMemo(
    () => Object.values(progressByDay).filter((p) => p.completed === 1).length,
    [progressByDay]
  );

  const daysInMonth = useMemo(
    () => curriculum.filter((d) => d.month === activeMonth),
    [curriculum, activeMonth]
  );

  const exportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      progress: progressByDay,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Ruben_Progreso_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col lg:h-screen lg:flex-row lg:overflow-hidden bg-slate-950 text-slate-100">
      {/* SIDEBAR */}
      <aside className="w-full max-h-[42vh] lg:max-h-none lg:w-80 bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col z-20 shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
              <i className="fa-solid fa-terminal" /> Rubén DevAcademy
            </h1>
            <p className="text-xs text-slate-400">Prep-to-Code · Plan Autónomo</p>
          </div>
          <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30 font-mono">
            {globalCompletion}%
          </span>
        </div>

        <div className="p-2 grid grid-cols-4 gap-1 bg-slate-950/40 border-b border-slate-800 text-xs">
          {MONTH_LABELS.map((label, i) => (
            <button
              key={label}
              onClick={() => setActiveMonth(i + 1)}
              className={`py-1.5 rounded text-center font-semibold ${
                activeMonth === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {daysInMonth.map((day) => {
            const p = progressByDay[day.id];
            const done = p?.completed === 1;
            const isCurrent = day.id === currentDayId;
            return (
              <button
                key={day.id}
                onClick={() => setCurrentDayId(day.id)}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition flex items-center justify-between group ${
                  isCurrent
                    ? "bg-indigo-600/30 border border-indigo-500 text-white font-medium"
                    : "bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                      isCurrent
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    S{day.week}-D{day.day}
                  </span>
                  <span className="truncate">{day.title}</span>
                </div>
                <i
                  className={`text-xs ${
                    done
                      ? "fa-solid fa-circle-check text-emerald-400"
                      : "fa-regular fa-circle text-slate-600"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex justify-between items-center">
          <span>
            <i className="fa-solid fa-fire text-amber-500" /> Sesiones:{" "}
            <strong className="text-slate-200">{streak}</strong>
          </span>
          <button
            onClick={exportData}
            className="hover:text-indigo-400 transition"
            title="Exportar progreso"
          >
            <i className="fa-solid fa-download" /> Exportar
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0 flex flex-col lg:overflow-hidden bg-slate-950">
        <header className="min-h-16 border-b border-slate-800 bg-slate-900/40 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2 py-1 rounded-md text-[11px] font-mono font-semibold bg-indigo-950 text-indigo-400 border border-indigo-800 shrink-0">
              SEM {currentDay.week} · DÍA {currentDay.day}
            </span>
            <h2 className="font-bold text-slate-200 text-base truncate">
              {currentDay.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg shrink-0">
            <div className="text-right">
              <div className="font-mono text-sm font-bold text-emerald-400">
                {timerDisplay}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                {timerPhase}
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setRunning((r) => !r)}
                className={`w-7 h-7 rounded text-white flex items-center justify-center text-xs transition ${
                  running ? "bg-amber-600 hover:bg-amber-500" : "bg-indigo-600 hover:bg-indigo-500"
                }`}
                aria-label={running ? "Pausar" : "Iniciar"}
              >
                <i className={`fa-solid ${running ? "fa-pause" : "fa-play"}`} />
              </button>
              <button
                onClick={resetTimer}
                className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
                aria-label="Reiniciar"
              >
                <i className="fa-solid fa-rotate-right" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
          <section className="flex-1 min-w-0 lg:overflow-y-auto custom-scrollbar p-3 sm:p-4 lg:p-6">
            <div className="max-w-3xl mx-auto">
              {loaded ? (
                <CuartillaView
                  day={currentDay}
                  progress={currentProgress}
                  onToggleCompleted={() =>
                    persist(currentDay.id, {
                      completed: currentProgress.completed === 1 ? 0 : 1,
                    })
                  }
                  onToggleStep={(idx: number) => {
                    const arr = [...(currentProgress.stepsChecks ?? [])];
                    while (arr.length < currentDay.steps.length) arr.push(false);
                    arr[idx] = !arr[idx];
                    persist(currentDay.id, { stepsChecks: arr });
                  }}
                />
              ) : (
                <div className="text-slate-400 text-sm">Cargando cuartilla…</div>
              )}
            </div>
          </section>

          <RightPanel
            day={currentDay}
            progress={currentProgress}
            onSave={(patch: Partial<DayProgress>) => persist(currentDay.id, patch)}
          />
        </div>
      </main>
    </div>
  );
}
