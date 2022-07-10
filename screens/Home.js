import { View, Text, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import HeaderTabs from '../components/HeaderTabs'
import { SaferAreaView } from '../components/SaferAreaView'
import SearchBar from '../components/SearchBar'
import Categories from '../components/Categories'
import RestaurantItems, { localRestaurants } from '../components/RestaurantItems'
import {YELP_API_KEY} from '../config';


export default function Home() {

  const [activeTab,setActiveTab] = useState('Delivery')
  const [restaurantData, setRestaurantData] = useState(localRestaurants)
  const [city, setCity] = useState('Chicago')

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;    

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => {
        setRestaurantData(
          //json.businesses
          json.businesses.filter((business) => 
            business.transactions.includes(activeTab.toLowerCase()) 
          )
        )
        //console.log(json.businesses)
      }
      );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SaferAreaView>
      <View style={{backgroundColor: 'white', padding: 15}}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
        <SearchBar cityHandler={setCity}/>
      </View>
      <ScrollView showVerticalScrowIndicator={false}>
        <Categories/>
        <RestaurantItems restaurantData={restaurantData}/>
      </ScrollView>
    </SaferAreaView>
  )
}