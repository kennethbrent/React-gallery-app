import React, {Component}  from 'react';
import Photo from './Photo';


class PhotoContainer extends Component {
    //perform search if there is a match param 
    componentDidMount(){
        if(this.props.match){
            this.props.handleSearch(this.props.match.params.searchterm)
        }
    }

    //perform search if the match param has changed in the url
    ///this adds functionality for the broswer forward and back buttons to work properly
    componentDidUpdate(prevProps) {
        if(this.props.match && prevProps.match){
                if(prevProps.match.params.searchterm !== this.props.match.params.searchterm){
                    this.props.handleSearch(this.props.match.params.searchterm)
                }
        }
    }

    render() {
        const {state} = this.props
        return(
            <div className="photo-container">
                <h2>Results</h2>
                {/* If data is yet to be returned show loading... else show data */}
                {state.isLoading ? <p>Loading...</p>:
                <ul>
                    {this.props.photos.map((photo, index) => {
                        return(
                            <Photo 
                                key={index}
                                photo={photo}
                            />
                        );
                    })}
                </ul>
                }
                  {/* If noResults is true, show no results message */}
                {state.noResults ? <h1>Uh oh! {state.search} didn't return any results</h1> : null}
            </div>
            
        );
    }
    
}

export default PhotoContainer;