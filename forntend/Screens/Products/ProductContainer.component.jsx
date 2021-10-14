
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList, Dimensions  } from 'react-native';
import ProductList from './ProductList.component'
import { Container, Header, Icon, Item, Input, Text} from 'native-base';
import SearchedProducts from './Search.component';
import Banner from '../../Shared/Banner';
import CategoryFilter from './categoryFilter.component'



var {height} = Dimensions.get('window');
// import data 
const data = require('../../assets/data/products.json');
const productCate = require('../../assets/data/categories.json')

const ProductContainer =() => {
  
    const [products, setProducts] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [focus, setFocus] = useState();


    // categories variables 
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [productCategory, setProductCategory] = useState([]);


    useEffect(() => {
        setProducts(data);
        setProductFilter(data);
        setFocus(false);
        setCategories(productCate);
        setActive(-1);
        setInitialState(data);

        return () => {
            setProducts([]);
            setProductFilter([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState([]);
        }
    }, []);



    // product related functions 
    const SearchProduct = (text) => {
        setProductFilter(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    }

    const openList = () => {
        setFocus(true);

    }

    const onBlur = () => {
        setFocus(false)
    }
  
    // categories related functions 
    const changeCategory = (cate) => {
        {
            cate ==='all' ?
            [setProductCategory(initialState), setActive(true)]
            : 
            [setProductCategory(
                products.filter((i) => i.category.$oid === cate),
                setActive(true)
            )]
        }
    }

    return (
        <Container>
            <Header searchBar rounded> 
            <Item> 
                <Icon name = "ios-search"/>
                <Input
                 placeholder = "Search"
                 onFocus={openList}
                 onChangeText = {(text) => SearchProduct(text)}/>
                 

                 {focus == true ? (
                     <Icon onPress={onBlur} name = 'ios-close'/>
                 ): null }
               
            </Item>
            </Header>

            { focus == true ? (
                   <SearchedProducts 

                   productFilter= {productFilter}

               />
            ) : (
                <View>
                    <View> 
                        <Banner />
                    </View>
                        <CategoryFilter 
                        categories={categories} 
                        categoryFilter={changeCategory}
                        productCategory = { productCategory}
                       active={active}
                       setActive={setActive}
                        />
                    <View style = {styles.listContainer}> 
                        <FlatList
                            numColumns = {2}
                            
                            data = {products}
                            renderItem = {({item}) => 
                            <ProductList 
                                key={item.id}
                                item = {item}

                            />}
                            keyExtractor= {item => item.name}
                        /> 
                
                </View>

            </View>

            )}           
                
        </Container> 
    )
}

const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    listContainer: {
      height: height,
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  });



export default ProductContainer;