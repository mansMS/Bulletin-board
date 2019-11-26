import React from 'react';
import questionIcon from './questionIcon.svg';
import checkIcon from './checkIcon.svg';
import exclamationIcon from './exclamationIcon.svg';
import phoneIcon from './phoneIcon.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import NumberFormat from 'react-number-format';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    // localStorage.clear();

    if (!localStorage["items"]) {
      localStorage.setItem("items", JSON.stringify([]));
    }
    var locStorItems = JSON.parse(localStorage.getItem("items")) || [];

    this.state = {
      items: locStorItems,
      headline: '',
      text: '',
      phone: '',
      formErrors: {
        headline: 'Обязательное поле\nНе более 140 символов', 
        text: 'Не более 300 символов', 
        phone: 'Обязательное поле'
      },
      headlineValid: '',
      textValid: '',
      phoneValid: '',
      formValid: false,
      icons: {
        '': questionIcon,
        true: checkIcon,
        false: exclamationIcon,
        phoneIcon: phoneIcon
      },
      hintColor: {
        '': '#68717c',
        true: '#16c98d',
        false: '#fa5e5b'
      },
      fieldColor: {
        '': '#68717c',
        true: '#68717c',
        false: '#fa5e5b'
      }
    };

    this.handleAdvertInput = this.handleAdvertInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteAdvert = this.deleteAdvert.bind(this);
  }

  render() {
    return (
      <div className="content">
        <h4 className="header">Подать объявление</h4>
        <form onSubmit={this.handleSubmit}>

          <div className="form-element form-group-headline">
            <label className="field-header" htmlFor="newHeadline">Заголовок</label>
            <input className="field" id="newHeadline" name="headline" maxLength="140" 
              style={{borderColor: this.state.fieldColor[this.state.headlineValid]}}
              onChange={this.handleAdvertInput} value={this.state.headline} />
            <div className="hint">
              <img src={this.state.icons[this.state.headlineValid]} />
              <label style={{color: this.state.hintColor[this.state.headlineValid]}} 
                htmlFor="newHeadline">{this.state.formErrors["headline"]}</label>
            </div>
          </div>

          <div className="form-element">
            <label className="field-header" htmlFor="newText">Текст объявления</label>
            <textarea className="field" rows="5" id="newText" name="text" maxLength="500"
              style={{borderColor: this.state.fieldColor[this.state.textValid]}}
              onChange={this.handleAdvertInput} value={this.state.text}>
            </textarea>
            <div className="hint">
              <img src={this.state.icons[this.state.textValid]} />
              <label style={{color: this.state.hintColor[this.state.textValid]}}
                htmlFor="newText">{this.state.formErrors["text"]}</label>
            </div>
          </div>

          <div className="form-element">
            <label className="field-header" htmlFor="newPhone">Телефон</label>
            <NumberFormat className = "field" id="newPhone" name="phone" format="+7 (###) ###-##-##" mask="_"
              style={{borderColor: this.state.fieldColor[this.state.phoneValid]}}
              placeholder="+7 (___) ___-__-__" onChange={this.handleAdvertInput} value={this.state.phone}/>
            <div className="hint">
              <img src={this.state.icons[this.state.phoneValid]} />
              <label style={{color: this.state.hintColor[this.state.phoneValid]}}
                htmlFor="newPhone">{this.state.formErrors["phone"]}</label>
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary">Подать</button>
          </div>

        </form>

        <div className="list">
          <ListHeader items={this.state.items} />
          <TodoList items={this.state.items} deleteAdvert={this.deleteAdvert}/>
        </div>
      </div>
    );
  }

  handleAdvertInput(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  validate() {
    let validObj = {};
    validObj.fieldValidationErrors = {};
    if (!this.state.headline.length) {
      console.log(this.state.headline.length);
      validObj.headlineValid = false;
      validObj.fieldValidationErrors.headline = "Заполните поле"
    } else {
      validObj.headlineValid = true;
      validObj.fieldValidationErrors.headline = "Заполнено"
    };

    if (!this.state.text.length) {
      validObj.textValid = false;
      validObj.fieldValidationErrors.text = "Заполните поле\nНе более 300 символов"
    } else {
      validObj.textValid = true;
      validObj.fieldValidationErrors.text = "Заполнено"
    };

    if (!this.state.phone.length) {
      validObj.phoneValid = false;
      validObj.fieldValidationErrors.phone = "Заполните поле"
    } else if (this.state.phone[17] === '_') {
      validObj.phoneValid = false;
      validObj.fieldValidationErrors.phone = "Неверный формат"
    } else {
      validObj.phoneValid = true;
      validObj.fieldValidationErrors.phone = "Заполнено"
    }
    validObj.formValid = validObj.headlineValid && validObj.phoneValid;

    this.setState({ 
        formErrors: validObj.fieldValidationErrors,
        headlineValid: validObj.headlineValid,
        textValid: validObj.textValid,
        phoneValid: validObj.phoneValid,
        formValid: validObj.formValid
      });

    return validObj;
  }

  handleSubmit(e) {
    e.preventDefault();

    const validInfo = this.validate();

    console.log(this.state);

    if (!validInfo.formValid) {
      return;
    }

    const newItem = {
      headline: this.state.headline,
      text: this.state.text,
      phone: this.state.phone,
      id: Date.now()
    };

    var locStorItems = JSON.parse(localStorage["items"]);
    locStorItems.push(newItem);
    localStorage["items"] = JSON.stringify(locStorItems);

    this.setState(state => ({
      // items: state.items.concat(newItem),
      items: locStorItems,
      headline: '',
      text: '',
      phone: '',
      formErrors: {
        headline: 'Обязательное поле\nНе более 140 символов', 
        text: 'Не более 300 символов', 
        phone: 'Обязательное поле'
      },
      headlineValid: '',
      textValid: '',
      phoneValid: '',
      formValid: false
    }));
  }

  deleteAdvert(id) {
    var locStorItems = JSON.parse(localStorage["items"]);
    var i = locStorItems.length;
    while(i--){
      if(locStorItems[i]["id"] === id){
        locStorItems.splice(i,1);
      }
    }
    localStorage["items"] = JSON.stringify(locStorItems);
    this.setState(state => ({
      items: locStorItems
    }));
  }
}

class ListHeader extends React.Component {
  render() {
    if (!this.props.items.length) return "";
    return <h3 className="header">Объявление</h3>
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.slice(0).reverse().map(item => (
          <div key={item.id} className="advert">
            <div className="ad">
              <h5>{item.headline}</h5>
              <p>{item.text}</p>
            </div>
            <div className="options">
              <span><img src={phoneIcon} />{item.phone}</span>
              <button type="submit" className="btn btn-outline-danger" 
                onClick={() => this.handleDeleteAdvert(item.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  handleDeleteAdvert(id) {
    this.props.deleteAdvert(id);
  }
}

function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
