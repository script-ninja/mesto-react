import React from 'react';
import api from '../utils/api';
import Card from '../components/Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);


  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getCards()
    .then(cards => { setCards(cards); })
    .catch(error => { console.log(error); });
  }, []);


  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__avatar-overlay"
          onClick={props.onEditAvatar}
        >
          <img className="profile__avatar" src={currentUser.avatar} alt="Картинка профиля" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__career">{currentUser.about}</p>
          <button className="profile__edit-button" type="button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button className="profile__add-button" type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        {cards.length <= 0 && <h2 className="gallery__message gallery__message_visible">Нет добавленных фотографий</h2>}
        {cards.map(card => <Card key={card._id} card={card} onCardClick={props.onCardClick} />)}
      </section>
    </main>
  );
}
