import { useEffect,useState } from "react";
import axios from "axios";
function usePokemonList(){
const [pokemonListState,setPokemonListState] = useState({
    pokemonList : [],
    isLoading : true,
    pokedexUrl : ' https://pokeapi.co/api/v2/pokemon',
    nextUrl : '',
    prevUrl:'',
});
    async function downloadPokemons(){            
                setPokemonListState((state) =>({...state,isLoading:true}));
                const response  = await axios.get(pokemonListState.pokedexUrl);
                const pokemonResults = response.data.results;
                console.log("response is",response.data.pokemon); 
                console.log(pokemonListState);
                // setNextUrl(response.data.next);
                // setPrevUrl(response.data.previous);
                setPokemonListState((state) =>({
                    ...state
                    ,nextUrl:response.data.next,
                    prevUrl:response.data.previous
                }));
           
                const pokemonResultsPromises =  pokemonResults.map((pokemon) => axios.get(pokemon.url));
                const pokemonData = await axios.all(pokemonResultsPromises);
                console.log(pokemonData);
        
                const PokeListResult = pokemonData.map((pokeData) =>{
                    const pokemon = pokeData.data;
                    return {
                        id:pokemon.id,
                        name : pokemon.name,
                        image : (pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
                        types:pokemon.types
                    }
                });
                console.log(PokeListResult);
                setPokemonListState((state) =>({
                    ...state,
                    pokemonList:PokeListResult,
                        isLoading:false
                    }));
                //setIsLoading(false);
        
                
            }
            
    
    
      
        useEffect( ()=>{
            downloadPokemons();
},[pokemonListState.pokedexUrl]);
return [pokemonListState,setPokemonListState]
}
export default usePokemonList;