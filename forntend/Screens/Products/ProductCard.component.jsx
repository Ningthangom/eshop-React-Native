
import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button

} from 'react-native';

// redux 
import { connect } from 'react-redux';
import * as actions from '../../redux/Actions/cartActions';
import EasyButton from '../../Shared/StyledComponent/EasyButton'
import Toast from 'react-native-toast-message'

var { width } = Dimensions.get('window');


const ProductCard = (props) => {

    const { name, price, image, countInStock } = props;


    return (
        <View style={styles.container}>

            <Image
                style={styles.image}
                resizeMode='contain'
                source={{ uri: image ? image : 'https://lh3.googleusercontent.com/proxy/PHMeEUxncFvxo71Hbw80j6G8IEv8CHaKUPMbfIAU_XfRTkc-S72ohLqMtiU0Ch-yZG9flgxaK1VXh0W4aIzZawc1Z2Yi' }}

            />
            <View style={styles.card} />
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
            </Text>
            <Text style={styles.price}>
                ${price}/kg
            </Text>
            {countInStock > 0 ? (
                <View style={{ marginBottom: 60 }}>
                    <EasyButton
                        medium primary
                        onPress={() => {
                           /*  props.addItemToCart(props) */
                           props.addItemToCart(props.id),
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: `${name} added to Cart`,
                                    text2: "Go to your cart to complete order"
                                })
                        }
                        }
                    >
                        <Text style={{ color: 'white' }}>Add</Text>
                    </EasyButton>
                </View>
            ) : <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>}

        </View>

    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => {
            dispatch(actions.addToCart({ quantity: 1, product }))
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'gainsboro'

    },
    image: {
        width: width / 2 - 20,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        borderRadius: 20,
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',

    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})

export default connect(null, mapDispatchToProps)(ProductCard);