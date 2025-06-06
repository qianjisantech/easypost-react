import gfm from '@bytemd/plugin-gfm'
import { Editor, type EditorProps } from '@bytemd/react'

import { useStyles } from '@/hooks/useStyle'

import 'bytemd/dist/index.css'
import { css } from '@emotion/css'

export function MarkdownEditor(
  props: EditorProps & { className?: string; style?: React.CSSProperties }
) {
  const { className, style, ...rest } = props

  const plugins = [gfm()]

  const { styles } = useStyles(({ token }) => {
    const editor = css({
      height: '100%',

      '> div': {
        height: '100%',

        '.bytemd': {
          height: '100%',
          borderColor: token.colorBorderSecondary,
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: 'none',
          backgroundColor: token.colorBgContainer,
          color: token.colorText,

          '.CodeMirror': {
            backgroundColor: token.colorBgContainer,
            color: token.colorText,

            '&.cm-s-default': {
              '.cm-header': {
                color: token.colorPrimary,
              },

              '.cm-link': {
                color: token.colorInfo,
              },

              '.cm-def': {
                color: token.colorError,
              },

              '.cm-keyword': {
                color: token.colorWarningActive,
              },

              '.cm-quote': {
                color: token.colorSuccessActive,
              },

              '.cm-variable-2': {
                color: token.colorInfoActive,
              },
            },
          },

          '.bytemd-toolbar': {
            backgroundColor: token.colorBgContainer,
            borderColor: token.colorBorderSecondary,

            '.bytemd-toolbar-icon': {
              color: token.colorTextSecondary,

              '&:hover': {
                backgroundColor: token.colorFillSecondary,
              },
            },
          },

          '.bytemd-preview': {
            borderColor: token.colorBorderSecondary,
          },

          '.bytemd-status': {
            borderColor: token.colorBorderSecondary,
          },
        },
      },
    })

    return {
      editor,
    }
  })

  return (
    <div className={`${className ?? ''} ${styles.editor}`} style={style}>
      <Editor
        locale={{
          bold: '粗体',
          boldText: '粗体文本',
          cheatsheet: 'Markdown 语法',
          closeHelp: '关闭帮助',
          closeToc: '关闭目录',
          code: '代码',
          codeBlock: '代码块',
          codeLang: '编程语言',
          codeText: '代码',
          exitFullscreen: '退出全屏',
          exitPreviewOnly: '恢复默认',
          exitWriteOnly: '恢复默认',
          fullscreen: '全屏',
          h1: '一级标题',
          h2: '二级标题',
          h3: '三级标题',
          h4: '四级标题',
          h5: '五级标题',
          h6: '六级标题',
          headingText: '标题',
          help: '帮助',
          hr: '分割线',
          image: '图片',
          imageAlt: 'alt',
          imageTitle: '图片描述',
          italic: '斜体',
          italicText: '斜体文本',
          limited: '已达最大字符数限制',
          lines: '行数',
          link: '链接',
          linkText: '链接描述',
          ol: '有序列表',
          olItem: '项目',
          preview: '预览',
          previewOnly: '仅预览区',
          quote: '引用',
          quotedText: '引用文本',
          shortcuts: '快捷键',
          source: '源代码',
          sync: '同步滚动',
          toc: '目录',
          top: '回到顶部',
          ul: '无序列表',
          ulItem: '项目',
          words: '字数',
          write: '编辑',
          writeOnly: '仅编辑区',
        }}
        plugins={plugins}
        {...rest}
      />
    </div>
  )
}
