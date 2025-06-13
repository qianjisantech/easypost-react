'use client'
import { Modal, Form, Input, Upload, Button, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function AddOrUpdateProjectModal({ visible, onCancel, onOk }) {
    const [form] = Form.useForm();

    // 分类选项数据（可以从props传入或从API获取）
    const categoryOptions = [
        { id: '1', name: '全部分类' },
        { id: '2', name: 'WMS' },
        { id: '3', name: 'BMS' },
        { id: '4', name: '运输' },
        { id: '5', name: '集运' }
    ];

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传 JPG/PNG 文件!');
        }
        return isJpgOrPng;
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            onOk({
                image: values.image?.[0],
                categoryId: values.categoryId,
                name: values.projectName,
                description: values.description
            });
            form.resetFields();
        });
    };

    return (
        <Modal
            title="新增项目"
            visible={visible}
            onCancel={onCancel}
            width={600}
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
                {/* 1. 图片上传 */}
                <Form.Item
                    name="image"
                    label="项目图片"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    rules={[{ required: true, message: '请上传项目图片' }]}
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}></Button>
                    </Upload>
                </Form.Item>

                {/* 2. 分类下拉框 */}
                <Form.Item
                    name="categoryId"
                    label="项目分类"
                    rules={[{ required: true, message: '请选择项目分类' }]}
                >
                    <Select placeholder="请选择项目分类">
                        {categoryOptions.map(item => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* 3. 项目名称 */}
                <Form.Item
                    name="projectName"
                    label="项目名称"
                    rules={[{ required: true, message: '请输入项目名称' }]}
                >
                    <Input placeholder="请输入项目名称" />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="项目地址"
                    rules={[{ required: true, message: '请输入项目地址' }]}
                >
                    <Input rows={4} placeholder="请输入项目地址" />
                </Form.Item>
                {/* 4. 项目描述 */}
                <Form.Item
                    name="description"
                    label="项目描述"
                    rules={[{ required: true, message: '请输入项目描述' }]}
                >
                    <Input.TextArea rows={4} placeholder="请输入项目描述" />
                </Form.Item>


            </Form>
        </Modal>
    );
}