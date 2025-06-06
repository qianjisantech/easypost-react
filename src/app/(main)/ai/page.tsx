'use client'
import { useEffect, useRef, useState } from 'react'

import { PlusOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, Image, Input, Layout, Menu, message, Row } from 'antd'
import axios from 'axios'

const { TextArea } = Input
const { Sider, Content } = Layout

export default function AIPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [sessions, setSessions] = useState([])
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  // 初始化时加载会话记录
  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('ai-sessions')) || []
    setSessions(savedSessions)

    if (savedSessions.length > 0) {
      setCurrentSessionId(savedSessions[0].id)
      setMessages(savedSessions[0].messages || [])
    } else {
      createNewSession()
    }

    // 粘贴图片处理
    const handlePaste = async (e) => {
      const items = e.clipboardData.items
      const imageFiles = []

      // 收集所有图片文件
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile()
          if (blob) {
            imageFiles.push(blob)
          }
        }
      }

      if (imageFiles.length > 0) {
        e.preventDefault()
        setIsLoading(true)
        const hideLoading = message.loading('正在上传图片到OSS...', 0)

        try {
          // 上传图片并获取OSS链接
          const uploadedImages = await Promise.all(
            imageFiles.map(async (file) => {
              const formData = new FormData()
              formData.append('file', file)

              // 调用上传API
              const response = await axios.post('/api/upload-to-oss', formData)
              const ossUrl = response.data.url

              // 生成预览
              const preview = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                  resolve(e.target.result)
                }
                reader.readAsDataURL(file)
              })

              return { file, preview, ossUrl }
            })
          )

          setImages((prev) => [...prev, ...uploadedImages])
          message.success(`已上传 ${uploadedImages.length} 张图片`)
        } catch (error) {
          console.error('上传失败:', error)
          message.error('图片上传失败')
        } finally {
          hideLoading()
          setIsLoading(false)
        }
      }
    }

    const textarea = textareaRef.current?.resizableTextArea?.textArea
    textarea?.addEventListener('paste', handlePaste)

    return () => {
      textarea?.removeEventListener('paste', handlePaste)
    }
  }, [])

  // 处理文件上传
  const handleImageUpload = async (files) => {
    setIsLoading(true)
    const hideLoading = message.loading('正在上传图片到OSS...', 0)

    try {
      const uploadedImages = await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)

          const response = await axios.post('/upload-to-oss', formData)
          const ossUrl = response.data.url

          const preview = await new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              resolve(e.target.result)
            }
            reader.readAsDataURL(file)
          })

          return { file, preview, ossUrl }
        })
      )

      setImages((prev) => [...prev, ...uploadedImages])
      message.success(`已上传 ${uploadedImages.length} 张图片`)
    } catch (error) {
      console.error('上传失败:', error)
      message.error('图片上传失败')
    } finally {
      hideLoading()
      setIsLoading(false)
    }
  }

  // 删除图片
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  // 会话管理
  const saveSessions = (updatedSessions) => {
    localStorage.setItem('ai-sessions', JSON.stringify(updatedSessions))
  }

  const createNewSession = () => {
    const newSession = {
      id: Date.now().toString(),
      title: `会话 ${new Date().toLocaleTimeString()}`,
      createdAt: new Date().toISOString(),
      messages: [],
    }

    setSessions((prev) => {
      const updated = [newSession, ...prev]
      saveSessions(updated)
      return updated
    })

    setCurrentSessionId(newSession.id)
    setMessages([])
    setImages([])
  }

  const switchSession = (sessionId) => {
    const session = sessions.find((s) => s.id === sessionId)
    if (session) {
      setCurrentSessionId(sessionId)
      setMessages(session.messages || [])
      setImages([])
    }
  }

  const updateCurrentSession = (updatedMessages) => {
    setSessions((prev) => {
      const updated = prev.map((session) =>
        session.id === currentSessionId ? { ...session, messages: updatedMessages } : session
      )
      saveSessions(updated)
      return updated
    })
  }

  // 发送消息
  const handleSend = async () => {
    if (!input.trim() && images.length === 0) {
      return
    }

    setIsLoading(true)
    const userMessage = {
      role: 'user',
      content: input,
      images: images.map((img) => img.ossUrl),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    updateCurrentSession(updatedMessages)
    setInput('')
    setImages([])

    try {
      const response = await axios.post('/api/chat', {
        messages: updatedMessages,
      })

      const assistantMessage = { role: 'assistant', content: response.data.reply }
      const finalMessages = [...updatedMessages, assistantMessage]

      setMessages(finalMessages)
      updateCurrentSession(finalMessages)
    } catch (error) {
      message.error('发送消息失败')
      console.error('API请求失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <Layout className="h-screen">
      <Sider
        collapsible
        className="border-r border-gray-200"
        collapsed={collapsed}
        theme="light"
        width={250}
        onCollapse={(value) => {
          setCollapsed(value)
        }}
      >
        <div className="border-b border-gray-200 p-4" style={{ marginTop: 50 }}>
          <Button block icon={<PlusOutlined />} type="primary" onClick={createNewSession}>
            {!collapsed && '新建会话'}
          </Button>
        </div>

        <Menu
          className="h-[calc(100%-64px)] overflow-y-auto"
          mode="inline"
          selectedKeys={[currentSessionId]}
        >
          {sessions.map((session) => (
            <Menu.Item
              key={session.id}
              className={currentSessionId === session.id ? 'bg-blue-50' : ''}
              style={{ height: 60 }}
              onClick={() => {
                switchSession(session.id)
              }}
            >
              <div className="truncate font-medium">{session.title}</div>
              <div className="text-xs text-gray-500">
                {new Date(session.createdAt).toLocaleString()}
              </div>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout>
        <Content className="flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mx-auto mb-4 max-w-3xl rounded-lg p-4 ${
                  msg.role === 'user' ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-200'
                }`}
              >
                {msg.images && msg.images.length > 0 && (
                  <Row className="mb-2" gutter={[8, 8]}>
                    {msg.images.map((img, imgIndex) => (
                      <Col key={imgIndex} span={msg.images.length > 1 ? 12 : 24}>
                        <Image
                          alt={`上传的图片 ${imgIndex + 1}`}
                          className="rounded"
                          src={img}
                          style={{ maxHeight: '300px', objectFit: 'contain' }}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 bg-white p-4">
            {images.length > 0 && (
              <div className="relative mb-4">
                <Row gutter={[8, 8]}>
                  {images.map((img, index) => (
                    <Col key={index} span={images.length > 1 ? 12 : 24}>
                      <div className="relative">
                        <Image
                          alt={`预览 ${index + 1}`}
                          className="rounded"
                          src={img.preview}
                          style={{ maxHeight: '200px', objectFit: 'contain' }}
                        />
                        <Button
                          danger
                          className="absolute right-1 top-1 rounded-full bg-white"
                          icon="×"
                          type="text"
                          onClick={() => {
                            removeImage(index)
                          }}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            <div className="flex items-center gap-2" style={{ justifyContent: 'center' }}>
              <Button
                className="flex items-center justify-center"
                icon={<UploadOutlined />}
                onClick={triggerFileInput}
              />
              <input
                ref={fileInputRef}
                multiple
                accept="image/*"
                className="hidden"
                type="file"
                onChange={(e) => {
                  if (e.target.files?.length > 0) {
                    handleImageUpload(e.target.files)
                  }
                }}
              />

              <TextArea
                ref={textareaRef}
                autoSize={{ minRows: 3, maxRows: 6 }} // 增加最小行数
                className="flex-1"
                placeholder="输入消息或粘贴图片..."
                style={{
                  width: '40%', // 缩短宽度
                  resize: 'none', // 禁止手动调整大小
                  margin: '0 10px', // 添加左右边距
                }}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                }}
                onPressEnter={handleKeyDown}
              />

              <Button
                className="flex items-center justify-center"
                disabled={!input.trim() && images.length === 0}
                icon={<SendOutlined />}
                loading={isLoading}
                type="primary"
                onClick={handleSend}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
