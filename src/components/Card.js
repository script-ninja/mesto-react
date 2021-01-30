export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <figure className="photo-card">
      <img className="photo-card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <figcaption className="photo-card__caption">
        <h2 className="photo-card__title" title={card.name}>{card.name}</h2>
        <button className="photo-card__like-button" type="button">{card.likes.length}</button>
        <button className="photo-card__del-button" type="button"></button>
      </figcaption>
    </figure>
  );
}
