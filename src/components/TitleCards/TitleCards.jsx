import './TitleCards.css'
import {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";

const TitleCards = ({title, category}) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef(null);
    const location = useLocation();

    const fetchData = async () => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
                {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                    },
                }
            )
            if (!res.ok) {
                throw new Error(`Ошибка ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            setApiData(data.results);
        } catch (error) {
            console.log("Ошибка загрузки API", error)
        }
    }

    const handleWheel = (event) => {
        event.preventDefault();
        if (cardsRef.current) {
            cardsRef.current.scrollLeft += event.deltaY;
        }
    }

    useEffect(() => {
        fetchData();

        const cards = cardsRef.current;
        if (!cards) return;

        cards.addEventListener('wheel', handleWheel);
        return () => cards.removeEventListener('wheel', handleWheel);
    },[])

    return (
        <div className="title-сards">
            <h2>{title || "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} state={{from: location.pathname}} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt=""/>
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}
export default TitleCards;