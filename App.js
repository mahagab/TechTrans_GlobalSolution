import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import Lottie from 'lottie-react-native';
import mao from './mao.json'
import map from './mapa.json'
import noticia from './noticias.json'
import perigo from './chuva.json'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home'



 function App() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Lottie
        autoPlay
        style={styles.animacao}
        source={mao}
      />
      <View style={styles.cardtxt}>
      <Text style={styles.txt}> Olá! {'\n'}{'\n'} Este é o App TechTrans seu app de
        pesquisa de rotas, previsão do tempo e notícias de SP</Text>
        </View>
      <TouchableOpacity onPress={() => navigation.navigate('Map')}><Text style={styles.txtbtn}>Proxima Etapa</Text></TouchableOpacity>

    </SafeAreaView>
  );
}

function Mapa() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Lottie
        autoPlay
        style={styles.animacao}
        source={map}
      />
            <View style={styles.cardtxt}>

      <Text style={styles.txt}>Aqui você vai poder colocar sua localização
       e saber qual é a sua distancia entre o ponto de partida e o ponto de chegada.</Text>
       </View>
      <TouchableOpacity onPress={() => navigation.navigate('Perigo')}><Text style={styles.txtbtn}>Proxima Etapa</Text></TouchableOpacity>
      
    </SafeAreaView>
  );
}

function Perigo() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Lottie
        autoPlay
        style={styles.animacao}
        source={perigo}
      />      
      
      <View style={styles.cardtxt}>

      <Text style={styles.txt}>Aqui você vai ver sobre a previsão do tempo, onde você conseguirá visualizar o clima 
      para evitar perigos nas vias e não causar acidentes</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Noticia')}><Text style={styles.txtbtn}>Proxima Etapa</Text></TouchableOpacity>

    </SafeAreaView>
  );
}

function News() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Lottie
        autoPlay
        style={styles.animacao}
        source={noticia}
      />
      <View style={styles.cardtxt}></View>
      <Text style={styles.txt}>Aqui também você verá notícias atualizadas sobre o trânsito em SP.{'\n'}{'\n'}
      Vamos lá?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Index')}><Text style={styles.txtbtn2}>Entrar</Text></TouchableOpacity>

    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function Index(){
  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={App} options={{headerShown: false}} />
      <Stack.Screen name="Map" component={Mapa} options={{headerShown: false}} />
      <Stack.Screen name="Noticia" component={News} options={{headerShown: false}} />
      <Stack.Screen name="Perigo" component={Perigo} options={{headerShown: false}} />
      <Stack.Screen name="Index" component={Home} options={{headerShown: false}} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#aa00ee',
    alignItems: 'center'

  },
  animacao: {
    backgroundColor: '#aa00ee',
    width: '100%',
    height: '70%',
    marginLeft: '10%'
  },
  txt: {
    color: '#fff',
    textAlign: 'justify',
    marginHorizontal: '10%',
    fontSize: 20,
    marginBottom: "10%"
  },
  txtbtn: {
    backgroundColor: '#fff',
    textAlign: 'center',
    marginBottom: '10%',
    fontSize: 20,
    borderRadius: 20,
    padding: 15,
    width: 200
  },
  txtbtn2: {
    backgroundColor: '#fff',
    textAlign: 'center',
    marginBottom: '10%',
    fontSize: 20,
    borderRadius: 20,
    padding: 15,
    width: 200
  },
  cardtxt:{
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }

});
