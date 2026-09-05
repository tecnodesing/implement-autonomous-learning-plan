"use client";

import { useEffect, useMemo, useState } from "react";
import type { DaySession, Exercise } from "@/lib/curriculum";
import type { DayProgress } from "./PlatformClient";

type Props = {
  day: DaySession;
  progress: DayProgress;
  onSave: (patch: Partial<DayProgress>) => void;
};

type Feedback = {
  score: number;
  total: number;
  correctIdx: Set<number>;
  messages: string[];
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function ExerciseRunner({ day, progress, onSave }: Props) {
  const exercise = day.exercise;
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [seed, setSeed] = useState(0); // used to force shuffle reset

  useEffect(() => {
    setAnswers({});
    setFeedback(null);
    setSeed((s) => s + 1);
  }, [day.id]);

  const shuffledMatchRight = useMemo(() => {
    if (!exercise || exercise.type !== "match") return [];
    return shuffle(exercise.pairs.map((p) => p.right));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day.id, seed, exercise?.type]);

  const shuffledLogic = useMemo(() => {
    if (!exercise || exercise.type !== "logic") return [];
    return shuffle(exercise.steps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day.id, seed, exercise?.type]);

  if (!exercise) {
    return (
      <div className="fade-in text-xs text-slate-400 mt-4 text-center">
        Ejercicio interactivo no disponible para este día. Usa la sección «Ejercicios
        Adicionales» de la cuartilla y guarda tu evidencia por escrito.
      </div>
    );
  }

  const verify = () => {
    const fb = evaluate(exercise, answers);
    setFeedback(fb);
    onSave({
      exerciseAnswers: answers,
      exerciseScore: fb.score,
      exerciseTotal: fb.total,
    });
  };

  const retry = () => {
    setAnswers({});
    setFeedback(null);
    setSeed((s) => s + 1);
  };

  return (
    <div className="flex flex-col gap-3 fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
          {exercise.title}
        </h3>
        <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
          {feedback ? `${feedback.score}/${feedback.total}` : `0/${totalOf(exercise)}`}
        </span>
      </div>

      {exercise.type === "quiz" && (
        <div className="space-y-3">
          {exercise.questions.map((q, i) => {
            const val = answers[`q${i}`];
            const isCorrect = feedback?.correctIdx.has(i);
            return (
              <div
                key={i}
                className={`bg-slate-950 p-3 rounded-lg border text-xs space-y-2 ${
                  feedback
                    ? isCorrect
                      ? "border-emerald-700"
                      : "border-rose-700"
                    : "border-slate-800"
                }`}
              >
                <p className="font-medium text-slate-100">
                  {i + 1}. {q.q}
                </p>
                <div className="grid grid-cols-1 gap-1">
                  {q.opts.map((o, j) => (
                    <label
                      key={j}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer border transition text-slate-300 ${
                        val === j
                          ? "bg-amber-900/30 border-amber-700"
                          : "border-transparent hover:bg-slate-900"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${i}`}
                        checked={val === j}
                        onChange={() => setAnswers((a) => ({ ...a, [`q${i}`]: j }))}
                        className="accent-amber-500"
                      />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
                {feedback && !isCorrect && q.exp && (
                  <p className="text-[11px] text-rose-300 border-t border-rose-900/50 pt-2">
                    <i className="fa-solid fa-circle-info" /> {q.exp}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {exercise.type === "match" && (
        <div className="space-y-2">
          <p className="text-[11px] text-slate-400 mb-1">
            Elige el destino correcto para cada elemento:
          </p>
          {exercise.pairs.map((p, i) => {
            const val = (answers[`m${i}`] as string) ?? "";
            const isCorrect = feedback?.correctIdx.has(i);
            return (
              <div
                key={i}
                className={`bg-slate-950 p-2.5 rounded border text-xs flex items-center gap-2 ${
                  feedback
                    ? isCorrect
                      ? "border-emerald-700"
                      : "border-rose-700"
                    : "border-slate-800"
                }`}
              >
                <span className="flex-1 font-mono text-indigo-300 truncate" title={p.left}>
                  {p.left}
                </span>
                <select
                  value={val}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, [`m${i}`]: e.target.value }))
                  }
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:border-amber-500 outline-none max-w-[55%]"
                >
                  <option value="">— elige —</option>
                  {shuffledMatchRight.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      )}

      {exercise.type === "typing" && (
        <TypingChallenge
          exercise={exercise}
          value={(answers.typed as string) ?? ""}
          onChange={(v) => setAnswers((a) => ({ ...a, typed: v }))}
        />
      )}

      {exercise.type === "logic" && (
        <div className="space-y-2">
          <p className="text-[11px] text-slate-300">{exercise.instructions}</p>
          {exercise.steps.map((_, i) => {
            const val = (answers[`l${i}`] as string) ?? "";
            const isCorrect = feedback?.correctIdx.has(i);
            return (
              <div
                key={i}
                className={`bg-slate-950 p-2 rounded border text-xs flex items-center gap-2 ${
                  feedback
                    ? isCorrect
                      ? "border-emerald-700"
                      : "border-rose-700"
                    : "border-slate-800"
                }`}
              >
                <span className="font-bold text-amber-400 w-5 shrink-0">{i + 1}.</span>
                <select
                  value={val}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, [`l${i}`]: e.target.value }))
                  }
                  className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:border-amber-500 outline-none"
                >
                  <option value="">— elige paso —</option>
                  {shuffledLogic.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      )}

      {feedback && (
        <div
          className={`mt-1 p-3 rounded-lg text-xs border ${
            feedback.score === feedback.total
              ? "bg-emerald-950/30 border-emerald-700 text-emerald-200"
              : "bg-amber-950/30 border-amber-700 text-amber-200"
          }`}
        >
          <p className="font-bold">
            {feedback.score === feedback.total
              ? "¡Evaluación aprobada!"
              : "Revisión requerida"}
            {" · "}
            {feedback.score}/{feedback.total}
          </p>
          {feedback.messages.map((m, i) => (
            <p key={i} className="mt-1 text-slate-200">
              {m}
            </p>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1">
        {!feedback && (
          <button
            onClick={verify}
            className="flex-1 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold py-2 rounded-lg transition"
          >
            <i className="fa-solid fa-circle-check" /> Verificar
          </button>
        )}
        {feedback && (
          <button
            onClick={retry}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold py-2 rounded-lg transition"
          >
            <i className="fa-solid fa-rotate-right" /> Reintentar
          </button>
        )}
      </div>
    </div>
  );
}

function TypingChallenge({
  exercise,
  value,
  onChange,
}: {
  exercise: Extract<Exercise, { type: "typing" }>;
  value: string;
  onChange: (v: string) => void;
}) {
  const [start, setStart] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [start]);

  const target = exercise.text;
  let correct = 0;
  for (let k = 0; k < Math.min(value.length, target.length); k++) {
    if (value[k] === target[k]) correct++;
  }
  const acc = value.length ? Math.round((correct / value.length) * 100) : 0;
  const elapsedMin = start ? ((now ?? Date.now()) - start) / 60000 : 0;
  const wpm = elapsedMin > 0 ? Math.round(value.length / 5 / elapsedMin) : 0;
  const elapsedS = start ? Math.floor(((now ?? Date.now()) - start) / 1000) : 0;

  return (
    <div className="space-y-2">
      <div className="bg-slate-950 p-3 rounded border border-slate-800 text-xs font-mono text-slate-400 whitespace-pre-wrap">
        {target}
      </div>
      <textarea
        value={value}
        onChange={(e) => {
          if (!start) setStart(Date.now());
          onChange(e.target.value);
        }}
        rows={4}
        placeholder="Escribe exactamente el texto de arriba…"
        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-200 font-mono focus:border-amber-500 outline-none resize-none"
      />
      <div className="flex justify-between text-[11px] text-slate-400">
        <span className="font-mono">
          {Math.floor(elapsedS / 60)
            .toString()
            .padStart(2, "0")}
          :{(elapsedS % 60).toString().padStart(2, "0")}
        </span>
        <span className="font-mono">
          WPM: <strong className="text-slate-200">{wpm}</strong> · Precisión:{" "}
          <strong className="text-slate-200">{acc}%</strong>
          {exercise.targetWPM ? ` · Meta: ${exercise.targetWPM} WPM` : ""}
        </span>
      </div>
    </div>
  );
}

function totalOf(ex: Exercise): number {
  if (ex.type === "quiz") return ex.questions.length;
  if (ex.type === "match") return ex.pairs.length;
  if (ex.type === "logic") return ex.steps.length;
  if (ex.type === "typing") return 1;
  return 0;
}

function evaluate(ex: Exercise, answers: Record<string, unknown>): Feedback {
  const correctIdx = new Set<number>();
  const messages: string[] = [];
  let score = 0;
  let total = totalOf(ex);

  if (ex.type === "quiz") {
    ex.questions.forEach((q, i) => {
      if (answers[`q${i}`] === q.correct) {
        score++;
        correctIdx.add(i);
      }
    });
    if (score < total) messages.push("Revisa las preguntas marcadas en rojo y su explicación.");
  } else if (ex.type === "match") {
    ex.pairs.forEach((p, i) => {
      if (answers[`m${i}`] === p.right) {
        score++;
        correctIdx.add(i);
      }
    });
    messages.push(
      score === total
        ? "¡Todas las rutas coinciden correctamente!"
        : "La jerarquía de archivos es estricta. Revisa las parejas incorrectas."
    );
  } else if (ex.type === "logic") {
    ex.steps.forEach((s, i) => {
      if (answers[`l${i}`] === s) {
        score++;
        correctIdx.add(i);
      }
    });
    messages.push(
      score === total
        ? "Secuencia lógica perfecta. Así funciona un algoritmo."
        : "El orden altera el resultado. Revisa la dependencia entre pasos."
    );
  } else if (ex.type === "typing") {
    total = 1;
    const typed = (answers.typed as string) ?? "";
    const target = ex.text;
    let correct = 0;
    for (let k = 0; k < Math.min(typed.length, target.length); k++) {
      if (typed[k] === target[k]) correct++;
    }
    const acc = typed.length ? Math.round((correct / typed.length) * 100) : 0;
    const passLen = typed.length >= target.length * 0.9;
    if (acc >= 85 && passLen) {
      score = 1;
      correctIdx.add(0);
      messages.push("¡Excelente precisión! Cumple el umbral profesional.");
    } else {
      messages.push(
        `Precisión: ${acc}% (meta ≥85%). Longitud: ${typed.length}/${target.length}. Practica sin mirar el teclado.`
      );
    }
  }

  return { score, total, correctIdx, messages };
}
