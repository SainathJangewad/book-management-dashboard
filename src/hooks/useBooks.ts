import { useQuery, useMutation, useQueryClient } from "react-query";
import { getBooks, addBook, updateBook, deleteBook, type Book } from "../api/books";

export const useBooks = (page: number, search: string, genre: string, status: string) => {
  return useQuery(["books", page, search, genre, status], () =>
    getBooks(page, search, genre, status)
  );
};

export const useAddBook = () => {
  const qc = useQueryClient();
  return useMutation(addBook, { onSuccess: () => qc.invalidateQueries("books") });
};

export const useUpdateBook = () => {
  const qc = useQueryClient();
  return useMutation(
    ({ id, book }: { id: number; book: Book }) => updateBook(id, book),
    { onSuccess: () => qc.invalidateQueries("books") }
  );
};

export const useDeleteBook = () => {
  const qc = useQueryClient();
  return useMutation(deleteBook, { onSuccess: () => qc.invalidateQueries("books") });
};
