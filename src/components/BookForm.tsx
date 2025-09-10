import { Modal, Form, Input, Select, App, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddBook, useUpdateBook } from "../hooks/useBooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import type { Book } from "../types";

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required"),
    year: z.coerce.number().min(1500).max(new Date().getFullYear()),
    status: z.enum(["Available", "Issued"]),
});

export type BookFormData = z.infer<typeof schema>;

export default function BookForm({ book, onClose }: { book: Book; onClose: () => void }) {
    const add = useAddBook();
    const update = useUpdateBook();
    const { notification } = App.useApp();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookFormData>({
        resolver: zodResolver(schema),
        defaultValues: book,
    });

    useEffect(() => {
        if (book) reset(book);
    }, [book, reset]);

    const onSubmit = (data: BookFormData) => {
        if (book?.id) {
            update.mutate(
                { id: book.id, book: data },
                {
                    onSuccess: () => {
                        notification.success({ message: "Book updated successfully" });
                        onClose();
                    },
                    onError: () => {
                        notification.error({ message: "Failed to update book" });
                    },
                }
            );
        } else {
            add.mutate(
                data,
                {
                    onSuccess: () => {
                        notification.success({ message: "Book added successfully" });
                        onClose();
                    },
                    onError: () => {
                        notification.error({ message: "Failed to add book" });
                    },
                }
            );
        }
    };

    return (
        <Modal
            open
            title={book?.id ? "Edit Book" : "Add Book"}
            onCancel={onClose}
            onOk={handleSubmit(onSubmit)}
            okText={book?.id ? "Update" : "Add"}
            confirmLoading={add.isLoading || update.isLoading}
        >
            <Form layout="vertical">
                <Form.Item label="Title" validateStatus={errors.title ? "error" : ""} help={errors.title?.message}>
                    <Controller control={control} name="title" render={({ field }) => <Input {...field} />} />
                </Form.Item>

                <Form.Item label="Author" validateStatus={errors.author ? "error" : ""} help={errors.author?.message}>
                    <Controller control={control} name="author" render={({ field }) => <Input {...field} />} />
                </Form.Item>

                <Form.Item label="Genre" validateStatus={errors.genre ? "error" : ""} help={errors.genre?.message}>
                    <Controller
                        control={control}
                        name="genre"
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange} options={[{ value: "Fiction" }, { value: "Non-fiction" }]} />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Year"
                    validateStatus={errors.year ? "error" : ""}
                    help={errors.year?.message}
                >
                    <Controller
                        control={control}
                        name="year"
                        render={({ field }) => (
                            <DatePicker
                                picker="year"
                                value={field.value ? dayjs(String(field.value)) : null}
                                onChange={(date) => field.onChange(date ? date.year() : undefined)}
                                style={{ width: "100%" }}
                            />
                        )}
                    />
                </Form.Item>


                <Form.Item label="Status" validateStatus={errors.status ? "error" : ""} help={errors.status?.message}>
                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange} options={[{ value: "Available" }, { value: "Issued" }]} />
                        )}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
