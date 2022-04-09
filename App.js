
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Button,
  FlatList,
  Image,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';


const App = () => {

  const[movies, setMovies] = useState([]);
  const[loading, setLoading] = useState(false);

  useEffect(()=>{
    const requestMovies= async () => {
      setLoading(true)
      const req = await fetch("https://api.b7web.com.br/cinema/");
      const jsonMovies = await req.json();
  
      if(jsonMovies){
        setMovies(jsonMovies);
      }

      setLoading(false);
    }

    requestMovies();
  },[]);

  return(
    <SafeAreaView style={styles.container}>
      {loading &&
        <View style={styles.loadingArea}>
          <ActivityIndicator size='large' color='#FFFFFF'/>
          <Text style={styles.loadingText}>Carregando....</Text>
        </View>
      }
      {!loading &&
      <>
        <Text style={styles.totalMoviesText}>Total de Filmes: {movies.length}</Text>
        <FlatList 
          style={styles.list}
          data={movies}
          renderItem={({item})=>(
            <View style={styles.movieItem}>
              <Image 
                source={{uri: item.avatar}} 
                style={styles.movieImage} 
                resizeMode='contain'
              />
              <Text style={styles.movieTitle}>{item.titulo}</Text>
            </View>
          )}
          keyExtractor={item=>item.titulo}
        />
      </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#333'
  },
  totalMoviesText:{
    color: '#FFFFFF',
    fontSize:18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  movieItem: {
    marginBottom:30
  },
  movieImage: {
    height:350
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign:'center',
    marginTop: 5
  },
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#FFFFFF'
  },

});

export default App;
