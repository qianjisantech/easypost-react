'use client'
import {Layout, Menu, Row, Col, Typography, Input, Button, Image, Pagination} from 'antd'
import {
    SearchOutlined,
    PlusOutlined,
    FolderAddOutlined,
    StarOutlined,
    LinkOutlined,
    FileOutlined, EyeOutlined
} from '@ant-design/icons'
import styles from './CollaborationDashboard.module.css'
import {useState} from "react";
import AddOrUpdateCategoryModal from "@/app/(main)/main/collaborationdashboard/components/AddOrUpdateCategoryModal";
import AddOrUpdateProjectModal from "@/app/(main)/main/collaborationdashboard/components/AddOrUpdateProjectModal";

const {Header, Sider, Content} = Layout
const {Text} = Typography
const {Search} = Input

// 菜单项数据
const menuItems = [
    {
        key: '1',
        label: '中国产研中心',
        count: 23,
        children: [
            {
                key: '1-1',
                label: '客户渠道',
                count: 12
            },
            {
                key: '1-2',
                label: '网点经营',
                count: 8
            },
            {
                key: '1-3',
                label: '操作中心',
                count: 3
            }
        ]
    },
    {
        key: '2',
        label: '东南亚产研中心',
        count: 5,
        children: [
            {
                key: '2-1',
                label: '新加坡',
                count: 3
            },
            {
                key: '2-2',
                label: '印度尼西亚',
                count: 2
            }
        ]
    },
    {
        key: '3',
        label: '新开国家产研中心',
        count: 47,
        children: [
            {
                key: '3-1',
                label: '中东',
                count: 20
            },
            {
                key: '3-2',
                label: '巴西',
                count: 15
            },
            {
                key: '3-3',
                label: '墨西哥',
                count: 12
            }
        ]
    },
    {
        key: '4',
        label: '综合技术架构中心',
        count: 8,
        children: [
            {
                key: '4-1',
                label: '前端架构组',
                count: 3
            },
            {
                key: '4-2',
                label: '后端架构组',
                count: 5
            }
        ]
    },
    {
        key: '5',
        label: '算法中心',
        count: 8,
        children: [
            {
                key: '5-1',
                label: 'NLP组',
                count: 4
            },
            {
                key: '5-2',
                label: 'CV组',
                count: 4
            }
        ]
    }
]


// 看板卡片数据
const dashboardCards = [
    {
        title: '客户渠道',
        description: '当前运行3个ES节点，版本7.17.5，存储容量15TB，平均查询延迟120ms，最大文档数2.4亿。',
        img: '/assets/svg/project/book-svgrepo-com.svg',
        views: 128,  // 确保有views字段
        favorites: 24 // 确保有favorites字段
    },
    {
        title: '操作中心',
        description: '部署DeepSeek-R1模型，参数规模70B，推理延迟350ms，支持中文理解、代码生成等能力。',
        img: '/assets/svg/project/book-svgrepo-com.svg',
        views: 128,  // 确保有views字段
        favorites: 24 // 确保有favorites字段
    },
    {
        title: '云仓',
        description: '集成GPT极简风格-4-turbo模型，月调用量12万次，平均响应时间1.2s，支持多轮对话和长文本理解。',
        img: '/assets/svg/project/book-svgrepo-com.svg',
        views: 128,  // 确保有views字段
        favorites: 24 // 确保有favorites字段
    },
    {
        title: '网络经营',
        description: '生产环境K8s集群，包含32个节点，运行容器实例156个，平均CPU利用率45%，内存使用率62%。',
        img: '/assets/svg/project/book-svgrepo-com.svg',
        views: 128,  // 确保有views字段
        favorites: 24 // 确保有favorites字段
    },
    {
        title: '运输',
        description: '生产环境K8s集群，包含32个节点，运行容器实例156个，平均CPU利用率45%，内存使用率62%。',
        img: '/assets/svg/project/book-svgrepo-com.svg',
        views: 128,  // 确保有views字段
        favorites: 24 // 确保有favorites字段
    },
    {
        title: '服务质量',
        description: '生产环境K8s集群，包含32个节点，运行容器实例156个，平均CPU利用率45%，内存使用率62%。',
        img: '/assets/svg/project/book-svgrepo-com.svg',
        views: 128,  // 确保有views字段
        favorites: 24 // 确保有favorites字段
    },
    {
        title: '网点经营',
        description: '生产环境K8s集群，包含32个节点，运行容器实例156个，平均CPU利用率45%，内存使用率62%。',
        img: '/assets/svg/project/book-svgrepo-com.svg',
        views: 128,  // 确保有views字段
        favorites: 24 // 确保有favorites字段
    },
    {
        title: '运力规划',
        description: '生产环境K8s集群，包含32个节点，运行容器实例156个，平均CPU利用率45%，内存使用率62%。',
        img: '/assets/svg/project/book-svgrepo-com.svg',
        views: 128,  // 确保有views字段
        favorites: 24 // 确保有favorites字段
    },
    {
        title: '基础资料',
        description: '生产环境K8s集群，包含32个节点，运行容器实例156个，平均CPU利用率45%，内存使用率62%。',
        img: '/assets/svg/project/book-svgrepo-com.svg',
        views: 128,  // 确保有views字段
        favorites: 24 // 确保有favorites字段
    },
]

