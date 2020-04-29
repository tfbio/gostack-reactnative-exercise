import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from './services/api';



export default function App() {
  const [repository,setRepository] = useState([]);

  useEffect(()=>{api.get('/repositories').then(response=>{
    setRepository(response.data)
  })},
  []);

  async function handleLikeRepository(id) {
    const apiResponse =await api.post(`/repositories/${id}/like`);
    const apiData = apiResponse.data;
    console.log(apiData);
    
    const repositoryUpdate  = repository.map(repo => {
      if( repo.id === id ){
        console.log('repo do teste foi encontrado');
        return apiData;
      }else{
        console.log('repo do test não é este ou não foi encontrado no map!');
        return repo;
      }
    });

    console.log('Saindo do map/if e usando setRepository');
    console.log(repositoryUpdate);
    console.log('usando agora setRepository');
    setRepository(repositoryUpdate);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
      <FlatList
        data={repository}
        keyExtractor={repository => repository.id}
        renderItem={({ item: repo }) => (
        
          <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>
              {repo.title}
            </Text>

            <View style={styles.techsContainer}>
              {repo.techs.map(tech => (
                <Text key={tech} style={styles.tech}>
                  {tech}
                </Text>
              ))} 
            </View>

            <View style={styles.likesContainer}>
              <Text style={styles.likeText} testID={`repository-likes-${repo.id}`}>
                {`${repo.likes} curtida${repo.likes ? 's':' '}`}
              </Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text 
                style={styles.buttonText}
                onPress={() => handleLikeRepository(repo.id)}
                testID={`like-button-${repo.id}`}
              >
                Like
              </Text>
            </TouchableOpacity>


          </View>
        )}
      />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    maxWidth: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    
  },
});
