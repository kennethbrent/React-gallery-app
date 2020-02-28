import React, {Component} from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';

//flickr
import {flickrKey} from './config';

//components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';



class App extends Component {

  state={
    photos:[],
    noResults:null,
    isLoading:true,
    search: '',
    atlanta: [],
    golf: [],
    coding: []
  }

  //fetch images to return photo array and set state
  fetchImages = (dataStore,searchTerm, cb) =>{
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${searchTerm}&per_page=24&format=json&nojsoncallback=1`
    fetch(url).then((response)=>{
      response.json().then((data)=>{
        this.setState({ [dataStore]: data.photos.photo, isLoading: false}, cb)
      })
    }).catch(error => this.setState({error, isLoading: false}))
  }

  //fetch default NAV link images on component did mount
  componentDidMount(){
    this.fetchImages('atlanta','atlanta')
    this.fetchImages('golf','golf')
    this.fetchImages('coding','coding')
  }

  ///handle search from form submit or url param and store photos in state
    //set value of noResults based on length of photos array 
  handleSearch = (searchTerm) => {
    this.setState({
      photos: [],
      search: searchTerm,
      isLoading: true,
    }, ()=>{
      this.fetchImages('photos', this.state.search, ()=>{
        if(this.state.photos.length === 0) {
          this.setState({noResults: true})
        }else if(this.state.photos.length > 0) {
          this.setState({noResults: null})
        }
      })
    });
  }

 

  render(){
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm handleSearch={this.handleSearch}/>
          <Nav handleSearch={this.handleSearch} />
          <Switch>
            <Route exact path='/' render={()=> <PhotoContainer state={this.state} photos={this.state.atlanta}/>}/>
            <Route exact path='/search/atlanta' render={()=> <PhotoContainer state={this.state} photos={this.state.atlanta}/>}/>
            <Route exact path='/search/golf' render={()=> <PhotoContainer state={this.state} photos={this.state.golf}/>}/>
            <Route exact path='/search/coding' render={()=> <PhotoContainer state={this.state} photos={this.state.coding}/>}/>
            <Route path='/search/:searchterm' render={({match})=> <PhotoContainer state={this.state} photos={this.state.photos} match={match} handleSearch={this.handleSearch}/>}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
