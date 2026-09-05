"use client";

import { useEffect, useState } from "react";
import type { DaySession } from "@/lib/curriculum";
import type { DayProgress } from "./PlatformClient";
import { ExerciseRunner } from "./ExerciseRunner";

type TabId = "checklist" | "selfeval" | "rubric" | "bitacora" | "exercise";

type Props = {
  day: DaySession;
  progress: DayProgress;
  onSave: (patch: Partial<DayProgress>) => void;
};

const SPN_LABEL: Record<string, string> = { S: "Sí", P: "Parc.", N: "No" };
const SPN_COLOR: Record<string, string> = {
  S: "bg-emerald-600 text-white border-emerald-500",
  P: "bg-amber-600 text-white border-amber-500",
  N: "bg-rose-600 text-white border-rose-500",
};

export function RightPanel({ day, progress, onSave }: Props) {
  const [tab, setTab] = useState<TabId>("checklist");
  const [bitacora, setBitacora] = useState(progress.bitacora ?? "");
  const [reflection, setReflection] = useState(progress.reflection ?? "");

  useEffect(() => {
    setBitacora(progress.bitacora ?? "");
    setReflection(progress.reflection ?? "");
  }, [progress.dayId, progress.bitacora, progress.reflection]);

  const tabs: { id: TabId; label: string; icon: string; color: string }[] = [
    { id: "checklist", label: "Checklist", icon: "fa-list-check", color: "text-indigo-400" },
    { id: "selfeval", label: "Autoeval.", icon: "fa-user-check", color: "text-sky-400" },
    { id: "rubric", label: "Rúbrica", icon: "fa-clipboard-check", color: "text-emerald-400" },
    { id: "bitacora", label: "Bitácora", icon: "fa-book", color: "text-fuchsia-400" },
    { id: "exercise", label: "Práctica", icon: "fa-dumbbell", color: "text-amber-400" },
  ];

  const totalRubric = day.rubric.reduce((a, r) => a + r.maxPts, 0);
  const scoredRubric = (progress.rubricScores ?? []).reduce((a, n) => a + (n || 0), 0);

  const selfEvalOK = (progress.selfEval ?? []).filter((v) => v === "S").length;

  return (
    <aside className="w-full lg:w-105 max-h-[min(62vh,680px)] lg:max-h-none border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/60 flex flex-col shrink-0">
      <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-900 text-[11px]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-w-23 flex-1 py-2.5 font-semibold flex items-center justify-center gap-1.5 transition ${
              tab === t.id
                ? `${t.color} border-b-2 border-current`
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <i className={`fa-solid ${t.icon}`} />
            <span className="hidden lg:inline">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {tab === "checklist" && (
          <div className="space-y-2 fade-in">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
              Criterios de Éxito
            </h3>
            {day.checklist.map((c, i) => {
              const ok = (progress.checklist ?? [])[i] ?? false;
              return (
                <label
                  key={i}
                  className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs cursor-pointer hover:border-indigo-700 transition"
                >
                  <input
                    type="checkbox"
                    checked={ok}
                    onChange={() => {
                      const arr = [...(progress.checklist ?? [])];
                      while (arr.length < day.checklist.length) arr.push(false);
                      arr[i] = !arr[i];
                      onSave({ checklist: arr });
                    }}
                    className="mt-0.5 accent-indigo-500"
                  />
                  <span className={ok ? "line-through text-slate-500" : "text-slate-200"}>{c}</span>
                </label>
              );
            })}
          </div>
        )}

        {tab === "selfeval" && (
          <div className="space-y-3 fade-in">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300">
                Autoevaluación
              </h3>
              <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                {selfEvalOK}/{day.selfEval.length} en «Sí»
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">
              Marca Sí (S), Parcialmente (P) o No (N). Sé honesto.
            </p>
            {day.selfEval.map((item, i) => {
              const val = (progress.selfEval ?? [])[i] ?? "";
              return (
                <div
                  key={i}
                  className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-2"
                >
                  <p className="text-xs text-slate-200">
                    <span className="text-sky-400 font-mono mr-1">{i + 1}.</span>
                    {item.text}
                  </p>
                  <div className="flex gap-1">
                    {(["S", "P", "N"] as const).map((letter) => (
                      <button
                        key={letter}
                        onClick={() => {
                          const arr = [...(progress.selfEval ?? [])];
                          while (arr.length < day.selfEval.length) arr.push("");
                          arr[i] = val === letter ? "" : letter;
                          onSave({ selfEval: arr });
                        }}
                        className={`flex-1 py-1 rounded border text-[11px] font-bold transition ${
                          val === letter
                            ? SPN_COLOR[letter]
                            : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                        }`}
                      >
                        {SPN_LABEL[letter]}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="pt-2">
              <label className="text-[11px] font-semibold text-sky-300 uppercase">
                Reflexión final (párrafo obligatorio)
              </label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                onBlur={() => onSave({ reflection })}
                rows={4}
                placeholder="¿Qué acción específica realizaré para mejorar los ítems marcados con P o N?"
                className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono resize-none"
              />
            </div>
          </div>
        )}

        {tab === "rubric" && (
          <div className="space-y-3 fade-in">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Evaluación · Lista de Cotejo
              </h3>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                  scoredRubric >= Math.round(totalRubric * 0.75)
                    ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                    : scoredRubric >= Math.round(totalRubric * 0.5)
                      ? "bg-amber-950 text-amber-300 border-amber-800"
                      : "bg-rose-950 text-rose-300 border-rose-800"
                }`}
              >
                {scoredRubric}/{totalRubric} pts
              </span>
            </div>
            {day.rubric.map((r, i) => {
              const val = (progress.rubricScores ?? [])[i] ?? 0;
              const buttons: { pts: number; label: string; color: string }[] = [
                { pts: 0, label: "Reforzar", color: "bg-rose-600" },
                { pts: Math.round(r.maxPts / 2), label: "En proceso", color: "bg-amber-600" },
                { pts: r.maxPts, label: "Logrado", color: "bg-emerald-600" },
              ];
              return (
                <div
                  key={i}
                  className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2"
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-xs font-semibold text-slate-100">
                      {i + 1}. {r.criterion}
                    </p>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {val}/{r.maxPts}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    <i className="fa-regular fa-file-lines" /> {r.evidence}
                  </p>
                  <div className="text-[10px] space-y-0.5 text-slate-400 border-l-2 border-slate-800 pl-2">
                    <p>
                      <strong className="text-emerald-400">Logrado:</strong> {r.logrado}
                    </p>
                    <p>
                      <strong className="text-amber-400">En proceso:</strong> {r.enProceso}
                    </p>
                    <p>
                      <strong className="text-rose-400">Reforzar:</strong> {r.reforzar}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {buttons.map((b) => (
                      <button
                        key={b.label}
                        onClick={() => {
                          const arr = [...(progress.rubricScores ?? [])];
                          while (arr.length < day.rubric.length) arr.push(0);
                          arr[i] = arr[i] === b.pts ? 0 : b.pts;
                          onSave({ rubricScores: arr });
                        }}
                        className={`flex-1 py-1 rounded text-[10px] font-semibold border transition ${
                          val === b.pts
                            ? `${b.color} text-white border-transparent`
                            : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                        }`}
                      >
                        {b.label} ({b.pts})
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px]">
              <p className="font-semibold text-slate-200 mb-1">Escala de logro:</p>
              <ul className="space-y-0.5 text-slate-400">
                <li>
                  <span className="text-emerald-400">
                    {Math.round(totalRubric * 0.9)}–{totalRubric}:
                  </span>{" "}
                  Excelencia
                </li>
                <li>
                  <span className="text-emerald-400">
                    {Math.round(totalRubric * 0.75)}–{Math.round(totalRubric * 0.89)}:
                  </span>{" "}
                  Logrado
                </li>
                <li>
                  <span className="text-amber-400">
                    {Math.round(totalRubric * 0.5)}–{Math.round(totalRubric * 0.74)}:
                  </span>{" "}
                  En proceso
                </li>
                <li>
                  <span className="text-rose-400">0–{Math.round(totalRubric * 0.49)}:</span>{" "}
                  Reforzar
                </li>
              </ul>
              <p className="mt-2 text-slate-300 border-t border-slate-800 pt-2">
                <i className="fa-solid fa-star text-amber-400" />{" "}
                <strong>Regla de oro:</strong> ≥ 75% en rúbrica y ≥ 7 «Sí» en autoevaluación
                = sesión lograda.
              </p>
            </div>
          </div>
        )}

        {tab === "bitacora" && (
          <div className="flex flex-col gap-2 fade-in h-full">
            <label className="text-xs font-semibold text-fuchsia-300">
              Bitácora del día — 6 elementos:
            </label>
            <p className="text-[10px] text-slate-400 leading-snug">
              Fecha · Semana/Día · Tema · Qué aprendí · Qué se me dificultó · Qué haré mejor.
            </p>
            <textarea
              value={bitacora}
              onChange={(e) => setBitacora(e.target.value)}
              onBlur={() => onSave({ bitacora })}
              rows={16}
              placeholder="Escribe tu bitácora aquí. Se guarda automáticamente al salir del campo."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500 font-mono resize-none custom-scrollbar"
            />
            <button
              onClick={() => onSave({ bitacora })}
              className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-floppy-disk" /> Guardar Bitácora
            </button>
          </div>
        )}

        {tab === "exercise" && (
          <ExerciseRunner day={day} progress={progress} onSave={onSave} />
        )}
      </div>
    </aside>
  );
}
