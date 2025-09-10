import { Card, Button, Space, Tag } from "antd";
import type { Book } from "../types";

interface BookCardProps {
    book: Book;
    onEdit: () => void;
    onDelete: () => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
    return (
        <Card
            title={book.title}
            bordered
            extra={<Tag color={book.status === "Available" ? "green" : "red"}>{book.status}</Tag>}
        >
            <p><b>Author:</b> {book.author}</p>
            <p><b>Genre:</b> {book.genre}</p>
            <p><b>Year:</b> {book.year}</p>
            <Space>
                <Button type="primary" onClick={onEdit}>Edit</Button>
                <Button danger onClick={onDelete}>Delete</Button>
            </Space>
        </Card>
    );
}
