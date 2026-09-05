import { pgTable, serial, integer, text, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";

// Perfil único (para este caso: Rubén)
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Progreso por día: checklist, autoevaluación, evaluación rubrica, bitácora, ejercicios
export const dayProgress = pgTable("day_progress", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  dayId: integer("day_id").notNull(),
  completed: integer("completed").notNull().default(0), // 0/1
  checklist: jsonb("checklist").notNull().default([]), // bool[]
  stepsChecks: jsonb("steps_checks").notNull().default([]), // bool[] pasos práctica guiada
  selfEval: jsonb("self_eval").notNull().default([]), // 'S'|'P'|'N'[]
  rubricScores: jsonb("rubric_scores").notNull().default([]), // number[]
  bitacora: text("bitacora").notNull().default(""),
  reflection: text("reflection").notNull().default(""),
  exerciseAnswers: jsonb("exercise_answers").notNull().default({}),
  exerciseScore: integer("exercise_score").notNull().default(0),
  exerciseTotal: integer("exercise_total").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
