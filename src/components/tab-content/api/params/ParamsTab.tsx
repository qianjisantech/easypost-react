import { Form, Tabs, theme, Typography } from 'antd'

import { Authorization } from '@/components/tab-content/api/authorization/Authorization'
import PostScripts from '@/components/tab-content/api/scripts/PostScripts'
import { PreScripts } from '@/components/tab-content/api/scripts/PreScripts'
import type { ApiDetails } from '@/types'

import { ParamsEditableTable } from '../components/ParamsEditableTable'

import { ParamsPayload } from './ParamsPayload'

function BadgeLabel(props: React.PropsWithChildren<{ count?: number }>) {
  const { token } = theme.useToken()

  const { children, count } = props

  return (
    <span>
      {children}

      {typeof count === 'number' && count > 0 ? (
        <span
          className="ml-1 inline-flex size-4 items-center justify-center rounded-full text-xs"
          style={{ backgroundColor: token.colorFillContent, color: token.colorSuccessActive }}
        >
          {count}
        </span>
      ) : null}
    </span>
  )
}

interface ParamsTabProps {
  value?: ApiDetails['parameters']
  onChange?: (value: ParamsTabProps['value']) => void
}

/**
 * 请求参数页签。
 */
export function ParamsTab(props: ParamsTabProps) {
  const { value, onChange } = props
  console.log('ParamsTab', value)
  return (
    <Tabs
      animated={false}
      items={[
        {
          key: 'params',
          label: (
            <BadgeLabel count={(value?.query?.length || 0) + (value?.path?.length || 0)}>
              Params
            </BadgeLabel>
          ),
          children: (
            <div>
              <div className="py-2">
                <Typography.Text type="secondary">Query 参数</Typography.Text>
              </div>
              <ParamsEditableTable
                value={value?.query}
                onChange={(query) => {
                  onChange?.({ ...value, query })
                }}
              />

              {value?.path && value.path.length > 0 ? (
                <>
                  <div className="py-2">
                    <Typography.Text type="secondary">Path 参数</Typography.Text>
                  </div>
                  <ParamsEditableTable
                    isPathParamsTable
                    autoNewRow={false}
                    removable={false}
                    value={value.path}
                    onChange={(path) => {
                      onChange?.({ ...value, path })
                    }}
                  />
                </>
              ) : null}
            </div>
          ),
        },
        {
          key: 'authorization',
          label: 'Authorization',
          children: (
            <Authorization
              value={value?.authorization}
              onChange={(authorization) => {
                onChange?.({ ...value, authorization })
              }}
            />
          ),
        },
        {
          key: 'body',
          label: 'Body',
          children: (
            <ParamsPayload
              value={value?.payload}
              onChange={(payload) => {
                onChange?.({ ...value, payload })
              }}
            />
          ),
        },

        {
          key: 'headers',
          label: 'Headers',
          children: (
            <div className="pt-2">
              <ParamsEditableTable
                value={value?.header}
                onChange={(header) => {
                  onChange?.({ ...value, header })
                }}
              />
            </div>
          ),
        },

        {
          key: 'cookie',
          label: 'Cookie',
          children: (
            <div className="pt-2">
              <ParamsEditableTable
                value={value?.cookie}
                onChange={(cookie) => {
                  onChange?.({ ...value, cookie })
                }}
              />
            </div>
          ),
        },
        {
          key: 'prescripts',
          label: '前置脚本',
          children: (
            <PreScripts
              value={value?.prescripts}
              onChange={(prescripts) => {
                onChange?.({ ...value, prescripts })
              }}
            />
          ),
        },
        {
          key: 'postscripts',
          label: '后置脚本',
          children: (
            <PostScripts
              value={value?.postscripts}
              onChange={(postscripts) => {
                onChange?.({ ...value, postscripts })
              }}
            />
          ),
        },
      ]}
    />
  )
}
