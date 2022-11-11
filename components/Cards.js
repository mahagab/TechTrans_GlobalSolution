import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { DarkTheme } from '@react-navigation/native';
import Cards from './Cards'
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';



const Index = (props) => {

    console.disableYellowBox = true

    const Icon = () => {
        if (props.icon === 'manha') {
            return  <Fontisto name="day-cloudy" size={40} color="white" />
        }
        if (props.icon === 'tarde') {
            return <Fontisto name="day-cloudy" size={40} color="white" />
        }
        if (props.icon === 'noite') {
            return <Fontisto name="night-alt-cloudy" size={40} color="white" />
        }
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: props.backgroundColor,
            width: 110,
            height: 250,
            padding: 20,
            borderRadius: 25,
            marginHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center'
        },
        temp: {
            fontSize: 35,
            color: DarkTheme ? '#fff' : '#000',
            justifyContent: 'flex-end',
            alignItems: 'baseline',
            marginTop: '100%'
        },
        hora: {
            fontSize: 35,
            color: DarkTheme ? '#fff' : '#000',

        },
        lugar: {
            fontSize: 20,
            color: DarkTheme ? '#fff' : '#000'
        },
        refresh: {
            position: 'absolute',
            color: DarkTheme ? '#fff' : 'yellow',
            margin: 30,
            alignSelf: 'flex-start'
        }


    })



    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.hora, { fontSize: 20 }]}>{props.title}</Text>
            <Icon></Icon>
            <Text style={[styles.temp, { fontSize: 20 }]}>{props.temperatura}</Text>
        </SafeAreaView>
    );
}

export default Index