import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { validate } from '../../helpers/validate';
import questionIcon from '../../questionIcon.svg';
import checkIcon from '../../checkIcon.svg';
import exclamationIcon from '../../exclamationIcon.svg';
import classes from './AdsForm.module.scss';

const AdsForm = ({ titleStatus, textStatus, phoneStatus, onSubmitForm }) => {

  const [advertTitle, setAdvertTitle] = useState('');
  const [advertText, setAdvertText] = useState('');
  const [advertPhone, setAdvertPhone] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const { titleStatus, textStatus, phoneStatus } = validate(advertTitle, advertText, advertPhone);

    onSubmitForm(advertTitle, advertText, advertPhone, titleStatus, textStatus, phoneStatus);

    if (!titleStatus.error && !textStatus.error && !phoneStatus.error) {
      setAdvertTitle('');
      setAdvertText('');
      setAdvertPhone('');
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
      return { 'border-color': '#fa5e5b' }
    } else {
      return { 'border-color': '#d4d8db' }
    }
  }

  return (
    <section className={classes.AdsForm}>
      <h1>Подать объявление</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div className={classes.titleFormPart}>
          <p className={classes.partTitle}>Заголовок</p>
          <div className={classes.partContent}>
            <input
              className={classes.partField}
              style={getBorderColor(titleStatus.error)}
              maxLength="140"
              value={advertTitle}
              onChange={e => setAdvertTitle(e.target.value)}
            />
            <div className={classes.partHint}>
              <img src={getStatusIcon(titleStatus.error)} alt="Состояние поля" />
              <label style={getLabelColor(titleStatus.error)}>{titleStatus.message}</label>
            </div>
          </div>
        </div>

        <div className={classes.textFormPart}>
          <p className={classes.partTitle}>Текст объявления</p>
          <div className={classes.partContent}>
            <textarea
              className={classes.partField}
              style={getBorderColor(textStatus.error)}
              maxLength="300"
              rows="5"
              value={advertText}
              onChange={e => setAdvertText(e.target.value)}
            />
            <div className={classes.partHint}>
              <img src={getStatusIcon(textStatus.error)} alt="Состояние поля" />
              <label style={getLabelColor(textStatus.error)}>{textStatus.message}</label>
            </div>
          </div>
        </div>

        <div className={classes.phoneFormPart}>
          <p className={classes.partTitle}>Телефон</p>
          <div className={classes.partContent}>
            <NumberFormat
              className={classes.partField}
              style={getBorderColor(phoneStatus.error)}
              format="+7 (###) ###-##-##"
              mask="_"
              placeholder="+7 (___) ___-__-__"
              value={advertPhone}
              onChange={e => setAdvertPhone(e.target.value)}
            />
            <div className={classes.partHint}>
              <img src={getStatusIcon(phoneStatus.error)} alt="Состояние поля" />
              <label style={getLabelColor(phoneStatus.error)}>{phoneStatus.message}</label>
            </div>
          </div>
        </div>

        <button className={"btn btn-primary"}>Подать</button>
      </form>
    </section >
  )
}

export default AdsForm;