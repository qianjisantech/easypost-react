'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { SnippetsOutlined } from '@ant-design/icons'
import MonacoEditor from '@monaco-editor/react'
import { Button, Menu, message, Modal, Typography } from 'antd'
import type * as monaco from 'monaco-editor'

const { Text } = Typography

interface ApiData {
    method: string
    path: string
    headers?: Record<string, string>
    parameters?: any
    body?: any
}

interface CodeGenerationModalProps {
    visible: boolean
    onClose: () => void
    apiData: ApiData | null
    key: string
}

const LANGUAGE_MAP: Record<string, string> = {
    java: 'java',
    go: 'go',
    python: 'python',
    javascript: 'javascript',
    curl: 'shell',
}

const GenerateCode: React.FC<CodeGenerationModalProps> = ({ visible, onClose, apiData, key }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('curl')
    const [editorValue, setEditorValue] = useState('')
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

    const { method, path, headers = {}, body } = apiData || {}

    const languageMenuItems = [
        { key: 'curl', label: 'cURL' },
        { key: 'java', label: 'Java' },
        { key: 'go', label: 'Go' },
        { key: 'python', label: 'Python' },
        { key: 'javascript', label: 'JavaScript' },
    ]

    const generateCurlCommand = () => {
        if (!path) return ''

        let curl = `curl -X ${method} \\\n`
        curl += `  '${path}' \\\n`

        Object.entries(headers).forEach(([key, value]) => {
            curl += `  -H '${key}: ${value}' \\\n`
        })

        if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
            curl += `  -d '${JSON.stringify(body, null, 2)}'`
        }

        return curl
    }

    const generateSampleCode = (lang: string): string => {
        if (!apiData) return '// No API data available'

        if (lang === 'curl') {
            return generateCurlCommand()
        }

        const headerStrings = Object.entries(headers)
            .map(([key, value]) => `    "${key}": "${value}"`)
            .join(',\n')

        const bodyString = body ? JSON.stringify(body, null, 2) : '{}'
        const bodyString4Spaces = body ? JSON.stringify(body, null, 4) : '{}'

        switch (lang) {
            case 'java':
                return `import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
${
                    method !== 'GET'
                        ? `import okhttp3.MediaType;
import okhttp3.RequestBody;`
                        : ''
                }

public class ApiClient {
  public static void main(String[] args) throws Exception {
    OkHttpClient client = new OkHttpClient();
    ${
                    method !== 'GET'
                        ? `
    MediaType mediaType = MediaType.parse("application/json");
    RequestBody requestBody = RequestBody.create(mediaType, "${bodyString.replace(/"/g, '\\"')}");`
                        : ''
                }
    
    Request request = new Request.Builder()
      .url("${path}")
      .${method}()${
                    method !== 'GET'
                        ? `
      .body(requestBody)`
                        : ''
                }
      ${Object.entries(headers)
                    .map(([k, v]) => `.addHeader("${k}", "${v}")`)
                    .join('\n      ')}
      .build();
      
    try (Response response = client.newCall(request).execute()) {
      System.out.println(response.body().string());
    }
  }
}`

            case 'python':
                return `import requests

url = "${path}"
headers = {
${headerStrings}
}
${
                    method !== 'GET'
                        ? `
data = ${bodyString4Spaces}`
                        : ''
                }

response = requests.${method.toLowerCase()}(
  url,
  headers=headers${
                    method !== 'GET'
                        ? `,
  json=data`
                        : ''
                }
)
print(response.json())`

            case 'javascript':
                return `const axios = require('axios');

axios.${method.toLowerCase()}('${path}', {
  headers: {
${headerStrings}
  }${
                    method !== 'GET'
                        ? `,
  data: ${bodyString}`
                        : ''
                }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});`

            case 'go':
                return `package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
  ${method !== 'GET' ? `"bytes"` : ''}
)

func main() {
  client := &http.Client{}
  ${
                    method !== 'GET'
                        ? `
  jsonBody := []byte(\`${bodyString}\`)
  req, _ := http.NewRequest("${method}", "${path}", bytes.NewBuffer(jsonBody))`
                        : `
  req, _ := http.NewRequest("${method}", "${path}", nil)`
                }
  
  // 设置请求头
  ${Object.entries(headers)
                    .map(([k, v]) => `req.Header.Add("${k}", "${v}")`)
                    .join('\n  ')}
  
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()
  
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}`

            default:
                return '// 代码生成中...'
        }
    }

    useEffect(() => {
        if (visible && apiData) {
            setEditorValue(generateSampleCode(selectedLanguage))
        }
    }, [selectedLanguage, visible, apiData])

    const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor
        editor.updateOptions({
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 12,
            lineNumbersMinChars: 3,
        })
    }

    const handleCopyCode = () => {
        if (editorRef.current) {
            const code = editorRef.current.getValue()
            navigator.clipboard
                .writeText(code)
                .then(() => message.success('代码已复制到剪贴板'))
                .catch(() => message.error('复制失败'))
        }
    }

    if (!apiData) {
        return (
            <Modal
                footer={[
                    <Button key="close" onClick={onClose}>
                        关闭
                    </Button>,
                ]}
                open={visible}
                title="生成请求代码"
                width={800}
                onCancel={onClose}
            >
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <Text type="warning">未获取到API数据，请检查数据源</Text>
                </div>
            </Modal>
        )
    }

    return (
        <Modal
            bodyStyle={{ padding: 0 }}
            footer={[]}
            open={visible}
            title={'生成请求代码'}
            width={800}
            onCancel={onClose}
        >
            <div style={{ display: 'flex', height: '500px' }}>
                <div style={{ width: '150px', borderRight: '1px solid #f0f0f0' }}>
                    <Menu
                        items={languageMenuItems}
                        mode="inline"
                        selectedKeys={[selectedLanguage]}
                        style={{ height: '100%' }}
                        onSelect={({ key }) => {
                            setSelectedLanguage(key)
                        }}
                    />
                </div>
                <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            background: 'white',
                            padding: '8px 16px',
                            borderBottom: '1px solid #f0f0f0',
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            icon={<SnippetsOutlined />}
                            style={{
                                marginLeft: 'auto',
                                backgroundColor: '#f0f0f0',
                                color: '#495057',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '0 8px',
                                height: '24px',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            type="primary"
                            onClick={handleCopyCode}
                        >
                            复制代码
                        </Button>
                    </div>

                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <MonacoEditor
                            height="100%"
                            language={LANGUAGE_MAP[selectedLanguage]}
                            options={{
                                readOnly: false,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                fontSize: 12,
                                wordWrap: 'on',
                                automaticLayout: true,
                                renderWhitespace: 'none',
                                formatOnPaste: true,
                                formatOnType: true,
                                lineNumbers: 'on',
                                lineNumbersMinChars: 3,
                                lineDecorationsWidth: 12,
                                hover: { enabled: false },
                                cursorStyle: 'line',
                            }}
                            theme="api-code-theme"
                            value={editorValue}
                            onMount={handleEditorDidMount}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default GenerateCode