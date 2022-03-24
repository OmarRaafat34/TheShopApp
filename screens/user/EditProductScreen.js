import React, {useState, useEffect, useCallback, useReducer} from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from '../../store/actions/products'

const REDUCER_UPDATE = 'UPDATE'
const formReducer = (state, action) => {
    if(action.type === REDUCER_UPDATE) {
        const updatedValues =  {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let formIsValid  = true
        for(const key in updatedValidities) {
            formIsValid = formIsValid && updatedValidities[key]
        }
        return {
            formIsValid: formIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state
}

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, 
        {
            inputValues: {
                title: editedProduct? editedProduct.title : '',
                imageUrl: editedProduct? editedProduct.imageUrl : '',
                price: '',
                description: editedProduct? editedProduct.imageUrl : ''
            },
            inputValidities: {
                title: editedProduct? true : false,
                imageUrl: editedProduct? true : false,
                description: editedProduct? true : false,
                price: editedProduct? true : false,
            }, 
            formIsValid: editedProduct? true : false
        }
    )

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false
        if(text.trim().length > 0) {
            isValid = true
        }
        dispatchFormState(
            {
                type: REDUCER_UPDATE, 
                value: text, 
                isValid: isValid,
                input: inputIdentifier 
            })
    }
    
    const submitHandler = useCallback(() => {
        if(!formState.formIsValid) {
            Alert.alert('Wrong Input!', 'Please Check The Errors In The Form', [{Text: 'Okay'}])
        }
        if (editedProduct) {
            dispatch(productActions.updateProduct(
                prodId, 
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl
            ))
        } else {
            dispatch(productActions.createProduct(
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl, 
                +formState.inputValues.price
            ))

        }
        props.navigation.goBack()
    }, [dispatch, prodId, formState])

    useEffect (()=> {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]) 

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input} 
                        value={formState.inputValues.title} 
                        onChangeText={textChangeHandler.bind(this, 'title')} 
                        keyboardType='default' 
                        autoCorrect 
                        returnKeyType='next'
                    />
                    {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>ImageUrl</Text>
                    <TextInput 
                        style={styles.input} 
                        value={formState.inputValues.imageUrl} 
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')} 
                        keyboardType='default' 
                        autoCorrect 
                        returnKeyType='next'
                    />
                    {!formState.inputValidities.imageUrl && <Text>Please enter a valid Image!</Text>}
                </View>
                {editedProduct? null : 
                (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput 
                            style={styles.input} 
                            value={formState.inputValues.price} 
                            onChangeText={textChangeHandler.bind(this, 'price')} 
                            keyboardType='decimal-pad' 
                            returnKeyType='next'
                        />
                        {!formState.inputValidities.price && <Text>Please enter a valid price!</Text>}
                    </View>
                )} 
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} 
                        value={formState.inputValues.description} 
                        onChangeText={textChangeHandler.bind(this, 'description')} 
                        keyboardType='default' 
                        returnKeyType='done'
                    />
                    {!formState.inputValidities.description && <Text>Please enter a valid description!</Text>}
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: (() => 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                title='save'
                iconName='md-checkmark'
                onPress={submitFn}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create ({
    form: {
        margin: 20,

    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default EditProductScreen