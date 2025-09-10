import axios from "axios";

const API = "http://localhost:5174";

export interface Book {
  id?: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  status: "Available" | "Issued";
}

export const getBooks = async (
  page: number,
  search: string,
  genre: string,
  status: string
) => {
  const params: any = {
    _page: page,
    _limit: 10,
  };
  if (search) params.q = search;
  if (genre) params.genre = genre;
  if (status) params.status = status;

  const res = await axios.get(`${API}/books`, { params });
  return { data: res.data, total: Number(res.headers["x-total-count"] || 0) };
};

export const addBook = async (book: Book) =>
  axios.post(`${API}/books`, book).then((res) => res.data);

export const updateBook = async (id: number, book: Book) =>
  axios.put(`${API}/books/${id}`, book).then((res) => res.data);

export const deleteBook = async (id: number) =>
  axios.delete(`${API}/books/${id}`).then((res) => res.data);
