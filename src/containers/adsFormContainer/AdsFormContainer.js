import React, { useState } from 'react';
import AdsForm from '../../components/adsForm';

const AdsFormContainer = ({ addAdvertToState }) => {
  const [titleStatus, setTitleStatus] = useState({
    error: null,
    message: 'Обязательное поле \n Не более 140 символов'
  });
  const [textStatus, setTextStatus] = useState({
    error: null,
    message: 'Обязательное поле \n Не более 300 символов'
  });
  const [phoneStatus, setPhoneStatus] = useState({
    error: null,
    message: 'Обязательное поле'
  });
  const [cityStatus, setCityStatus] = useState({
    error: null,
    message: ''
  });

  const onSubmitForm = (advertTitle, advertText, advertPhone, advertCity, advertPhotos,
    titleStatus, textStatus, phoneStatus, cityStatus) => {

    setTitleStatus(titleStatus);
    setTextStatus(textStatus);
    setPhoneStatus(phoneStatus);
    setCityStatus(cityStatus);

    if (!titleStatus.error && !textStatus.error && !phoneStatus.error) {
      const newAdvert = {
        title: advertTitle,
        text: advertText,
        phone: advertPhone,
        city: advertCity,
        photos: advertPhotos,
        id: Date.now()
      };

      addAdvertToState(newAdvert);

      setTitleStatus({ error: null, message: 'Обязательное поле\nНе более 140 символов' });
      setTextStatus({ error: null, message: 'Обязательное поле\nНе более 300 символов' });
      setPhoneStatus({ error: null, message: 'Обязательное поле' });
      setCityStatus({ error: null, message: '' });
    }
  }

  return (
    <AdsForm
      titleStatus={titleStatus}
      textStatus={textStatus}
      phoneStatus={phoneStatus}
      cityStatus={cityStatus}
      onSubmitForm={onSubmitForm}
    />
  )
}

export default AdsFormContainer;