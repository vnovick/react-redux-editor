import React from 'react';
import {connect} from 'react-redux';
import {  dragStart, updateGalleryImageList, dragEnd } from 'actions/galleryActions'
import jsonp from 'jsonp';
export const Gallery = class Editor extends React.Component {

    componentDidMount(){
            updateGalleryImageList(this.props.store, [{
              tbUrl: 'http://i1.manchestereveningnews.co.uk/incoming/article9882472.ece/ALTERNATES/s1227b/JS70280311.jpg'
            },{
              tbUrl: 'http://www.tsmplug.com/wp-content/uploads/2013/08/Arsenal+Salary+list+2014.jpg'
            }]);
    }

    onDrop(e) {
        dragEnd(this.props.store)
    }

    dragStart(event){
        event.dataTransfer.setData('text', 'Dragging image')
        dragStart(this.props.store, event.target.src);
    }

    get getImageList(){
        return this.props.images.map((imageObject, index) => {
            let image = imageObject.toJS().tbUrl;
            return  <img key={index} className="draggable-image" draggable="true" src={image} onDragStart={this.dragStart.bind(this)} onDragEnd={this.onDrop.bind(this)}/>
        });
    }
    render() {
        return (
          <section className={this.props.className}>
            <h1> Search For Videos or images</h1>
            <div id="gallery" className="card">
              { this.getImageList }
            </div>
          </section>
        )
    }
};

function mapStateToProps(state){
    return {
        images: state.gallery.getIn(['images'])
    };
}

export const GalleryContainer = connect(mapStateToProps)(Gallery);
