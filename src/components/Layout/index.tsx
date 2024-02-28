import React, { useState} from 'react';
import {Layout, theme, ConfigProvider, Menu, MenuProps} from 'antd';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {TopHeader} from 'components';
import Sider from 'antd/es/layout/Sider';
import {AppstoreAddOutlined, AppstoreOutlined, BuildOutlined, HomeOutlined} from '@ant-design/icons';
import Basket from 'components/Basket';
import {useAppSelector} from 'hooks/redux';
import {Role} from 'utils/enums';

const {Footer, Content } = Layout;

const userItems: MenuProps['items'] = [
    {
        key: '/',
        icon: <HomeOutlined />,
        label: (
            <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                Home
            </NavLink>
        ),
    },
    {
        key: '/categories/',
        icon: <AppstoreOutlined/>,
        label: 'Categories',
        children: [
            {
                key: '/categories',
                icon: <BuildOutlined/>,
                label: (
                    <NavLink
                        to="/categories"
                        style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        All categories
                    </NavLink>
                ),
            },
        ],
    },
    {
        key: '/products/',
        icon: <AppstoreOutlined/>,
        label: 'Products',
        children: [
            {
                key: '/products',
                icon: <AppstoreAddOutlined/>,
                label: (
                    <NavLink
                        to="/products"
                        style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        All product
                    </NavLink>
                ),
            },
        ],
    },
];

const adminItems: MenuProps['items'] = [
    {
        key: '/',
        icon: <HomeOutlined />,
        label: (
            <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                Home
            </NavLink>
        ),
    },
    {
        key: '/categories/',
        icon: <AppstoreOutlined/>,
        label: 'Categories',
        children: [
            {
                key: '/categories',
                icon: <BuildOutlined/>,
                label: (
                    <NavLink
                        to="/categories"
                        style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        All categories
                    </NavLink>
                ),
            },
            {
                key: '/categories/create',
                icon: <AppstoreAddOutlined/>,
                label: (
                    <NavLink
                        to="admin/categories/create"
                        style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        Create category
                    </NavLink>
                ),
            },
        ],
    },
    {
        key: '/products/',
        icon: <AppstoreOutlined/>,
        label: 'Products',
        children: [
            {
                key: '/products',
                icon: <AppstoreAddOutlined/>,
                label: (
                    <NavLink
                        to="/products"
                        style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        All product
                    </NavLink>
                ),
            },
            {
                key: '/products/create',
                icon: <AppstoreAddOutlined/>,
                label: (
                    <NavLink
                        to="admin/products/create"
                        style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        Create product
                    </NavLink>
                ),
            },
        ],
    },
];

const SiteLayout : React.FC = () => {
    const [themeMode, setThemeMode] = useState<boolean>(true);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { user} = useAppSelector(state => state.account);
    const location = useLocation();

    return (
        <ConfigProvider theme={{algorithm: themeMode ? theme.defaultAlgorithm : theme.darkAlgorithm}}>
            <Layout style={{minHeight: '100vh'}}>
                <Basket/>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Menu
                        selectedKeys={[location.pathname]}
                        style={{position: 'sticky', top: 0}}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['/']}
                        items={user?.role === Role.ADMIN ? adminItems : userItems}
                    />
                </Sider>

                <Layout>
                    <TopHeader collapsed={collapsed} setCollapsed={setCollapsed} themeMode={themeMode} setThemeMode={setThemeMode} />
                    <Content
                        style={{
                            margin: '0 24px',
                            padding: '0 24px',
                            minHeight: 280,
                            maxHeight: '100%',
                        }}
                    >
                        <Outlet/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default SiteLayout;

