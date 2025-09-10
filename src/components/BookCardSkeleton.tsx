import { Card, Skeleton, Space } from "antd";

export default function BookCardSkeleton() {
    return (
        <Card
            title={<Skeleton.Input style={{ width: 120 }} active size="small" />}
            bordered
            extra={<Skeleton.Button active size="small" shape="round" />}
        >
            <p><Skeleton.Input style={{ width: 180 }} active size="small" /></p>
            <p><Skeleton.Input style={{ width: 150 }} active size="small" /></p>
            <p><Skeleton.Input style={{ width: 100 }} active size="small" /></p>

            <Space>
                <Skeleton.Button active size="small" />
                <Skeleton.Button active size="small" />
            </Space>
        </Card>
    );
}
