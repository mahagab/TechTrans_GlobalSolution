import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, View, Text, StatusBar, Switch, Image} from 'react-native';
import { Feather } from '@expo/vector-icons'
import { DarkTheme } from '@react-navigation/native';
import Cards from './components/Cards'
import InfoCard from './components/InfoCard'
import getCurrentWeather from './api/consultApi'
import * as Location from 'expo-location'
import { EvilIcons } from '@expo/vector-icons' 
import ThemeContext from './context/ThemeContext';
import axios from 'axios';


function Index() {

   
  
  const themeHook = useState("dark");
  const [darkTheme, setDarkTheme] = useState(true)
  
  const [currentTemperature, setCurrentTemperature] = useState('31')

  const [locationCoords, setLocationCoords] = useState(null);

  const [locationName, setLocationName] = useState('Brasil, Fortaleza')
  
  const [temperatureMin, setTemperatureMin] = useState('21')
  const [temperatureMax, setTemperatureMax] = useState('32')
  const [wind, setWind] = useState('7')
  const [humidity, setHumidity] = useState('68')


  async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      }else{
        let location = await Location.getCurrentPositionAsync({})
        await setLocationCoords(location.coords)
      }
  }

  async function setCurrentWeather(){
    await getLocation()
    const data = await getCurrentWeather(locationCoords)

    // Vem da api nessa ordem [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]
    setCurrentTemperature(convertKelvinToC(data[0]))
    setTemperatureMin(convertKelvinToC(data[1]))
    setTemperatureMax(convertKelvinToC(data[2]))
    setLocationName(data[3])
    setWind(data[4])
    setHumidity(data[5])
  
  }

  function convertKelvinToC(kelvin){
    return parseInt(kelvin - 273)
  }

  useEffect(() => {
    setCurrentWeather()
  }, [])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: darkTheme ? '#220022' : '#5c536a'
        },
        themeButtonCircle:{
            alignSelf: darkTheme ? 'flex-end' : 'flex-start',
            margin: 3,
            padding: 10,
            width: 20,
            height: 20,
            borderRadius: 50,
            backgroundColor: darkTheme ? '#232634'  :'#F2F2F2', 
          },   
        temp: {
            fontSize: 35,
            color: darkTheme ? '#fff' : '#000',
        },
        lugar: {
            fontSize: 20,
            color: darkTheme ? '#fff' : '#000'
        },
        refresh: {
            position: 'absolute',
            color: darkTheme ? '#fff' : 'black',
            margin: '8%',
            alignSelf: 'flex-start'
        },
        cardContainer: {
            flexDirection: 'row',
            marginVertical: '8%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        localizationText:{
            color: darkTheme ? '#e0e0e0'  : '#000',
          },  
        infoContainer: {
            backgroundColor: darkTheme ? '#5c536a' : '#d4d1d8',
            width: '95%',
            height: '28%',
            alignItems: 'center',
            borderRadius: 30
        },
        txtCard: {
            color: darkTheme ? '#fff' : '#000',
            fontSize: 20,
            fontWeight: 'bold'
        },
        infoCard:{
            flexDirection: 'row',
            flexWrap: 'wrap',
          },    
          themeButton: {
            marginLeft: 300,
            width: 50,
            height: 50,
            borderRadius: 25,
          },
          themeButtonSquare: {
            backgroundColor: darkTheme ? '#F2F2F2'  :'#8F8F8F', 
            borderRadius: 20,
            marginTop: 30,
            marginRight: 20,
            width: 50,
            height: 25,
          },



    })

    console.disableYellowBox = true

    return (
        <ThemeContext.Provider value = {themeHook}>

        <SafeAreaView style={styles.container}>
            <StatusBar />
            <TouchableOpacity style={styles.refresh} onPress={() => setCurrentWeather()}>
                <Feather name='refresh-ccw' size={22} color={darkTheme ? 'white' : 'black'} />
            </TouchableOpacity>
            <Feather name='sun' style={{ color: 'orange', marginTop: 55 }} size={55} />

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.temp}>{currentTemperature}</Text>
                <Text style={[styles.temp, { fontSize: 20 }]}>°C</Text>
            </View>

            <Text style={styles.localizationText}>{locationName}</Text>

            <View style={styles.cardContainer}>
                <Cards title='Manhã' backgroundColor={darkTheme ? '#00b7d6' : '#3ee0ff'} temperatura={'21°'} icon={'manha'} />
                <Cards title='Tarde' backgroundColor={darkTheme ? '#f0ae30' : '#ffe265'} temperatura={'21°'} icon={'tarde'} />
                <Cards title='Noite' backgroundColor={darkTheme ? '#170b2a' : '#0f24e5'} temperatura={'21°'} icon={'noite'} />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.txtCard}>Informações Adicionais</Text>
                <View style={styles.infoCard}>
                <InfoCard title={'Vento'} variable={wind} ></InfoCard>
            <InfoCard title={'Umidade'} variable={humidity} ></InfoCard>
            <InfoCard title={'Temp. Min'} variable={temperatureMin} ></InfoCard>
            <InfoCard title={'Temp. Max'} variable={temperatureMax} ></InfoCard>
                </View>
            </View>

            <View style={styles.themeButton}>
          <View style={styles.themeButtonSquare}>
            <TouchableOpacity style={styles.themeButtonCircle} onPress={() =>darkTheme ? setDarkTheme(false) : setDarkTheme(true)}></TouchableOpacity>
          </View>
        </View>

        </SafeAreaView>
        </ThemeContext.Provider>
    );
}
export default Index
