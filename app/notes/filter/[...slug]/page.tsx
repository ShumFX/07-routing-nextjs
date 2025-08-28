import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: { slug?: string[] };
  searchParams: { page?: string; search?: string; perPage?: string };
};

export default async function Notes({ params, searchParams }: Props) {
  // 🟢 достаём тег из slug
  const tag =
    params.slug?.[0] && params.slug[0] !== "All" ? params.slug[0] : null;

  // 🟢 достаём query-параметры (страница, поиск, количество на страницу)
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const perPage = Number(searchParams.perPage) || 5;

  const queryClient = new QueryClient();

  // 🟢 префетчим заметки с учётом фильтра по тегу
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, perPage, tag],
    queryFn: () => fetchNotes(page, search, perPage, tag || undefined),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        page={page}
        search={search}
        perPage={perPage}
        tag={tag}
      />
    </HydrationBoundary>
  );
}
