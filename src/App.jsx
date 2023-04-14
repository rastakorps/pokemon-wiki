import { useState, useEffect } from 'react'
import './App.css'
import PokemonWikiImage from './img/pokemon-wiki.png'
import { Card } from './components/Card'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [url, setUrl] = useState( `${import.meta.env.VITE_API_URL}/pokemon?limit=20`);

  useEffect(() => {
    getPokemonList(url);
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [pokemons])

  const getPokemonList = async () => {
    const response = await fetch(url);
    const result = await response.json();
    setUrl(result.next);
    const pokemonsList = result.results;
    
    const newPokemons = pokemonsList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length -2];
      const pictureUrl = `${import.meta.env.VITE_SPRITES_URL}/${id}.png`;
      return {id, name, pictureUrl};
    });

    setPokemons([...pokemons, ...newPokemons]);
  }

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight) {
      getPokemonList();
    } 
  }

  return (
    <div className="overflow-y-scroll bg-[#3761a8]">
      <div className="h-16 bg-[#ef534f]">
        <img src={PokemonWikiImage} alt="pokemon-img" className="m-auto"/>
      </div>

      <div className="pt-40 grid grid-cols-4 gap-4 ">

        { pokemons.length && (
          pokemons.map( pokemon => (
          <Card 
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))
        )}
      </div>
    </div>
  )
}

export default App
