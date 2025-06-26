import { Form, Input, Modal } from 'antd';
import React from 'react';

interface EditModalProps {
    visible: boolean;
    label: string;
    value: string;
    rules: any[];
    onCancel: () => void;
    onOk: () => void;
    onChange: (value: string) => void;
    form: any;
}

export const EditModal: React.FC<EditModalProps> = ({
                                                        visible,
                                                        label,
                                                        value,
                                                        rules,
                                                        onCancel,
                                                        onOk,
                                                        onChange,
                                                        form,
                                                    }) => {
    return (
        <Modal
            title={`修改${label}`}
            open={visible}
            okText="确定"
            cancelText="取消"
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item label={label} name="value" rules={rules}>
                    <Input onChange={(e) => onChange(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};