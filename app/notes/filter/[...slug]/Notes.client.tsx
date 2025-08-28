"use client";

import css from "@/app/notes/NotesPage.module.css";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebounce } from "use-debounce";

interface NotesClientProps {
  page: number;
  search: string;
  perPage: number;
  tag: string | null;
}

export default function NotesClient({
  page: initialPage,
  search: initialSearch,
  perPage,
  tag,
}: NotesClientProps) {
  const [search, setSearch] = useState(initialSearch); // локальный поиск
  const [page, setPage] = useState(initialPage); // локальная пагинация
  const [isModalOpen, setIsModalOpen] = useState(false); // состояние модалки
  const [debouncedSearch] = useDebounce(search, 1000);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedSearch, perPage, tag],
    queryFn: () => fetchNotes(page, debouncedSearch, perPage, tag || undefined),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Поиск */}
        <SearchBox value={search} onChange={handleSearchChange} />

        {/* Пагинация */}
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        {/* Кнопка создать заметку */}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {/* Список заметок */}
      {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}

      {/* Модалка */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
