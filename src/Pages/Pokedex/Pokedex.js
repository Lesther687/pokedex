import React, {useEffect, useState} from "react";
import './styles.css';
import {getPokemon, obtenerPokemons} from "../../Servicios/Pokemon";
import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";

function Pokedex() {
    const [datosPokemon, setDatosPokemon] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const initialURL = 'https://pokeapi.co/api/v2/pokemon'

    useEffect(() => {
        async function fetchData() {
            let respuesta = await obtenerPokemons(initialURL)
            console.log(respuesta)
            setNextUrl(respuesta.next);
            setPrevUrl(respuesta.previous);
            await loadingPokemon(respuesta.results);
            setLoading(false);
        }
        fetchData();
    }, [])

    //Funcion proxima url con pokemons
    const next = async () => {
        setLoading(true);
        let data = await obtenerPokemons(nextUrl);
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    //Funcion url prvia con pokemons
    const prev = async () => {
        if (!prevUrl) return;
        setLoading(true);
        let data = await obtenerPokemons(prevUrl);
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    //funcion que devuelve una matriz con los datos cargados de los pokemon
    const loadingPokemon = async (data) => {
        let _pokemonData = await Promise.all(
            data.map(async pokemon => {
                let pokemonRecord = await getPokemon(pokemon.url)
                return pokemonRecord
            })
        );
        setDatosPokemon(_pokemonData);
    };
    return(
        <>
            <div className="contenedor">
                {loading ? <Loading/> : (
                    <>
                        <div className="btn">
                            <button onClick={prev}>Prev</button>
                            <button onClick={next}>Next</button>
                        </div>
                        <div className="grid-container">
                            {datosPokemon.map((pokemon, i) => {
                                return <Card key={i} pokemon={pokemon} />
                            })}
                        </div>
                        <div className="btn">
                            <button onClick={prev}>Prev</button>
                            <button onClick={next}>Next</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Pokedex;