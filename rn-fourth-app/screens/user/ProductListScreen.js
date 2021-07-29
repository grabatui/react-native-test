import React from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import { deleteProduct } from '../../store/actions/products';
import colors from '../../constants/colors';


const ProductListScreen = ({ navigation }) => {
    const userProducts = useSelector((state) => state.products.byUser);

    const onSelectPress = (item) => navigation.navigate('UserProductEdit', {
        data: item,
        title: item.title,
    });

    const dispatch = useDispatch();

    const onPressDelete = (itemId) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this item?',
            [
                {
                    text: 'No',
                    style: 'default',
                },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => (
                        dispatch(
                            deleteProduct(itemId)
                        )
                    )
                }
            ]
        );
    };

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
                            onPress={() => onPressDelete(item.id)}
                        />
                    )}
                />
            )}
        />
    );
};

export default ProductListScreen;
