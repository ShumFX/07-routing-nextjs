"use client";

import css from "./TagsMenu.module.css";
import Link from "next/link";

// Для примера список тегов захардкожен.
// Позже можно будет заменить на fetch из API, если это нужно по ТЗ.
const TAGS = ["All", "Work", "Study", "Personal"];

export default function TagsMenu() {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
