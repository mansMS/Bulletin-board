import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import validate from '../../helpers/validate';
import questionIcon from '../../questionIcon.svg';
import checkIcon from '../../checkIcon.svg';
import exclamationIcon from '../../exclamationIcon.svg';
import classes from './AdsForm.module.scss';
import cities from '../../cities';

const AdsForm = ({ titleStatus, textStatus, phoneStatus, cityStatus, onSubmitForm }) => {

  const [advertTitle, setAdvertTitle] = useState('');
  const [advertText, setAdvertText] = useState('');
  const [advertPhone, setAdvertPhone] = useState('');
  const [advertCity, setAdvertCity] = useState('');
  const [advertPhotos, setAdvertPhotos] = useState({ files: [], urls: [] });

  const handleSubmit = e => {
    e.preventDefault();

    const { titleStatus, textStatus, phoneStatus, cityStatus } =
      validate(advertTitle, advertText, advertPhone, advertCity);

    onSubmitForm(advertTitle, advertText, advertPhone, advertCity, advertPhotos,
      titleStatus, textStatus, phoneStatus, cityStatus);

    if (!titleStatus.error && !textStatus.error && !phoneStatus.error) {
      setAdvertTitle('');
      setAdvertText('');
      setAdvertPhone('');
      setAdvertCity('');
      setAdvertPhotos({ files: [], urls: [] });
    }
  }

  const getStatusIcon = error => {
    if (error === null) {
      return questionIcon
    } else if (error) {
      return exclamationIcon
    } else {
      return checkIcon
    }
  }

  const getLabelColor = error => {
    if (error === null) {
      return { color: '#68717c' }
    } else if (error) {
      return { color: '#fa5e5b' }
    } else {
      return { color: '#16c98d' }
    }
  }

  const getBorderColor = error => {
    if (error === true) {
      return { 'borderColor': '#fa5e5b' }
    } else {
      return { 'borderColor': '#d4d8db' }
    }
  }

  const addPhoto = e => {
    const newFiles = [...advertPhotos.files, ...e.target.files];
    const newUrls = newFiles.map(file => (
      URL.createObjectURL(file)
    ));

    setAdvertPhotos({ files: newFiles, urls: newUrls });

  }

  const removePhoto = index => {
    const { files: newFiles, urls: newUrls } = advertPhotos;
    newFiles.splice(index, 1);
    newUrls.splice(index, 1);

    setAdvertPhotos({ files: newFiles, urls: newUrls });
  }

  return (
    <section className={classes.AdsForm}>
      <h2>Подать объявление</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <div className={[classes.adFormBlock, classes.titleBlock].join(' ')}>
          <p className={classes.adTitle}>Заголовок</p>
          <div className={classes.adContent}>
            <input
              className={[classes.adInput, classes.tittleInput].join(' ')}
              style={getBorderColor(titleStatus.error)}
              maxLength="140"
              value={advertTitle}
              onChange={e => setAdvertTitle(e.target.value)}
            />
            <div className={classes.adBlockHint}>
              <img src={getStatusIcon(titleStatus.error)} alt="Состояние поля" />
              <label style={getLabelColor(titleStatus.error)}>{titleStatus.message}</label>
            </div>
          </div>
        </div>

        <div className={[classes.adFormBlock, classes.textBlock].join(' ')}>
          <p className={classes.adTitle}>Текст объявления</p>
          <div className={classes.adContent}>
            <textarea
              className={[classes.adInput, classes.contentInput].join(' ')}
              style={getBorderColor(textStatus.error)}
              maxLength="300"
              rows="5"
              value={advertText}
              onChange={e => setAdvertText(e.target.value)}
            />
            <div className={classes.adBlockHint}>
              <img src={getStatusIcon(textStatus.error)} alt="Состояние поля" />
              <label style={getLabelColor(textStatus.error)}>{textStatus.message}</label>
            </div>
          </div>
        </div>

        <div className={[classes.adFormBlock, classes.phoneBlock].join(' ')}>
          <p className={classes.adTitle}>Телефон</p>
          <div className={classes.adContent}>
            <NumberFormat
              className={[classes.adInput, classes.phoneInput].join(' ')}
              style={getBorderColor(phoneStatus.error)}
              format="+7 (###) ###-##-##"
              mask="_"
              placeholder="+7 (___) ___-__-__"
              value={advertPhone}
              onChange={e => setAdvertPhone(e.target.value)}
            />
            <div className={classes.adBlockHint}>
              <img src={getStatusIcon(phoneStatus.error)} alt="Состояние поля" />
              <label style={getLabelColor(phoneStatus.error)}>{phoneStatus.message}</label>
            </div>
          </div>
        </div>

        <div className={[classes.adFormBlock, classes.cityBlock].join(' ')}>
          <p className={classes.adTitle}>Город</p>
          <div className={classes.adContent}>
            <div className={[classes.adInput, classes.cityInput].join(' ')}>
              <label>
                <select
                  style={getBorderColor(cityStatus.error)}
                  value={advertCity}
                  onChange={e => setAdvertCity(e.target.value)}
                >
                  <option style={{ display: 'none' }} />
                  {cities.map(city => <option key={city.id}>{city.city}</option>)}
                </select>
              </label>
              {advertCity &&
                <button
                  type="button"
                  onClick={e => {
                    setAdvertCity('');
                    e.currentTarget.blur()
                  }}
                >
                  <span>&times;</span>
                </button>
              }
              <span className={classes.selectArrow}>&#8249;</span>

            </div>

            {cityStatus.error === false && (
              <div className={classes.adBlockHint}>
                <img src={getStatusIcon(cityStatus.error)} alt="Состояние поля" />
                <label style={getLabelColor(cityStatus.error)}>{cityStatus.message}</label>
              </div>
            )}
          </div>
        </div>

        <div className={[classes.adFormBlock, classes.photoBlock].join(' ')}>
          <label htmlFor="image_uploads">Прикрепить фото</label>
          <input
            type="file" id="image_uploads" name="image_uploads"
            accept=".jpg, .jpeg, .png" multiple onChange={e => addPhoto(e)}>
          </input>

          {advertPhotos.urls &&
            <div className={classes.previewPhotos}>
              {advertPhotos.urls.map((photoURL, index) => (
                <div className={classes.previewPhotoItem} key={index}>
                  <img src={photoURL} height="52" alt={`Картинка ${index}`} />
                  <div className={classes.previewPhotoOptions}>
                    <div className={classes.photoTitle}>{advertPhotos.files[index].name}</div>
                    <div className={classes.removePhoto} onClick={() => removePhoto(index)}>Удалить</div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>

        <div className={[classes.adFormBlock, classes.sendBlock].join(' ')}>
          <button onClick={e => e.target.blur()}>Подать</button>
        </div>


      </form>
    </section >
  )
}

export default AdsForm;