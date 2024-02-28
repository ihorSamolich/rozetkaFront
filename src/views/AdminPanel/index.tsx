import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined ,InfoCircleOutlined} from '@ant-design/icons';
import { Card,Typography, Col, Row, Statistic } from 'antd';
import {Column} from '@ant-design/charts';
const { Title } = Typography;

import { Table, Tag } from 'antd';
import {useOrders, useOrdersTopSoldCategories, useOrdersTopSoldProducts} from 'hooks/order';
import {IOrderTopSold} from 'interfaces/order';

interface DataType {
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
            <Row gutter={16} style={{backgroundColor: '#04dbff', padding: 20 , margin: 20, borderRadius: 20} }>
                <Title level={3}>
                    <InfoCircleOutlined />
                    <span style={{margin: 10}}>Загальна статистика:</span>
                </Title>

                <Row gutter={16} style={{width: '100%'}} >
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Товарів"
                                value={1}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Категорій"
                                value={9.3}
                                valueStyle={{ color: '#0033ff' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Idle"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Idle"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
            </Row>


            <Row gutter={16} style={{backgroundColor: '#89e8e8', padding: 20 , margin: 20, borderRadius: 20} }>
                <Title level={3}>
                    <InfoCircleOutlined />
                    <span style={{margin: 10}}>Cтатистика топ продажів за товарами та категоріями:</span>
                </Title>

                <Row gutter={16} style={{width: '100%'}} >
                    <Col span={24}>
                        <Column  {...getTopSalesConfig(topProducts)} />
                    </Col>
                    <Col span={24}>
                        <Column  {...getTopSalesConfig(topCategories)} />
                    </Col>
                </Row>
            </Row>

            <Row gutter={16} style={{backgroundColor: '#04dbff', padding: 20 , margin: 20, borderRadius: 20} }>
                <Title level={3}>
                    <InfoCircleOutlined />
                    <span style={{margin: 10}}>Останні замовлення:</span>
                </Title>
                <Row gutter={16} style={{width: '100%'}}>

                    <Table  style={{width: '100%'}} dataSource={getOrders()} pagination={false}>

                        <Table.Column title="№" dataIndex="key" key="key" />
                        <Table.Column title="Name" dataIndex="name" key="name" />
                        <Table.Column title="Phone" dataIndex="phone" key="phone" />
                        <Table.Column title="Status" dataIndex="status" key="status" />
                        <Table.Column title="Address" dataIndex="address" key="address" />

                        <Table.Column
                            width={'35%'}
                            title="Products"
                            dataIndex="products"
                            key="products"
                            render={(products: string[]) => (
                                <>
                                    {products.map((product, index) => (
                                        <Tag color={index % 2 ? 'blue' : 'green'} key={index}>
                                            {product}
                                        </Tag>
                                    ))}
                                </>
                            )}
                        />
                    </Table>
                </Row>
            </Row>
        </>
    );
};

export default AdminPanel;