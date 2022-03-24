import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ProductsOverViewScreen from '../screens/shop/ProductsOverviewScreen';
import colors from '../constants/Colors'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: colors.primary
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    }
}

const ProductsNavigator = createStackNavigator({
    ProductsOverView: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
    Orders: OrderScreen,
    UserProducts: UserProductsScreen,
    EditProducts: EditProductScreen
    }, 
    {
        defaultNavigationOptions: defaultNavOptions
    }
)

// const OrdersNavigator = createStackNavigator({
//     Orders: OrderScreen
//     }, 
//     {
//         defaultNavigationOptions: defaultNavOptions 
//     }
// )



export default createAppContainer(ProductsNavigator)