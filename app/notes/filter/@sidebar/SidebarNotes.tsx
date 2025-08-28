"use client";

import Link from "next/link";
import styles from "./SidebarNotes.module.css";

const TAGS = ["All", "Work", "Personal", "Ideas"];

export default function SidebarNotes() {
  return (
    <aside>
      <ul className={styles.menuList}>
        {TAGS.map((tag) => (
          <li key={tag} className={styles.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={styles.menuLink}
            >
              {tag === "All" ? "All notes" : tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
