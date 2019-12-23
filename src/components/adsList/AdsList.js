import React from 'react';
import classes from './AdsList.module.scss';
import phoneIcon from '../../phoneIcon.svg';

const AdsList = ({ adsList, deleteAdvertFromState }) => {

  if (!adsList.length) {
    return null
  } else {
    return (
      <section className={classes.AdsList}>
        <h1>Объявления</h1>
        {
          adsList.slice(0).reverse().map(adItem => (
            <div className={classes.adsItem} key={adItem.id}>
              <div className={classes.adsContent}>
                <h2>{adItem.title}</h2>
                <p>{adItem.text}</p>
              </div>
              <div className={classes.adsInfo}>
                <span><img src={phoneIcon} alt="Телефон" />{adItem.phone}</span>
                <button className="btn btn-outline-danger" onClick={() => deleteAdvertFromState(adItem.id)}>
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