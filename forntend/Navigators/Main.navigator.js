

import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

// Stack 
import HomeNavigator from './HomeNavigator'
import CartNavigator from './CartNavigator'
import CartIcon from '../Shared/CartIcon';
import UserNavigator from './UserNavigator'
import AdminNavigator from './AdminNavigator'


// authentication
import AuthGloble from '../contextAPI/store/AuthGloble'


const Tab = createBottomTabNavigator();

const Main = () => {

    const context = useContext(AuthGloble);

    return (
        <Tab.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: "#e91e63",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon name="shopping-cart" color={color} size={30} />
                            {/* <Text> Cart Icon</Text> */}
                            <CartIcon />
                        </View>

                    ),
                    headerShown: false,
                }}
            />
            {context.stateUser.user.isAdmin == true ?
            (  <Tab.Screen
              name="Admin"
              component={AdminNavigator}
              options={{
                  tabBarIcon: ({ color }) => (

                      <Icon name="cog" color={color} size={30} />
                  ),
                  headerShown: false,
              }}
          />) : null }
           
               {/*  <Tab.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    tabBarIcon: ({ color }) => (

                        <Icon name="cog" color={color} size={30} />
                    ),
                    headerShown: false,
                }}
            /> */}
          
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" color={color} size={30} />
                    ),
                    headerShown: false,
                }}
            />

        </Tab.Navigator>
    )
}



export default Main;