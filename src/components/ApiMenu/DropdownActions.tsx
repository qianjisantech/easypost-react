import { show } from '@ebay/nice-modal-react'
import { Dropdown, type DropDownProps, type MenuProps, message, theme } from 'antd'
import { CopyIcon, FolderInputIcon, FolderPlusIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import { ApiCopy, ApiDelete } from '@/api/ams/api'
import type { ApiMenuData } from '@/components/ApiMenu/ApiMenu.type'
import { FileIcon } from '@/components/icons/FileIcon'
import { ModalMoveMenu } from '@/components/modals/ModalMoveMenu'
import { ModalNewCatalog } from '@/components/modals/ModalNewCatalog'
import { ModalRename } from '@/components/modals/ModalRename'
import { API_MENU_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { MenuItemType } from '@/enums'
import { getCatalogType, getCreateType } from '@/helpers'
import { useHelpers } from '@/hooks/useHelpers'

interface DropdownActionsProps extends DropDownProps {
  catalog: ApiMenuData
  isFolder?: boolean
}

/**
 * 菜单的操作菜单。
 */
export function DropdownActions(props: React.PropsWithChildren<DropdownActionsProps>) {
  const { token } = theme.useToken()

  const { children, catalog, isFolder = false, ...dropdownProps } = props

  const { modal } = useGlobalContext()
  const { addMenuItem, removeMenuItem } = useMenuHelpersContext()
  const { createTabItem } = useHelpers()

  const { tipTitle } = API_MENU_CONFIG[getCatalogType(catalog.type)]
  const createType = getCreateType(catalog.type)

  // 停止事件传播的函数
  const stopEventPropagation = (ev: React.MouseEvent) => {
    ev.stopPropagation()
  }
  // 删除确认的函数
  const confirmDelete = (catalog: CatalogType) => {
    const content = `${
      catalog.type === MenuItemType.ApiDetailFolder
        ? '该目录及该目录下的接口和用例都'
        : catalog.type === MenuItemType.ApiSchemaFolder
          ? '该目录及该目录下的数据模型都'
          : ''
    }将移至回收站，30 天后自动彻底删除。`

    modal.confirm({
      title: <span className="font-normal">删除目录“{catalog.name}”？</span>,
      content,
      okText: '删除',
      okButtonProps: { danger: true },
      maskClosable: true,
      onOk: async () => {
        await ApiDelete(catalog.id).then((res) => message.success(res.data.message))
      },
    })
  }
  function handleActionClick(action: string, catalog: ApiMenuData) {
    console.log('点击了操作:', action, catalog)
  }
  const apiCopy = async (values) => {
    //    const response=   await ApiCopy(values)
    //   if (response.data.success){
    //     message.success(response.data.message)
    //   }
    // }
    message.success('该功能待开发，有点麻烦')
  }

  const commonActionMenuItems: MenuProps['items'] = [
    {
      key: 'rename',
      label: '重命名',
      icon: <PencilIcon size={14} />,
      onClick: (ev) => {
        ev.domEvent.stopPropagation()
        handleActionClick('rename', catalog)
        void show(ModalRename, {
          formData: { id: catalog.id, name: catalog.name },
        })
      },
    },
    {
      key: 'copy',
      label: '复制',
      icon: <CopyIcon size={14} />,
      onClick: (ev) => {
        ev.domEvent.stopPropagation()
        apiCopy(catalog)
      },
    },
    {
      key: 'move',
      label: '移动到',
      icon: <FolderInputIcon size={14} />,
      onClick: (ev) => {
        ev.domEvent.stopPropagation()
        handleActionClick('move', catalog)
        const args = {
          menuItemType: catalog.type,
          formData: { id: catalog.id },
        }
        console.log('移动到 args', args)
        void show(ModalMoveMenu, args)
      },
    },
  ]

  const folderActionMenu: MenuProps['items'] = [
    {
      key: 'create',
      label: tipTitle,
      icon: <FileIcon size={14} style={{ color: token.colorPrimary }} type={createType} />,
      onClick: (ev) => {
        stopEventPropagation(ev)
        createTabItem(createType)
      },
    },

    { type: 'divider' },

    ...commonActionMenuItems,

    { type: 'divider' },

    {
      key: 'new',
      label: '添加子目录',
      icon: <FolderPlusIcon size={14} />,
      onClick: (ev) => {
        stopEventPropagation(ev)
        void show(ModalNewCatalog, {
          formData: { parentId: catalog.id, type: catalog.type },
        })
      },
    },

    { type: 'divider' },

    {
      key: 'delete',
      label: '删除',
      icon: <TrashIcon size={14} />,
      onClick: (ev) => {
        stopEventPropagation(ev)
        confirmDelete(catalog)
      },
    },
  ]

  const fileActionMenu: MenuProps['items'] = [
    ...commonActionMenuItems,

    { type: 'divider' },

    {
      key: 'delete',
      label: '删除',
      icon: <TrashIcon size={14} />,
      onClick: (ev) => {
        ev.domEvent.stopPropagation()

        const { title } = API_MENU_CONFIG[getCatalogType(catalog.type)]

        modal.confirm({
          title: (
            <span className="font-normal">
              删除{title}“{catalog.name}”？
            </span>
          ),
          content: `${
            catalog.type === MenuItemType.ApiDetail
              ? '该接口和该接口下的用例都'
              : catalog.type === MenuItemType.Doc
                ? '文档'
                : catalog.type === MenuItemType.ApiSchema
                  ? '该数据模型'
                  : ''
          }将移至回收站，30 天后自动彻底删除。`,
          okText: '删除',
          okButtonProps: { danger: true },
          maskClosable: true,
          onOk: async () => {
            await ApiDelete(catalog.id).then((res) => {
              if (res.data.success) {
                removeMenuItem({ id: catalog.id })
              }
            })
          },
        })
      },
    },
  ]

  return (
    <Dropdown
      menu={{
        items: isFolder ? folderActionMenu : fileActionMenu,
        onContextMenu: (ev) => {
          ev.preventDefault()
          ev.stopPropagation()
        },
      }}
      {...dropdownProps}
    >
      {children}
    </Dropdown>
  )
}
