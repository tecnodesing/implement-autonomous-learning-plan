import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { students, dayProgress } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const DEFAULT_STUDENT = "Ruben";

async function ensureStudent(name: string) {
  const existing = await db.select().from(students).where(eq(students.name, name)).limit(1);
  if (existing[0]) return existing[0];
  const [created] = await db.insert(students).values({ name }).returning();
  return created;
}

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") ?? DEFAULT_STUDENT;
  const student = await ensureStudent(name);
  const rows = await db.select().from(dayProgress).where(eq(dayProgress.studentId, student.id));
  return NextResponse.json({ student, days: rows });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    name?: string;
    dayId: number;
    patch: Partial<{
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
    }>;
  };
  const name = body.name ?? DEFAULT_STUDENT;
  const student = await ensureStudent(name);

  const existing = await db
    .select()
    .from(dayProgress)
    .where(and(eq(dayProgress.studentId, student.id), eq(dayProgress.dayId, body.dayId)))
    .limit(1);

  const patchValues = {
    ...(body.patch.completed !== undefined ? { completed: body.patch.completed } : {}),
    ...(body.patch.checklist !== undefined ? { checklist: body.patch.checklist } : {}),
    ...(body.patch.stepsChecks !== undefined ? { stepsChecks: body.patch.stepsChecks } : {}),
    ...(body.patch.selfEval !== undefined ? { selfEval: body.patch.selfEval } : {}),
    ...(body.patch.rubricScores !== undefined ? { rubricScores: body.patch.rubricScores } : {}),
    ...(body.patch.bitacora !== undefined ? { bitacora: body.patch.bitacora } : {}),
    ...(body.patch.reflection !== undefined ? { reflection: body.patch.reflection } : {}),
    ...(body.patch.exerciseAnswers !== undefined ? { exerciseAnswers: body.patch.exerciseAnswers } : {}),
    ...(body.patch.exerciseScore !== undefined ? { exerciseScore: body.patch.exerciseScore } : {}),
    ...(body.patch.exerciseTotal !== undefined ? { exerciseTotal: body.patch.exerciseTotal } : {}),
    updatedAt: new Date(),
  };

  if (existing[0]) {
    const [updated] = await db
      .update(dayProgress)
      .set(patchValues)
      .where(eq(dayProgress.id, existing[0].id))
      .returning();
    return NextResponse.json({ row: updated });
  }

  const [inserted] = await db
    .insert(dayProgress)
    .values({
      studentId: student.id,
      dayId: body.dayId,
      ...patchValues,
    })
    .returning();
  return NextResponse.json({ row: inserted });
}
