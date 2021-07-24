import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import { deleteProduct } from '../../store/actions/products';
import colors from '../../constants/colors';


const ProductListScreen = ({ navigation }) => {
    const userProducts = useSelector((state) => state.products.byUser);

    const onSelectPress = (item) => navigation.navigate('UserProductEdit', {data: item});

    const dispatch = useDispatch();

    return (
        <FlatList
            data={userProducts}
            renderItem={({ item }) => (
                <ProductItem
                    item={item}
                    onSelectPress={() => onSelectPress(item)}
                    leftButton={(
                        <Button
                            color={colors.primary}
                            title="Edit"
                            onPress={() => onSelectPress(item)}
                        />
                    )}
                    rightButton={(
                        <Button
                            color={colors.primary}
                            title="Delete"
                            onPress={() => {
                                dispatch(
                                    deleteProduct(item.id)
                                )
                            }}
                        />
                    )}
                />
            )}
        />
    );
};

export default ProductListScreen;
