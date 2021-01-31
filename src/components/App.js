import React from 'react';
import Header from './Header';
import Main   from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import avatarDefault from '../images/profile__avatar.jpg'


export default function App() {
  const [isEditAvatarPopupOpen, openAvatarPopup] = React.useState(false);
  function handleEditAvatarClick() {
    openAvatarPopup(true);
  }


  const [isEditProfilePopupOpen, openProfilePopup] = React.useState(false);
  function handleEditProfileClick() {
    openProfilePopup(true);
  }


  const [isAddPlacePopupOpen, openPlacePopup] = React.useState(false);
  function handleAddPlaceClick() {
    openPlacePopup(true);
  }


  const [selectedCard, setSelectedCard] = React.useState(null);
  function handleCardClick(card) {
    setSelectedCard(card);
  }


  const [currentUser, setCurrentUser] = React.useState({
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: avatarDefault
  });
  React.useEffect(() => {
    api.getUserData()
    .then(userData => {
      setCurrentUser({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar
      })
    })
    .catch(error => { console.log(error); });
  }, []);



  function closeAllPopups(event) {
    openAvatarPopup(false);
    openProfilePopup(false);
    openPlacePopup(false);
    setSelectedCard(null);
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main
          onEditAvatar = {handleEditAvatarClick}
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onCardClick = {handleCardClick}
        />
        <Footer />
      </div>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        submitButtonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__field" htmlFor="avatar-link">
          <input
            id="avatar-link"
            className="form__text"
            type="url"
            name="avatar-link"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="avatar-link-error" className="form__text-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        submitButtonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__field" htmlFor="profile-name">
          <input
            id="profile-name"
            className="form__text"
            type="text"
            name="user-name"
            placeholder="Ваше имя"
            minLength="2" maxLength="40" required
          />
          <span id="profile-name-error" className="form__text-error"></span>
        </label>
        <label className="form__field" htmlFor="profile-hobby">
          <input
            id="profile-hobby"
            className="form__text"
            type="text"
            name="user-hobby"
            placeholder="Ваше хобби"
            minLength="2" maxLength="200" required
          />
          <span id="profile-hobby-error" className="form__text-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="place"
        title="Новое место"
        submitButtonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__field" htmlFor="place-name">
          <input
            id="place-name"
            className="form__text"
            type="text"
            name="place-name"
            placeholder="Название"
            minLength="1" maxLength="30" required
          />
          <span id="place-name-error" className="form__text-error"></span>
        </label>
        <label className="form__field" htmlFor="place-link">
          <input
            id="place-link"
            className="form__text"
            type="url"
            name="place-link"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="place-link-error" className="form__text-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="confirmation"
        title="Вы уверены?"
        submitButtonText="Да"
      >
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}
