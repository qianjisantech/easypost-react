'use client'

import { useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import UserAPI from "@/api/user";

interface PasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ResetPasswordModal: React.FC<PasswordModalProps> = ({
                                                              visible,
                                                              onClose,
                                                              onSuccess
                                                            }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const res = await UserAPI.setPassword({ password: values.password });
      if (res.data.success) {
        message.success(res.data.message);
        form.resetFields();
        onSuccess?.();
      }
    } catch (error) {
      if (!error.errorFields) {
        message.error('密码设置失败，请重试');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="设置初始密码"
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      closable={false}
      centered
      maskClosable={false}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="password"
          label="新密码"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6位字符' }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              }
            })
          ]}
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};