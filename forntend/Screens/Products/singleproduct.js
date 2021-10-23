import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet, Text, ScrollView, Button} from 'react-native';

import {Left, Right, Container, H1} from 'native-base';


// REDUX 
import {connect} from 'react-redux';
import * as actions from '../../redux/Actions/cartActions'


const SingleProduct = (props) => {
    const [item, setItem ] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');


    return (
      <Container style={styles.container}> 
        <ScrollView style={{marginBottom: 80, padding: 5}} >
            <View>
                <Image 
                source={{ uri: item.image ? item.image 
                    : 'https://www.cdc.gov/foodsafety/images/comms/features/GettyImages-1247930626-500px.jpg'
                 }}
                 resizeMode="contain"
                 style={styles.image}
            />
            <View style={styles.contentContainer}>
                <H1 style={styles.contentHeader}> {item.name}</H1>
                <Text style= {styles.contentText}> brand: {item.brand}</Text>
                {/* todo: description, price and availability */}
            </View>
            </View>
        </ScrollView>
        <View style={styles.bottonContainer}> 
            <Left>
                 <Text style={styles.price}>${item.price}</Text>
            </Left>
            <Right>
                <Button style={{marginLeft: 50}} title="Add"
                    onPress={() =>
                        props.addItemToCard(item)
                    }
                />
            </Right>

        </View>
      </Container>



    )
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
    },
    imageContainer: {
        backgroundColor: 'white', 
        padding: 5,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: 'center',

    },
    contentHeader: {
        fontWeight: 'bold', 
        marginBottom: 20
        
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold', 
        marginBottom:20
    },
    bottonContainer: {
        flexDirection: 'row', 
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color:'red'
    }
})


const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCard: (product) => {
            dispatch(actions.addToCart({quantity: 1, product}))
        }
    }
}
export default connect(null, mapDispatchToProps)(SingleProduct);