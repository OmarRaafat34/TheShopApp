import React from 'react'
import {FlatList, Button, Alert} from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import * as productActions from '../../store/actions/products'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()
    const editProductHandler = (id) => {
        props.navigation.navigate('EditProducts',{productId: id})
    }
    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', 
            [
                {text: 'No', style: 'default'},
                {text: 'Yes', style: 'destructive', 
                onPress: () => {dispatch(productActions.deleteProduct(id))}}
            ])
    }
    return (
        <FlatList 
            data={userProducts} 
            keyExtractor={item=> item.id} 
            renderItem={itemData=> 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect= {() => {editProductHandler(itemData.item.id)}}
                >
                    <Button 
                        color={Colors.primary} 
                        title='Edit' 
                        onPress={()=> {editProductHandler(itemData.item.id)}}
                    />
                    <Button 
                        color={Colors.primary} 
                        title='Delete' 
                        onPress={() => {deleteHandler(itemData.item.id)}}
                    />
                </ProductItem>
            }
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerRight: (() =>  
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            title='Add'
            iconName='md-create'
            onPress={() => {
                navData.navigation.navigate('EditProducts')
            }}
            />
        </HeaderButtons>  
        ) 
    } 
}

export default UserProductsScreen