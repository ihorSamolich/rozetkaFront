import React from 'react';
import { CheckSquareOutlined, ArrowUpOutlined ,InfoCircleOutlined, RiseOutlined} from '@ant-design/icons';
import {Card, Typography, Col, Row, Statistic, Divider} from 'antd';
import {Column} from '@ant-design/charts';
const { Title } = Typography;
import {useOrders, useOrdersCount, useOrdersTopSoldCategories, useOrdersTopSoldProducts} from 'hooks/order';
import {IOrderTopSold} from 'interfaces/order';
import {useCategoriesCount} from 'hooks/categories';
import {useProductsCount} from 'hooks/products';
import {useAccountsCount} from 'hooks/users';
import OrdersTable from 'components/OrdersTable';

export interface DataType {
    key: React.Key;
    name: string;
    phone: string;
    status: string;
    address: string;
    products: string[];
}

const AdminPanel : React.FC = () => {
    const {data : dataOrders} = useOrders();
    const {data : topProducts} =  useOrdersTopSoldProducts();
    const {data : topCategories} =  useOrdersTopSoldCategories();
    const {data : categoriesCount} =  useCategoriesCount();
    const {data : productsCount} =  useProductsCount();
    const {data : ordersCount} =  useOrdersCount();
    const {data :accountsCount} =  useAccountsCount();

    const getOrders = (): DataType[] | undefined => {
        return dataOrders?.map((order, index) => ({
            key: index + 1,
            name: order.customerName,
            phone: order.customerPhone,
            status: order.orderStatus,
            address: order.postAddress,
            products: order.products,
        }));
    };

    const getTopSalesConfig = (items: IOrderTopSold[] | undefined) => {
        return {
            data: items || [],
            height: 400,
            xField: 'name',
            yField: 'count',
        };
    };

    return (
        <>
            <Divider orientation="left">ПАНЕЛЬ АДМІНІСТРАТОРА</Divider>
            <Row gutter={16} style={{backgroundColor: '#04dbff', padding: 20 , margin: 20, borderRadius: 20} }>
                <Title level={3}>
                    <InfoCircleOutlined />
                    <span style={{margin: 10}}>Загальна статистика:</span>
                </Title>

                <Row gutter={16} style={{width: '100%'}} >
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Категорій"
                                value={categoriesCount?.count}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Товарів"
                                value={productsCount?.count}
                                valueStyle={{ color: '#0033ff' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Замовлень"
                                value={ordersCount?.count}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Зареєстрованих користувачів"
                                value={accountsCount?.count}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<CheckSquareOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
            </Row>


            <Row gutter={16} style={{backgroundColor: '#89e8e8', padding: 20 , margin: 20, borderRadius: 20} }>
                <Title level={3}>
                    <RiseOutlined />
                    <span style={{margin: 10}}>Cтатистика топ продажів за товарами:</span>
                </Title>

                <Row gutter={16} style={{width: '100%'}} >
                    <Col span={24}>
                        <Column  {...getTopSalesConfig(topProducts)} />
                    </Col>

                </Row>
            </Row>

            <Row gutter={16} style={{backgroundColor: '#00ffa6', padding: 20 , margin: 20, borderRadius: 20} }>
                <Title level={3}>
                    <RiseOutlined />
                    <span style={{margin: 10}}>Cтатистика топ продажів за категоріями:</span>
                </Title>

                <Row gutter={16} style={{width: '100%'}} >
                    <Col span={24}>
                        <Column  {...getTopSalesConfig(topCategories)} />
                    </Col>
                </Row>
            </Row>

            <OrdersTable data={getOrders()}></OrdersTable>
        </>
    );
};

export default AdminPanel;