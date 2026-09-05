"use client";

import type { DaySession } from "@/lib/curriculum";
import type { DayProgress } from "./PlatformClient";

type Props = {
  day: DaySession;
  progress: DayProgress;
  onToggleCompleted: () => void;
  onToggleStep: (idx: number) => void;
};

function SectionHeader({
  n,
  label,
  color,
}: {
  n: string;
  label: string;
  color: "indigo" | "emerald" | "amber" | "rose" | "sky" | "fuchsia";
}) {
  const colors: Record<string, string> = {
    indigo: "text-indigo-400 bg-indigo-950 border-indigo-800",
    emerald: "text-emerald-400 bg-emerald-950 border-emerald-800",
    amber: "text-amber-400 bg-amber-950 border-amber-800",
    rose: "text-rose-400 bg-rose-950 border-rose-800",
    sky: "text-sky-400 bg-sky-950 border-sky-800",
    fuchsia: "text-fuchsia-400 bg-fuchsia-950 border-fuchsia-800",
  };
  return (
    <h2 className="text-[11px] font-bold font-mono uppercase tracking-wider mb-2 flex items-center gap-2 text-slate-300">
      <span
        className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] border ${colors[color]}`}
      >
        {n}
      </span>
      {label}
    </h2>
  );
}

export function CuartillaView({ day, progress, onToggleCompleted, onToggleStep }: Props) {
  const done = progress.completed === 1;

  return (
    <article className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl fade-in">
      {/* Header */}
      <header className="border-b border-slate-800 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="min-w-0">
          <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest font-semibold">
            Cuartilla Autónoma · Semana {day.week} · Día {day.day}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100 mt-1">{day.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            <i className="fa-regular fa-clock" /> {day.duration} min · Entregable:{" "}
            <code className="text-indigo-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
              {day.file}
            </code>
          </p>
        </div>
        <button
          onClick={onToggleCompleted}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-2 transition shrink-0 ${
            done
              ? "bg-emerald-950 border-emerald-600 text-emerald-300"
              : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <i className="fa-solid fa-check" /> {done ? "Completada" : "Marcar Completada"}
        </button>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-slate-300">
        {/* 2. Objetivo */}
        <section>
          <SectionHeader n="2" label="Objetivo de la práctica" color="indigo" />
          <div className="bg-indigo-950/30 border border-indigo-900/50 p-4 rounded-lg text-indigo-100">
            {day.objective}
          </div>
        </section>

        {/* 3. Para qué me sirve */}
        <section>
          <SectionHeader n="3" label="¿Para qué me sirve?" color="sky" />
          <ul className="space-y-1.5 pl-1">
            {day.purpose.map((p, i) => (
              <li key={i} className="flex gap-2">
                <i className="fa-solid fa-caret-right text-sky-400 mt-1" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Materiales */}
        <section>
          <SectionHeader n="4" label="Materiales necesarios" color="fuchsia" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
            {day.materials.map((m, i) => (
              <li
                key={i}
                className="bg-slate-950/50 border border-slate-800 rounded px-2.5 py-1.5 flex items-center gap-2"
              >
                <i className="fa-solid fa-box-open text-fuchsia-400" />
                {m}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Lo que debes saber */}
        <section>
          <SectionHeader n="5" label="Lo que debes saber antes de practicar" color="amber" />
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 space-y-3">
            <p>
              <strong className="text-amber-300">Concepto:</strong> {day.concept}
            </p>
            {day.analogies.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-amber-300 mb-1">
                  Ejemplos de la vida diaria:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  {day.analogies.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-amber-300 mb-1">Vocabulario:</p>
              <ul className="space-y-1 text-xs">
                {day.vocabulary.map((v, i) => (
                  <li key={i}>
                    <strong className="text-slate-100">{v.term}:</strong> {v.def}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-slate-800 pt-3">
              <p className="text-xs font-semibold text-amber-300 mb-1">
                Preguntas de comprensión (contéstalas ANTES de continuar):
              </p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                {day.comprehensionQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 6. Repaso */}
        <section>
          <SectionHeader n="6" label="1) Repaso (10 min)" color="indigo" />
          <ol className="space-y-1.5 bg-slate-950/40 p-4 rounded-lg border border-slate-800 text-xs list-decimal list-inside">
            {day.review.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ol>
        </section>

        {/* 7. Explora y Aprende */}
        <section>
          <SectionHeader n="7" label="2) Explora y Aprende (25 min)" color="emerald" />
          <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-lg text-emerald-100 text-xs whitespace-pre-line">
            {day.theory}
          </div>
          <ul className="mt-3 space-y-1.5 text-xs">
            {day.worked.map((w, i) => (
              <li key={i} className="flex gap-2">
                <i className="fa-solid fa-flask text-emerald-400 mt-0.5" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Práctica guiada paso a paso */}
        <section>
          <SectionHeader n="8" label="3) Práctica Guiada Paso a Paso (35 min)" color="emerald" />
          <div className="space-y-3">
            {day.steps.map((s, i) => {
              const checked = progress.stepsChecks?.[i] ?? false;
              return (
                <div
                  key={i}
                  className={`border rounded-lg p-3 transition ${
                    checked
                      ? "bg-emerald-950/30 border-emerald-800"
                      : "bg-slate-950/50 border-slate-800"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleStep(i)}
                      className={`w-6 h-6 mt-0.5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 border ${
                        checked
                          ? "bg-emerald-500 text-white border-emerald-400"
                          : "bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700"
                      }`}
                      aria-label={`Marcar paso ${i + 1}`}
                    >
                      {checked ? <i className="fa-solid fa-check" /> : i + 1}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-100 text-xs">{s.title}</p>
                      <ol className="mt-2 space-y-1 text-xs text-slate-300 list-decimal list-inside">
                        {s.substeps.map((ss, j) => (
                          <li key={j}>{ss}</li>
                        ))}
                      </ol>
                      <p className="mt-2 text-xs text-emerald-300">
                        <i className="fa-solid fa-eye" /> <strong>Verifica:</strong> {s.verify}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. Aplicación a Preparatoria */}
        <section>
          <SectionHeader n="9" label="4) Aplicación a Materias de Preparatoria (15 min)" color="amber" />
          <div className="bg-amber-950/20 border border-amber-900/40 p-4 rounded-lg space-y-2">
            <p className="text-xs text-amber-100">
              <strong>Contexto:</strong> {day.schoolApp.context}
            </p>
            <ol className="list-decimal list-inside text-xs text-amber-100 space-y-1">
              {day.schoolApp.tasks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
            <p className="text-xs text-amber-300">
              <i className="fa-solid fa-flag-checkered" /> <strong>Producto:</strong>{" "}
              {day.schoolApp.product}
            </p>
          </div>
        </section>

        {/* 10. Cierre */}
        <section>
          <SectionHeader n="10" label="5) Cierre, Guardado y Bitácora (5 min)" color="indigo" />
          <ol className="text-xs list-decimal list-inside space-y-1 bg-slate-950/40 border border-slate-800 rounded-lg p-4">
            {day.closure.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ol>
        </section>

        {/* 11. Ejercicios adicionales */}
        <section>
          <SectionHeader n="11" label="Ejercicios Prácticos Adicionales" color="rose" />
          <div className="space-y-2">
            {day.extraExercises.map((ex, i) => (
              <div
                key={i}
                className="bg-rose-950/20 border border-rose-900/40 rounded-lg p-3 text-xs"
              >
                <p className="font-semibold text-rose-200 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-rose-900/50 text-rose-300 font-mono">
                    N{ex.level}
                  </span>
                  {ex.title}
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-rose-100">
                  {ex.instructions.map((ins, k) => (
                    <li key={k}>{ins}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 12. Reto */}
        <section>
          <SectionHeader n="12" label="Reto de Aplicación" color="fuchsia" />
          <div className="bg-fuchsia-950/20 border border-fuchsia-900/50 rounded-lg p-4 text-xs">
            <p className="font-bold text-fuchsia-200">{day.challenge.title}</p>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-fuchsia-100">
              {day.challenge.instructions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ol>
            <p className="mt-3 text-fuchsia-300 border-t border-fuchsia-900/50 pt-2">
              <i className="fa-solid fa-trophy" /> <strong>Criterio de éxito:</strong>{" "}
              {day.challenge.success}
            </p>
          </div>
        </section>

        <footer className="border-t border-slate-800 pt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            Guardar en:{" "}
            <code className="text-slate-300">Prepa_Ruben/05_Computacion/Tareas</code>
          </span>
          <span className="font-mono">UTF-8 · 90 min</span>
        </footer>
      </div>
    </article>
  );
}
