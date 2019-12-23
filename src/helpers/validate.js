export const validate = (tittle, text, phone) => {

  const titleStatus = {
    error: !tittle.trim().length,
    message: tittle.trim().length ? 'Заполнено' : 'Заполните поле\nНе более 140 символов'
  };

  const textStatus = {
    error: !text.trim().length,
    message: text.trim().length ? 'Заполнено' : 'Заполните поле\nНе более 300 символов'
  };

  const phoneStatus = {
    error: !phone.trim().length,
    message: !phone.trim().length ? 'Заполните поле' : 'Заполнено'
  };
  if (phone[17] === '_') {
    phoneStatus.error = true;
    phoneStatus.message = 'Неправильный формат';
  }

  return { titleStatus, textStatus, phoneStatus }
}