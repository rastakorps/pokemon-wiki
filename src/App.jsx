import { useState, useEffect } from 'react'
import './App.css'
import PokemonWikiImage from './img/pokemon-wiki.png'
import { Card } from './components/Card'
import { Spinner } from './components/Spinner';
import Modal from './components/Modal';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [url, setUrl] = useState( `${import.meta.env.VITE_API_URL}/pokemon?limit=20`);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentPokemonId, setCurrentPokemonId] = useState(0);

  useEffect(() => {
    getPokemonList(url);
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [pokemons])

  useEffect(() => {
    if(!modal) {
      setCurrentPokemonId(0);
    }
  }, [modal])

  useEffect(() => {
    if(currentPokemonId > 0) {
      setModal(true);
    }
  }, [currentPokemonId])
  

  const getPokemonList = async () => {
    setLoading(true);
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

    setTimeout(() => {
      setLoading(false);
      setPokemons([...pokemons, ...newPokemons]);
    }, 1000);
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

      <div className="pt-40 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        { pokemons.length && (
          pokemons.map( pokemon => (
          <Card 
            key={pokemon.id}
            pokemon={pokemon}
            setCurrentPokemonId={setCurrentPokemonId}
            className="w-full max-w-xs"
          />
        ))
        )}
      </div>
      {loading && (
        <Spinner />
      )}
      
      
      {modal && (
        <Modal 
          setModal={setModal}
          currentPokemonId={currentPokemonId}
        /> 
      )}
    </div>
  )
}

export default App
