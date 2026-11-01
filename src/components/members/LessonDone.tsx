"use client";

import { Icon } from "../icons";
import { useProgress } from "./progress";

export function LessonDone({ id }: { id: string }) {
  const { lessons, toggleLesson } = useProgress();
  const done = lessons.includes(id);
  return (
    <button type="button" onClick={() => toggleLesson(id)} aria-pressed={done} className={done ? "btn-primary !px-4 !py-2 !text-sm" : "btn-secondary !px-4 !py-2 !text-sm"}>
      <Icon.check className="h-4 w-4" /> {done ? "Done" : "Mark as done"}
    </button>
  );
}
