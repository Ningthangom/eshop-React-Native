
import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import ProductCard from './ProductCard.component';

var {width} = Dimensions.get('window')

const ProductList = (props) => {

    const { item } = props;

    return(
        <TouchableOpacity 
        style={{width: '50%'}}
        onPress={() => 
            props.navigation.navigate("Product Detail", {item: item})
            } 

            > 

            <View style={{width: width/2, backgroundColor: 'green', color: ''}}> 
                <ProductCard key={item.id}{...item}/>
            </View>


        </TouchableOpacity>

    )
}

export default ProductList;