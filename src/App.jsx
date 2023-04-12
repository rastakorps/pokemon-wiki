import { useState, useEffect } from 'react'
import './App.css'
import PokemonWikiImage from './img/pokemon-wiki.png'
import { Card } from './components/Card'

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemonList = async () => {
      const url = "https://pokeapi.co/api/v2/pokemon";
      //nex url https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
      const response = await fetch(url);
      const result = await response.json(); 
      setPokemons(result.results);
      console.log(result);
    }

    getPokemonList();
  }, []);

  return (
    <div className="h-screen overflow-y-scroll bg-[#3761a8]">
      <div className="h-16 bg-[#ef534f]">
        <img src={PokemonWikiImage} alt="pokemon-img" className="m-auto"/>
      </div>

      <div className="pt-40 grid grid-cols-4 gap-4">

        { pokemons.map( (pokemon, index) => (
          <Card 
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default App
