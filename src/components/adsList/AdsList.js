import React, { useState } from 'react';
import classes from './AdsList.module.scss';
import phoneIcon from '../../phoneIcon.svg';
import cityIcon from '../../cityIcon.svg';

const AdsList = ({ adsList, deleteAdvertFromState }) => {
  console.log(adsList);

  const [representedPhotoIndex, setRepresentedPhotoIndex] = useState(0);

  if (!adsList.length) {
    return null
  } else {
    return (
      <section className={classes.AdsList}>
        <h2>Объявления</h2>
        {
          adsList.slice(0).reverse().map(adItem => (
            <div className={classes.adListBlock} key={adItem.id}>
              <div className={classes.adContent}>
                <h3>{adItem.title}</h3>
                <p>{adItem.text}</p>
                {adItem.photos.files.length &&
                  <div className={classes.photoBlock}>
                    <div className={classes.representPhoto}>
                      <img src={adItem.photos.urls[representedPhotoIndex]} alt={`Картинка ${representedPhotoIndex}`} />
                    </div>
                    {adItem.photos.urls.length > 1 &&
                      <div className={classes.photoList}>
                        {
                          adItem.photos.urls.map((url, index) => (
                            <img key={index} src={url} alt={`Картинка ${index}`}
                              onClick={() => setRepresentedPhotoIndex(index)} />
                          ))
                        }
                      </div>
                    }
                  </div>
                }
              </div>
              <div className={classes.adInfo}>
                <div className={classes.contactInfo}>
                  <div><img src={phoneIcon} alt="Телефон" /><span>{adItem.phone}</span></div>
                  {adItem.city && <div><img src={cityIcon} alt="Город" /><span>{adItem.city}</span></div>}
                </div>
                <button onClick={() => deleteAdvertFromState(adItem.id)}>
                  Удалить
                </button>
              </div>
            </div>
          ))
        }
      </section>
    )
  }
}

export default AdsList;