'use client'
import { Modal, Form, Input, Button } from 'antd';

export default function AddOrUpdateCategoryModal({ visible, onCancel, onOk }) {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then(values => {
            onOk(values.categoryName);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="新增分类"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    确认
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="categoryName"
                    label="分类名称"
                    rules={[{ required: true, message: '请输入分类名称' }]}
                >
                    <Input placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        </Modal>
    );
}