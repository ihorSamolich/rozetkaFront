import React, {useEffect} from 'react';
import {Divider, Row, Col, Flex, Typography, Button, Rate} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {getProductById} from 'store/products/products.actions.ts';
import {CompanyInformation, ProductDescriptions, ProductPictures} from 'components/index.ts';
import {ExclamationCircleOutlined, ShoppingCartOutlined, CarOutlined, EditOutlined} from '@ant-design/icons';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import {IProductItem} from 'interfaces/product';
import {addToBasket} from 'store/basket/basket.actions.ts';
const { Title,Text } = Typography;

const deliveryInfo: DescriptionsProps['items'] = [
    {
        label: <span><CarOutlined/> <Text strong>ДОСТАВКА</Text></span>,
        children: <ul>
            <li>
                <Text type="secondary"> Самовивіз з наших магазинів безкоштовно</Text>
            </li>
            <li>
                <Text type="secondary"> У відділення Нової пошти за тарифом НП</Text>
            </li>
            <li>
                <Text type="secondary"> При замовленні від 2000 грн доставка безкоштовна</Text>
            </li>
        </ul>,
    },
];
const defaultProductData : IProductItem = {
    categoryId: 0,
    name: 'Без назви',
    description: 'Немає опису',
    discount: 0,
    id: 0,
    photos: [],
    price: '0',
    quantity: 0,
    country: null,
    manufacturer: null,
};

const ProductDetail : React.FC = () => {
    const {productId} = useParams();
    const dispatch = useAppDispatch();
    const {selectedItem} = useAppSelector(state => state.product);
    const navigate = useNavigate();

    const {
        name,
        country,
        manufacturer,
        description,
        photos,
        price,
        discount,
        quantity,
    } = selectedItem || defaultProductData;

    useEffect(() => {
        dispatch(getProductById(Number(productId)));
    }, [dispatch, productId]);

    const handleAddProductToBasket = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (selectedItem?.id) {
            dispatch(addToBasket({productId: selectedItem.id, count: 1}));
        }
    };

    const handleEditProduct = () => {
        navigate(`/product/edit/${productId}`);
    };

    return (
        <>
            <Divider/>
            {
                selectedItem &&
                <Row>
                    <Col span={8}>
                        <ProductPictures photos={photos}/>
                    </Col>

                    <Col style={{paddingLeft: 20}} span={16}>
                        <Flex justify={'space-between'}>
                            <Row>
                                <Title style={{marginBottom: 0}} level={2}>{name}</Title>
                                <EditOutlined onClick={handleEditProduct} style={{marginLeft: 5, color: 'blue', cursor: 'pointer'}} />
                            </Row>

                            <Flex gap={20}>
                                <Title level={2} type={'success'} style={{margin: '0px'}}>{Number(price).toFixed(2)} грн</Title>
                                {
                                    discount > 0 &&
                                    <Title level={5} style={{margin: '0px'}} delete type="danger">
                                        {(Number(price) / (1 - discount / 100)).toFixed(2)}{' грн'}
                                    </Title>
                                }
                            </Flex>
                        </Flex>

                        <Divider/>

                        <Flex vertical gap={20}>
                            <Rate allowHalf defaultValue={2.5} />
                            {quantity > 0 ? (
                                <>
                                    <Text type="success">Товар в наявності {quantity} шт.</Text>
                                    <Button
                                        style={{maxWidth: 300}}
                                        type={'primary'}
                                        icon={<ShoppingCartOutlined/>}
                                        onClick={handleAddProductToBasket}
                                        key="addToCart"
                                    >
                                        До кошика
                                    </Button>
                                </>

                            ) : (
                                <>
                                    <Text type="danger">Немає в наявності!</Text>
                                    <Button type="primary" icon={<ExclamationCircleOutlined/>} disabled>
                                        Недоступний
                                    </Button>
                                </>
                            )}

                            <Descriptions bordered items={deliveryInfo} />
                        </Flex>
                    </Col>
                    <Col span={24}>
                        <Divider orientation="left">ХАРАКТЕРИСТИКИ</Divider>
                        <ProductDescriptions
                            name={name}
                            description={description}
                            price = {Number(price)}
                            country = {country}
                            manufacturer ={manufacturer}
                        />
                        <CompanyInformation/>
                    </Col>
                </Row>
            }
        </>
    );
};

export default ProductDetail;