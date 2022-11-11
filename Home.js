import React, { useState, useEffect, useRef } from 'react';
import {
	Text, View, StyleSheet,
	Image, SafeAreaView,
	TouchableOpacity, ScrollView,
	StatusBar, Linking,
	FlatList, TextInput,
	localStorage
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconBot from 'react-native-vector-icons/MaterialCommunityIcons';
import {
	useFonts,
	Lato_400Regular,
	Lato_700Bold,
} from '@expo-google-fonts/lato';
import axios from 'axios';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import querystring from 'query-string'
import Clima from './Clima'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import config from './config';




console.disableYellowBox = true;




function Noticia() {

	let [fontsLoaded] = useFonts({
		Lato_400Regular,
		Lato_700Bold,

	});


	return (
		<SafeAreaView style={styles.noticia}>
			<StatusBar />
			<View style={styles.bar}>

				<Text style={{ color: 'white', fontFamily: 'Lato_700Bold', fontSize: 30 }}>Notícias Diárias</Text>
			</View>

			<ScrollView style={styles.scrollView}>

				<TouchableOpacity style={styles.btn} onPress={() => {
					Linking.openURL('https://g1.globo.com/sp/campinas-regiao/noticia/2022/10/31/grupos-protestam-nas-rodovias-anhanguera-e-sp-340-na-regiao-de-campinas-contra-resultado-das-urnas-apos-derrota-de-bolsonaro.ghtml');
				}}>
					<Image style={styles.image} source={{ uri: 'https://s2.glbimg.com/2eT_VYGkgQZTUnJcPGX6rZkFUWo=/0x0:1600x900/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/a/b/2jhyOLQ9itKikd1tPD3Q/whatsapp-image-2022-10-31-at-16.43.31.jpeg' }} />
					<Text style={styles.txtn}>Grupos protestam na Anhanguera, Bandeirantes e SP-340,
						na região de Campinas, contra resultado das urnas após derrota de Bolsonaro
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btn} onPress={() => {
					Linking.openURL('https://www1.folha.uol.com.br/cotidiano/2022/10/com-chuva-sp-tem-transito-lento-e-avenida-fechada-por-queda-de-arvore.shtml');
				}}>
					<Image style={styles.image} source={{ uri: 'https://f.i.uol.com.br/fotografia/2022/08/27/1661643933630aac9d462b8_1661643933_3x2_lg.jpg' }} />
					<Text style={styles.txtn}>Com chuva, SP tem trânsito lento e avenida fechada por queda de árvore
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btn} onPress={() => {
					Linking.openURL('https://mobilidadesampa.com.br/2022/10/rodovia-ayrton-senna-transito-nesta-segunda-dia-31/');
				}}>
					<Image style={styles.image} source={{ uri: 'https://mobilidadesampa.com.br/wp-content/uploads/2015/06/Ayrton-Senna-660x370.jpg' }} />
					<Text style={styles.txtn}>Rodovia Ayrton Senna: Trânsito nesta segunda, dia 31
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btn} onPress={() => {
					Linking.openURL('https://noticias.r7.com/sao-paulo/onibus-pega-fogo-na-zona-sul-de-sao-paulo-e-atrapalha-transito-31102022');
				}}>
					<Image style={styles.image} source={{ uri: 'https://img.r7.com/images/onibus-pega-fogo-na-zona-sul-de-sp-e-atrapalha-transito-31102022082202604?dimensions=771x420' }} />
					<Text style={styles.txtn}>Ônibus pega fogo na zona sul de São Paulo e atrapalha trânsito
					</Text>
				</TouchableOpacity>

			</ScrollView>
		</SafeAreaView>
	);
}

