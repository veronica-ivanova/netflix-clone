import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import {useEffect, useRef} from "react";

const TitleCards = ({title, category}) => {

    const cardsRef = useRef(null);

    const handleWheel = (event) => {
        event.preventDefault();
        if (cardsRef.current) {
            cardsRef.current.scrollLeft += event.deltaY;
        }
    }

    useEffect(() => {
        const cards = cardsRef.current;
        if (!cards) return;

        cards.addEventListener('wheel', handleWheel);
        return () => cards.removeEventListener('wheel', handleWheel);
    },[])

    return (
        <div className="title-сards">
            <h2>{title || "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {cards_data.map((card, index) => {
                    return <div className="card" key={index}>
                        <img src={card.image} alt=""/>
                        <p>{card.name}</p>
                    </div>
                })}
            </div>
        </div>
    )
}
export default TitleCards;