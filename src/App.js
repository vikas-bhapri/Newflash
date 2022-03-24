import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


export default class  extends Component {

  state = {
    progress: 0
  }
  apiKey = process.env.REACT_APP_NEWS_API;

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <>
        <BrowserRouter>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        />
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="" pageSize={9} country="in" category="general"/>}/>
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={9} country="in" category="business"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={9} country="in" category="entertainment"/>}/>
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={9} country="in" category="health"/>}/>
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={9} country="in" category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={9} country="in" category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={9} country="in" category="technology"/>}/>
          
        </Routes>
        </BrowserRouter>
      </>
    )
  }
}
