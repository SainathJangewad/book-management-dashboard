import { Modal } from "antd";

export default function ConfirmDelete({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
    return (
        <Modal open title="Confirm Delete" onOk={onConfirm} onCancel={onCancel} okText="Delete" okButtonProps={{ danger: true }}>
            Are you sure you want to delete this book?
        </Modal>
    );
}
