import React, { Component } from 'react';
import AdsFormContainer from '../../containers/adsFormContainer';
import AdsList from '../adsList';
import classes from './App.module.scss';

class App extends Component {

  state = {
    adsList: []
  }

  componentDidMount() {
    // localStorage.clear();
    if (!localStorage["adList"]) {
      localStorage.setItem("adList", JSON.stringify([]));
    }
    this.setState({
      adsList: JSON.parse(localStorage["adList"])
    })
  }

  addAdvertToState(newAd) {
    var localStorageAdList = JSON.parse(localStorage["adList"]);
    localStorageAdList.push(newAd);
    localStorage["adList"] = JSON.stringify(localStorageAdList);

    this.setState({ adsList: localStorageAdList });
  }

  deleteAdvertFromState(id) {
    var localStorageAdList = JSON.parse(localStorage["adList"]);
    localStorageAdList = localStorageAdList.filter(adItem => adItem.id !== id);
    localStorage["adList"] = JSON.stringify(localStorageAdList);

    this.setState({ adsList: localStorageAdList });
  }

  render() {
    return (
      <div className={classes.App} >
        <AdsFormContainer addAdvertToState={this.addAdvertToState.bind(this)} />
        <AdsList adsList={this.state.adsList} deleteAdvertFromState={this.deleteAdvertFromState.bind(this)} />
      </div>
    )
  }
}

export default App;