import {Table, Button, Card, Space, Modal, Form, Input, Upload, message, Select} from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

interface Certificate {
    id: string;
    name: string;
    type: string;
    expiryDate: string;
    status: 'valid' | 'expired' | 'revoked';
}

interface CertificatesProps {
}

export const Certificates: React.FC<CertificatesProps> = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([
        { id: '1', name: '主证书', type: 'SSL', expiryDate: '2024-12-31', status: 'valid' },
        { id: '2', name: '备份证书', type: 'SSL', expiryDate: '2023-06-30', status: 'expired' },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const columns = [
        {
            title: '证书名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '过期日期',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span style={{ color: status === 'valid' ? 'green' : 'red' }}>
                    {status === 'valid' ? '有效' : status === 'expired' ? '已过期' : '已撤销'}
                </span>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: Certificate) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleRenew(record.id)}>续期</Button>
                    <Button danger type="text" icon={<DeleteOutlined />} onClick={() => handleRevoke(record.id)} />
                </Space>
            ),
        },
    ];

    const handleAddCertificate = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            const newCertificate:Certificate = {
                id: Date.now().toString(),
                name: values.name,
                type: values.type,
                expiryDate: values.expiryDate,
                status: 'valid',
            };
            setCertificates([...certificates, newCertificate]);
            setIsModalVisible(false);
            form.resetFields();
            message.success('证书添加成功');
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleRevoke = (id: string) => {
        Modal.confirm({
            title: '确认撤销证书?',
            content: '撤销后将无法恢复',
            onOk: () => {
                setCertificates(certificates.map(cert =>
                    cert.id === id ? { ...cert, status: 'revoked' } : cert
                ));
                message.success('证书已撤销');
            },
        });
    };

    const handleRenew = (id: string) => {
        setCertificates(certificates.map(cert =>
            cert.id === id ? { ...cert, expiryDate: '2025-12-31', status: 'valid' } : cert
        ));
        message.success('证书已续期');
    };

    return (
        <Card
            title="证书管理"
            // styles={{
            //     header:{
            //
            //     }
            // }}
            extra={<Button type="primary" onClick={handleAddCertificate}>添加证书</Button>}
        >
            <Table
                columns={columns}
                dataSource={certificates}
                rowKey="id"
                pagination={false}
            />

            <Modal
                title="添加新证书"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="证书名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="type" label="证书类型" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="SSL">SSL</Select.Option>
                            <Select.Option value="TLS">TLS</Select.Option>
                            <Select.Option value="Code Signing">代码签名</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="expiryDate" label="过期日期" rules={[{ required: true }]}>
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item name="file" label="证书文件" rules={[{ required: true }]}>
                        <Upload beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>选择文件</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};