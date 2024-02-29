import React from 'react';
import {Divider, Row, Spin} from 'antd';
import OrdersTable from 'components/OrdersTable';

const UserOrders : React.FC = () => {
    return (
        <Spin >
            <Row gutter={16}>
                <Divider orientation="left">МОЇ ЗАМОВЛЕННЯ</Divider>

                <OrdersTable data={undefined}/>
            </Row>
        </Spin>
    );
};

export default UserOrders;