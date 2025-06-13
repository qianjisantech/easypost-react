import React, {useState, useTransition} from 'react'
import {Button, Form, Input, message, Spin, Space} from 'antd'
import AuthAPI from '@/api/auth'
import {useGlobalContext} from '@/contexts/global'
import {LoginFieldType} from "@/app/(main)/login/types";
import type {NamePath} from 'antd/es/form/interface';

const EmailLogin = () => {
    const [form] = Form.useForm<LoginFieldType>()
    const [isCodeLogin, setIsCodeLogin] = useState(false) //判断是否是验证码登录
    const [codeLoading, setCodeLoading] = useState(false) //验证码按钮加载状态
    const [isPending, startTransition] = useTransition()
    const [loading, setLoading] = useState(false) // 登录按钮加载状态
    const [countdown, setCountdown] = useState(0)
    const {setIsLogin, setNeedSetPassword} = useGlobalContext()

    /**
     * 发送验证码
     */
    const handleSendCode = async () => {
        console.log('发送验证码', form.isFieldValidating(['email']))
        // 获取邮箱值
        if (!form.isFieldValidating(['email'])) {
            message.error('请填写邮箱')
        } else {
            try {
                const email = form.getFieldValue('email' as NamePath<LoginFieldType>);
                if (loading || countdown > 0) return
                setCodeLoading(true)
                const res = await AuthAPI.sendEmailCode({email})
                if (res?.data?.success) {
                    message.success(res.data.message || '验证码发送成功')
                    setCountdown(30)
                    const timer = setInterval(() => {
                        setCountdown((prev) => {
                            if (prev <= 1) {
                                clearInterval(timer)
                                setCodeLoading(false)
                                return 0
                            }
                            return prev - 1
                        })
                    }, 1000)
                } else {
                    message.error(res?.data?.message || '验证码发送失败，请重试')
                    setCodeLoading(false)
                }
            } catch (error) {
                console.error('发送验证码失败:', error)
                setCodeLoading(false)
                if ((error as any).errorFields) {
                    message.error('请输入有效的邮箱地址')
                } else {
                    message.error('发送验证码失败，请检查网络后重试')
                }
            }
        }

    }

    /**
     * 表单提交
     */
    const handleSubmit = async () => {

        try {
            // 验证所有字段
            const values = await form.validateFields()
            console.log('表单提交--------', {
                email: values.email as string,
                code: values.code as string
            })
            setLoading(true)
            if (isCodeLogin) {
                // 验证码登录/注册
                const res = await AuthAPI.registerByEmail({
                    email: values.email as string,
                    code: values.code as string
                })
                if (res?.data?.success) {
                    localStorage.setItem('token', res.data.data.token)
                    setIsLogin(true)
                    message.success(res.data.message)
                    setNeedSetPassword(res.data.data.needSetPassword)
                }
            } else {
                // 密码登录
                const res = await AuthAPI.loginByEmail({
                    email: values.email ,
                    password: values.password
                })
                if (res?.data?.success) {
                    localStorage.setItem('token', res.data.data.token)
                    setIsLogin(true)
                }
            }
        } catch (error) {
            console.error('登录错误:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {isPending && (
                <div className="global-loading">
                    <Spin size="large" tip="Loading..."/>
                </div>
            )}

            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                initialValues={{remember: true}}
            >
                <Form.Item<LoginFieldType>
                    name="email"
                    rules={[
                        {required: true, message: '请输入邮箱地址'},
                        {type: 'email', message: '请输入有效的邮箱地址'}
                    ]}
                >
                    <Input size={'large'} placeholder="邮箱"/>
                </Form.Item>

                {isCodeLogin ? (
                    <>
                        <Form.Item<LoginFieldType>
                            name="code"
                            rules={[
                                {required: true, message: '请输入验证码'},
                                {pattern: /^\d{6}$/, message: '验证码为6位数字'}
                            ]}
                        >
                            <Space.Compact>
                                <Input
                                    size={'large'}
                                    placeholder="验证码"
                                    style={{width: 'calc(100% - 120px)', textAlign: 'left'}}
                                />
                                <Button
                                    size={'large'}

                                    disabled={countdown > 0}
                                    loading={codeLoading}
                                    style={{width: '120px', color: '#D6A5D6'}}
                                    onClick={handleSendCode}
                                >
                                    {countdown > 0 ? `${countdown}s` : '获取验证码'}
                                </Button>
                            </Space.Compact>
                        </Form.Item>

                        <p style={{fontSize: 12, color: '#666', marginBottom: 10}}>
                            点击"登录/注册"表示您同意 <a style={{color: '#D6A5D6'}}>服务协议</a> 和{' '}
                            <a style={{color: '#D6A5D6'}}>隐私协议</a>
                        </p>
                    </>
                ) : (
                    <Form.Item<LoginFieldType>
                        name="password"
                        rules={[
                            {required: true, message: '请输入密码'},
                            {min: 6, message: '密码至少6位字符'}
                        ]}
                    >
                        <Input.Password size={'large'} placeholder="密码"/>
                    </Form.Item>
                )}

                <Form.Item>
                    <Button
                        block
                        size={'large'}
                        type="primary"
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        {isCodeLogin ? '登录/注册' : '登录'}
                    </Button>
                </Form.Item>

                <Form.Item style={{bottom: 0, top: 0}}>
                    <Button
                        htmlType="reset"
                        type="link"
                        style={{color: '#D6A5D6'}}
                        onClick={() => {
                            setIsCodeLogin(!isCodeLogin)
                        }}
                    >
                        {isCodeLogin ? '密码登录' : '验证码登录/注册'}
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}

export default EmailLogin