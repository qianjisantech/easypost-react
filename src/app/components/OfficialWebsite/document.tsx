// src/app/(main)/components/OfficialWebsite/document.tsx
'use client'

import React, { useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

// 导入所有文档内容（直接导入字符串）
import introduce from './markdown/introduce-markdown';
import quickStart from './markdown/quick-start-markdown';

type MenuItem = Required<MenuProps>['items'][number];

// 文档内容映射表
const DOCUMENT_CONTENT = {
  'introduce': introduce,
  'quick-start': quickStart,
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  content?: string,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    children,
    label,
    type,
    content,
  } as MenuItem;
}

export default function DocumentPage() {
  const [selectedKey, setSelectedKey] = useState('introduce');
  const [content, setContent] = useState(DOCUMENT_CONTENT['introduce']);

  // 构建菜单项
  const menuItems: MenuItem[] = [
    getItem('介绍', 'introduce', DOCUMENT_CONTENT['introduce']),
    getItem('快速开始', 'quick-start', DOCUMENT_CONTENT['quick-start']),
  ];

  const onMenuClick: MenuProps['onClick'] = (e) => {
    const findContent = (items: MenuItem[], key: string): string | undefined => {
      for (const item of items) {
        if (item?.key === key && item['content']) {
          return item['content'] as string;
        }
        if (item?.children) {
          const found = findContent(item.children, key);
          if (found) return found;
        }
      }
    };

    const newContent = findContent(menuItems, e.key) || DOCUMENT_CONTENT['introduce'];
    setSelectedKey(e.key);
    setContent(newContent);
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] w-screen max-w-[50%] mx-auto">
      {/* 左侧菜单 - 添加固定高度和滚动 */}
      <div className="w-[20%] min-w-[15%] h-[calc(100vh-6rem)] overflow-y-auto">
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={[selectedKey]}
          onClick={onMenuClick}
          style={{
            width: '100%',
            borderRight: '1px solid #f3f4f6',
            height: 'auto' // 让菜单内容决定高度
          }}
        />
      </div>

      {/* 右侧内容区域 - 带滚动条 */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div
          className="prose max-w-[1600px] mx-auto ml-4 p-4 overflow-y-auto"
          style={{
            height: 'calc(100vh - 6rem)',
            scrollbarWidth: 'thin',
            msOverflowStyle: 'none'
          }}
        >
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            skipHtml={false}
            components={{
              // 可选：自定义超大元素的渲染
              pre: ({node, ...props}) => (
                <div className="overflow-x-auto">
                  <pre {...props} />
                </div>
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}