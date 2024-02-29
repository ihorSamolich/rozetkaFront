import React from 'react';
import {Row, Table, Tag, Typography} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import {DataType} from 'views/AdminPanel';

interface IOrdersTableProps{
    data:  DataType[] | undefined
}

const OrdersTable : React.FC<IOrdersTableProps> = ({data}) => {
    return (
        <Row gutter={16} style={{backgroundColor: '#04dbff', padding: 20 , margin: 20, borderRadius: 20} }>
            <Typography.Title level={3}>
                <InfoCircleOutlined />
                <span style={{margin: 10}}>Останні замовлення:</span>
            </Typography.Title>
            <Row gutter={16} style={{width: '100%'}}>

                <Table  style={{width: '100%'}} dataSource={data} pagination={false}>

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
    );
};

export default OrdersTable;