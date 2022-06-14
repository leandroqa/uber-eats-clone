import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'
import HeaderTabs from '../components/HeaderTabs'
import { SaferAreaView } from '../components/SaferAreaView'
import SearchBar from '../components/SearchBar'
import Categories from '../components/Categories'

export default function Home() {
  return (
    <SaferAreaView>
      <View style={{backgroundColor: 'white', padding: 15}}>
        <HeaderTabs/>
        <SearchBar/>
      </View>
      <Categories/>
    </SaferAreaView>
  )
}