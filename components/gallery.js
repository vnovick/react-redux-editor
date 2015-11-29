import React from 'react';
import {connect} from 'react-redux';
import { dragEnd, dragStart } from 'actions/galleryActions'
export const Gallery = class Editor extends React.Component {

    componentDidMount(){
        google.load('search', '1');
        function initialize() {
            var searchControl = new google.search.SearchControl();
            searchControl.addSearcher(new google.search.ImageSearch());
            searchControl.addSearcher(new google.search.VideoSearch());
            searchControl.draw(document.getElementById("searchcontrol"));
        }
        google.setOnLoadCallback(initialize);
    }

    onDrop(e) {
        dragEnd(this.props.store, e);
    }

    dragStart(e){
        dragStart(this.props.store, e)
    }
    render() {
        return (
          <section className={this.props.className} onDragStart={this.dragStart.bind(this)} onDragEnd={this.onDrop.bind(this)}>
            <h1> Search For Videos or images</h1>
            <div id="searchcontrol" className="card"></div>
          </section>
        )
    }
};

function mapStateToProps(state){
    return {
        images: state.gallery.getIn(['images', 'responseData', 'results'])
    };
}

export const GalleryContainer = connect(mapStateToProps)(Gallery);
