import axios from "axios";
import type { Note } from "@/types/note";

interface FetchResponse {
  notes: Note[];
  totalPages: number;
}

/**
 * fetchNotes
 * Получает коллекцию заметок с сервера.
 * Поддерживает:
 * - пагинацию (page, perPage)
 * - поиск (search)
 * - фильтрацию по тегу (tag)
 */
export async function fetchNotes(
  page: number = 1,
  search: string = "",
  perPage: number = 12,
  tag?: string
): Promise<FetchResponse> {
  const params: Record<string, string | number> = { page, search, perPage };

  // Если есть тег и он не "All" → добавляем в параметры
  if (tag && tag !== "All") {
    params.tag = tag;
  }

  const response = await axios.get<FetchResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
}