export default function CollaborationDashboard() {
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [projectModalVisible, setProjectModalVisible] = useState(false);
    const [selectedMenuKey, setSelectedMenuKey] = useState('all');
    const handleAddCategory = (categoryName) => {
        console.log('新增分类:', categoryName);
        setCategoryModalVisible(false);
        // 这里添加实际创建分类的逻辑
    };

    const handleAddProject = (projectData) => {
        console.log('新增项目:', projectData);
        setProjectModalVisible(false);
        // 这里添加实际创建项目的逻辑
    };
    return (
        <Layout className={styles.layout} style={{
            background: 'white',
            display: 'flex',
            height: '100%',
            flexDirection: 'column'
        }}>
            {/* 顶部导航栏 */}
            <Header style={{
                background: 'white',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                zIndex: 1,
                position: 'sticky',
                top: 0,
                height: 64,
                flexShrink: 0
            }}>

                {/* 搜索框 - 居中 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    maxWidth: 600,
                    margin: '0 auto'
                }}>
                    <Search
                        placeholder="搜索公开项目"
                        allowClear
                        size="middle"
                        style={{ width: '100%' }}
                        enterButton={false}
                    />
                </div>

                {/* 新增项目按钮 */}

            </Header>

            {/* 主内容区域 */}
            <Layout style={{
                display: 'flex',
                flexDirection: 'row',
                background: 'white',
                flex: 1,
                minHeight: 0
            }}>
                {/* 左侧菜单 */}
                <Sider
                    width={280}
                    className={styles.sider}
                    style={{
                        background: 'white',
                        borderRight: 'none', // 去掉右侧边框线
                        height: '100%',
                        flexShrink: 0,
                        overflow: 'hidden', // 修改为hidden
                    }}
                >
                    <div style={{
                        paddingTop: 16, // 添加与右侧标题相同的顶部内边距
                        height: '100%'
                    }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['all']}
                            defaultOpenKeys={['1', '2']} // 默认展开前两个一级菜单
                            className={styles.menu}
                            style={{
                                background: 'white',
                                borderRight: 'none',
                                height: '100%',
                                paddingTop: 0,
                                overflow: 'auto',  // 菜单内容可滚动

                            }}
                            theme="light"
                            selectedKeys={[selectedMenuKey]}
                        >
                            {/* 固定的全部分类项 */}
                        <Menu.Item
                            onClick={() => setSelectedMenuKey('all')}
                            key="all"
                            style={{
                                margin: 0,
                                width: '100%',
                                padding: '12px 12px',
                                borderBottom: 'none'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                color: '#333',
                                fontSize: 14,
                                lineHeight: '22px'
                            }}>
                                <Text>全部分类</Text>
                                <Text style={{fontSize: 14}}>{menuItems.reduce((sum, item) => sum + item.count, 0)}</Text>
                            </div>
                        </Menu.Item>

                        {/* 可滚动的其他分类项 */}
                        {menuItems.map(item => (
                            <Menu.SubMenu
                                key={item.key}
                                title={
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        color: '#333',
                                        fontSize: 14,
                                        lineHeight: '22px'
                                    }}>
                                        <Text>{item.label}</Text>
                                        <Text style={{fontSize: 14}}>{item.count}</Text>
                                    </div>
                                }
                            >
                                {item.children?.map(child => (
                                    <Menu.Item
                                        key={child.key}
                                        style={{
                                            paddingLeft: '32px !important', // 二级菜单缩进
                                            height: '40px',
                                            alignItems: 'center',
                                            lineHeight: '40px'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '100%'
                                        }}>
                                            <Text>{child.label}</Text>
                                            <Text style={{fontSize: 12, color: '#999'}}>{child.count}</Text>
                                        </div>
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        ))}
                            {/* 新增分类按钮 - 固定在底部 */}
                            <div style={{
                                padding: '16px 12px',
                                borderTop: '1px solid #f0f0f0',
                                flexShrink: 0
                            }}>
                                <Button
                                    type="default"
                                    icon={<FolderAddOutlined/>}
                                    onClick={() => setCategoryModalVisible(true)}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        height: 'auto',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        color: '#666'
                                    }}
                                >
                                    新增
                                </Button>
                            </div>
                    </Menu>

                    </div>
                </Sider>
                {/* 右侧内容 */}
                <Layout style={{
                    background: 'white',
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0

                }}>
                    <Content className={styles.content} style={{
                        background: 'white',
                        padding: '16px 16px',
                        flex: 1,
                        minHeight: 0,
                        overflow: 'auto'
                    }}>
                        {/* 新增的标题区域 */}
                        <div style={{
                            marginBottom: 16,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            minWidth: 0

                        }}>
                            <Text style={{ fontSize: 20 }}>
                                {selectedMenuKey === 'all' ? '全部分类' :
                                    menuItems.find(item => item.key === selectedMenuKey)?.label || '全部分类'}
                            </Text>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setProjectModalVisible(true)}
                                className={styles.newProjectButton}
                            >
                                新增项目
                            </Button>
                        </div>

                        <Row gutter={[12, 12]}>
                            {dashboardCards.map((card, index) => (
                                <Col key={index} xs={24} sm={12} md={8}>
                                    <div
                                        style={{
                                            background: 'white',
                                            padding: 16,
                                            borderRadius: 8,
                                            border: '1px solid #e8e8e8',
                                            height: 180,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            boxShadow: 'none',
                                            position: 'relative'

                                        }}
                                        className={styles.cardContainer}
                                    >
                                        {/* 图片和标题 */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12,
                                            marginBottom: 12
                                        }}>
                                            <div
                                            style={{
                                                position: 'absolute',
                                                width: '60px',
                                                height: '60px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#a6cad7',
                                                borderRadius: '10%',
                                            }}>

                                            </div>
                                            <Image
                                                src={card.img}
                                                width={60}
                                                height={60}
                                                preview={false}
                                                style={{
                                                    alignItems: 'center',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: 500,
                                                color: '#1a1a1a'
                                            }}>
                                                {card.title}
                                            </Text>
                                        </div>

                                        {/* 详细描述 */}
                                        <div style={{flex: 1}}>
                                            <Text style={{
                                                fontSize: 13,
                                                lineHeight: 1.5,
                                                color: '#666'
                                            }}>
                                                {card.description}
                                            </Text>
                                        </div>
                                        <div className={styles.statsContainer}>
                                      <span className={styles.statItem}>
                        <EyeOutlined style={{fontSize: 12, color: '#999'}}/>
                         <span className={styles.statNumber}>{card.views}</span>
                          </span>
                                            <span className={styles.statItem}>
                                <StarOutlined style={{fontSize: 12, color: '#999'}}/>
                              <span className={styles.statNumber}>{card.favorites}</span>
                            </span>
                                        </div>
                                        {/* 图标按钮 - 只在悬停时显示 */}
                                        {/*在卡片组件中的操作按钮部分修改为*/}
                                        <div className={styles.cardActions}>
                                            <Button
                                                size={"small"}
                                                type="text"
                                                icon={<StarOutlined/>}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('收藏:', card.title);
                                                }}
                                                className={styles.actionButton}
                                            >
                                                <span className={styles.buttonText}>收藏</span>
                                            </Button>
                                            <Button
                                                size={"small"}
                                                type="text"
                                                icon={<LinkOutlined/>}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('链接:', card.title);
                                                }}
                                                className={styles.actionButton}
                                            >
                                                <span className={styles.buttonText}>链接</span>
                                            </Button>
                                            <Button
                                                size={"small"}
                                                type="text"
                                                icon={<FileOutlined/>}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('查看文档:', card.title);
                                                }}
                                                className={styles.actionButton}
                                            >
                                                <span className={styles.buttonText}>查看文档</span>
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Content>

                    {/* 分页区域 - 固定高度 */}
                    <div style={{
                        padding: '16px 24px',
                        background: 'white',
                        flexShrink: 0 // 防止分页区域被压缩
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            maxWidth: '100%'
                        }}>
                            <Text type="secondary" style={{fontSize: 14}}>
                                共计 50 个项目
                            </Text>
                            <Pagination
                                current={1}
                                total={50}
                                pageSize={10}
                                showQuickJumper={true}
                                showSizeChanger={true}
                                onChange={(page) => console.log('Page changed:', page)}
                            />
                        </div>
                    </div>
                </Layout>
            </Layout>
            {/* 添加弹窗组件 */}
            <AddOrUpdateCategoryModal
                visible={categoryModalVisible}
                onCancel={() => setCategoryModalVisible(false)}
                onOk={handleAddCategory}
            />

            <AddOrUpdateProjectModal
                visible={projectModalVisible}
                onCancel={() => setProjectModalVisible(false)}
                onOk={handleAddProject}
            />
        </Layout>
    )
}