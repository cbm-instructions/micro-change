import { Card, Button, Space } from "antd";

const Achievement = ({ points, title, description }) => {
    const composedTitle = 
        <Space>
            <Button color="grey" size="large" disabled shape="circle">
                <p style={{color: "black"}}>{points}</p>
            </Button>
            { title }
        </Space>;

    return (
        <Card title={composedTitle}>
            <p>{description}</p>
        </Card>
    );
}

export default Achievement