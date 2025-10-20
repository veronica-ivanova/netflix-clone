import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const Player = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: ""
    })

    const fetchData = async () => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
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

            if (!data.results?.length) {
                throw new Error("Видео не найдено");
            }

            setApiData(data.results[0]);
        } catch (error) {
            console.log("Ошибка загрузки API", error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="player">
            <img src={back_arrow_icon} alt="back arrow" onClick={()=>{navigate(-2)}}/>
            <div className="video-wrapper">
                <iframe
                    src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' loading="lazy" allowFullScreen>
                </iframe>
            </div>
            <div className="player-info">
                <p>{apiData.published_at.slice(0,10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}
export default Player;
