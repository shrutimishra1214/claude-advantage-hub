import type { Bonus } from "./bonuses";

export function downloadBonus(bonus: Bonus) {
  const a = document.createElement("a");
  a.href = bonus.url;
  a.download = bonus.file;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
