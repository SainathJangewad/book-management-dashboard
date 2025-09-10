import { useEffect, useState } from "react";
import { Input, Button, Select, Row, Col, Empty, App, Pagination } from "antd";
import { useBooks, useDeleteBook } from "../../hooks/useBooks";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, setSearch, setGenre, setStatus } from "../../store/uiSlice";
import BookForm from "../../components/BookForm";
import ConfirmDelete from "../../components/ConfirmDelete";
import BookCard from "../../components/BookCard";
import './Books.scss'
import { ReadOutlined } from "@ant-design/icons";
import BookCardSkeleton from "../../components/BookCardSkeleton";
import { useDebounce } from "../../hooks/useDebounce";


export default function BooksPage() {
    const dispatch = useDispatch();
    const { search, genre, status } = useSelector((s: RootState) => s.ui);

    const [page, setPage] = useState(1);
    const [editingBook, setEditingBook] = useState<any | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data, isLoading, isFetching } = useBooks(page, search, genre, status);
    const del = useDeleteBook();
    const { notification } = App.useApp();

    const [localSearch, setLocalSearch] = useState(search);
    const debouncedSearch = useDebounce(localSearch, 800);

    useEffect(() => {
        dispatch(setSearch(debouncedSearch));
    }, [debouncedSearch, dispatch]);



    return (
        <div className="books">
            <div className="logo"> <ReadOutlined />  Book Manager</div>

            <div className="filters-container">
                <Input.Search
                    placeholder="Search by title or author"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    style={{ width: 200 }}
                />
                <Select
                    placeholder="Genre"
                    value={genre || undefined}
                    onChange={(v) => dispatch(setGenre(v))}
                    allowClear
                    style={{ width: 200 }}
                    options={[
                        { value: "Fiction", label: "Fiction" },
                        { value: "Non-fiction", label: "Non-fiction" },
                    ]}
                />
                <Select
                    placeholder="Status"
                    value={status || undefined}
                    onChange={(v) => dispatch(setStatus(v))}
                    allowClear
                    style={{ width: 200 }}
                    options={[
                        { value: "Available", label: "Available" },
                        { value: "Issued", label: "Issued" },
                    ]}
                />
                <Button type="primary" onClick={() => setEditingBook({})}>
                    Add Book
                </Button>
            </div>

            {isLoading || isFetching ? (
                <Row gutter={[16, 16]}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Col key={i} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <BookCardSkeleton />
                        </Col>
                    ))}
                </Row>
            ) : data?.data?.length === 0 ? (
                <div style={{ marginTop: 50, textAlign: "center", width: "100%" }}>
                    <Empty description="No Books Found" />
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {data?.data.map((book: any) => (
                        <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <BookCard
                                book={book}
                                onEdit={() => setEditingBook(book)}
                                onDelete={() => setDeleteId(book.id)}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            {data && data?.total > 10 && (
                <div style={{ marginTop: 20, textAlign: "center" }}>
                    <Pagination
                        current={page}
                        pageSize={10}
                        total={data?.total}
                        onChange={(p) => setPage(p)}
                    />
                </div>
            )}

            {editingBook && (
                <BookForm book={editingBook} onClose={() => setEditingBook(null)} />
            )}

            {deleteId && (
                <ConfirmDelete
                    onConfirm={() => {
                        del.mutate(deleteId,
                            {
                                onSuccess: () => {
                                    notification.success({ message: "Book deleted successfully" });
                                    if (data?.data?.length === 1 && page > 1) {
                                        setPage((p) => p - 1);
                                    }
                                },
                                onError: () => {
                                    notification.error({ message: "Failed to delete book" });
                                },
                            }
                        );
                        setDeleteId(null);
                    }}
                    onCancel={() => setDeleteId(null)}
                />
            )}
        </div>
    );
}
