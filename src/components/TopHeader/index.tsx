import React, {useEffect, useState} from 'react';
import {PRIMARY_BLUE_COLOR} from 'utils/constants/index.ts';
import {Avatar, Button, Flex, Switch} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined,UserOutlined,SettingOutlined, PoweroffOutlined} from '@ant-design/icons';
import {Header} from 'antd/es/layout/layout';
import {ITopHeader} from 'interfaces/design';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import ButtonGroup from 'antd/es/button/button-group';
import {logout} from 'store/accounts/accounts.slice.ts';
import {APP_ENV} from 'env/index.ts';
import {Role} from 'utils/enums';


const TopHeader: React.FC<ITopHeader> = (props) => {
    const {collapsed, setCollapsed, themeMode, setThemeMode} = props;
    const [show, setShow] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState<number>(0);
    const {isLogin, user} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > 0) {
                if (window.scrollY > lastScrollY) {
                    setShow(false);

                } else {
                    setShow(true);
                }
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);


    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Header style={{
            padding: 0,
            background: PRIMARY_BLUE_COLOR,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
            position: show ? 'sticky' : 'relative',
            top: 0,
            transition: 'all 1s',
        }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />

            <Flex gap={10} align={'center'}>
                {isLogin ? (
                    <ButtonGroup size="large">

                        <Button
                            type="primary"
                            style={{display: 'flex'}}
                            icon={<Avatar  size="small" src={`${APP_ENV.BASE_URL}images/${user?.image}`}/>}
                        >
                            <Link style={{height: '100%' , width: '100%'}} to={'/checkout/my-orders'}>
                                {user?.name}
                            </Link>
                        </Button>
                        <Button
                            type="primary"
                            icon={<PoweroffOutlined/>}
                            onClick={() => handleLogout()}
                        />
                    </ButtonGroup>

                ) : (
                    <Link to="/account/login" style={{color: 'inherit', textDecoration: 'none'}}>
                        <Button type="primary" icon={<UserOutlined/>}>
                            Увійти
                        </Button>
                    </Link>
                )}


                {
                    (user?.roles === Role.ADMIN || (user?.roles && user.roles.includes(Role.ADMIN))) && (
                        <Link to="/admin">
                            <Button type="primary" style={{ backgroundColor: '#29ab35' }} size="large" icon={<SettingOutlined />}>
                                Open Admin Panel
                            </Button>
                        </Link>
                    )
                }

            </Flex>



            <Switch
                style={{marginRight: 24}}
                checkedChildren="Light"
                unCheckedChildren="Dark"
                defaultChecked
                onChange={() => setThemeMode(!themeMode)}
            />
        </Header>
    );
};

export default TopHeader;