function Mapa() {
	const mapEl=useRef(null);
	const [origin,setOrigin]=useState(null);
	const [destination,setDestination]=useState(null);
	const [distance,setDistance]=useState(null);


	useEffect(() => {
		(async function () {
			const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
			if (status === 'granted') {
				let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
				setOrigin({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.00922,
					longitudeDelta: 0.00421
				})
			} else {
				throw new Error('Location permission not granted');
			}
		})();
	}, []);


	return (
		<SafeAreaView>
			<MapView
				style={styles.scrmap}
				initialRegion={origin}
				showsUserLocation={true}
				zoomEnabled={false}
				loadingEnabled={true}
				ref={mapEl}
			>
				{destination &&
  <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={config.googleApi}
          strokeWidth={3}
          onReady={result=>{
          setDistance(result.distance);
         mapEl.current.fitToCoordinates(
             result.coordinates,{
                 edgePadding:{
                     top:50,
                     bottom:50,
                     left:50,
                     right:50
                 }
             }
         );
        }
      }
  />
}
			</MapView>
			<View style={styles.pesquisa}>
			<GooglePlacesAutocomplete
          placeholder='Para onde vamos?'
          onPress={(data, details = null) => {
          setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421
          });
      }}
      query={{
          key: config.googleApi,
          language: 'pt-br',
      }}
      enablePoweredByContainer={false}
      fetchDetails={true}
      styles={{
		listView:{
			backgroundColor: '#fff',
			zIndex: 10
		},
		container:{
			position: 'absolute',
			width: '100%',
		}

	  }}
  />
  			
				{ distance && 
				<View style={styles.distanciatxt}>
				<Text style={styles.txt}>Distância: {distance.toFixed(2).replace('.', ',')} KM</Text>
				<Text style={styles.txt}>Há possibilidade de conter trechos{'\n'}               lentos em seu trajeto</Text>

				</View>
}

			</View>

		</SafeAreaView>
	)
}


function Pesquisa() {

	return (
		<SafeAreaView style={styles.container}>
			<Text>em breve</Text>
		</SafeAreaView>
	);
}

const Tab = createBottomTabNavigator();

export default function Index() {
	return (
		<NavigationContainer independent={true}>
			<Tab.Navigator
				screenOptions={({ route }) => ({


					tabBarIcon: ({ color }) => {
						let iconName;

						switch (route.name) {
							case 'Mapa':
								iconName = 'map';
								break;
							case 'Noticias':
								iconName = 'newspaper-variant-outline';
								break;
							case 'Clima':
								iconName = 'weather-cloudy';
							default:
								iconName = 'weather-cloudy';
								break;
						}

						return <IconBot name={iconName} size={30} color={color} />;
					},
				})}
				tabBarOptions={{
					activeTintColor: '#aa00ee',
					inactiveTintColor: '#555',
					tabBarStyle: [
						{
							display: "flex"
						},
						null
					],
				}}
			>
				<Tab.Screen name="Mapa" component={Mapa} options={{ headerShown: false }} />
				<Tab.Screen name="Noticias" component={Noticia} options={{ headerShown: false }} />
				<Tab.Screen name="Clima" component={Clima} options={{ headerShown: false }} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#aa00ee',
	},
	containerList: {
		flex: 1,
		backgroundColor: '#aa00ee',

	},
	image: {
		width: "100%",
		height: 250,
		padding: 20,
		borderRadius: 10
	},
	bar: {
		backgroundColor: '#8800bb',
		fontSize: 30,
		width: "100%",
		height: "10%",
		padding: 15,
		color: "#f5f5f5",
		flexDirection: 'row',
		justifyContent: 'space-between'

	},
	list: {
		flex: 1,
	},
	noticia: {
		flex: 1,
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
	},
	scrollView: {
		backgroundColor: '#aa00ee',
	},
	btn: {
		backgroundColor: '#f4f4f4',
		padding: 10,
		borderRadius: 10,
		marginVertical: "5%",
		width: '95%',
		alignItems: 'center',
		marginLeft: '3%'
	},
	txtn: {
		padding: 10,
		fontSize: 20,
		fontFamily: 'Lato_400Regular'
	},
	input: {
		height: 50,
		backgroundColor: '#fff',
		margin: 30,
		borderRadius: 10,
		fontSize: 19,
		paddingLeft: 15,
		paddingRight: 15,
		color: '#000',
		width: '90%'
	},
	searchArea: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	cardContainer: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: "5%",
		backgroundColor: "#f5f5f5",
		borderRadius: 10,
		width: "100%",
		alignItems: 'center',
	},
	txtr: {
		backgroundColor: '#cc0000',
		color: 'white',
		padding: 8,
		borderRadius: 15
	},
	status: {
		marginRight: "30%",

	}, scrmap: {
		minHeight: '80%'
	},
	pesquisa: {
		minHeight: '20%'
	},
	distanciatxt: {

		marginTop: '15%',
		alignItems: 'center',
		justifyContent: 'center'

	},
	txt:{
		fontSize: 20,
		fontWeight: 'bold'
	},


});