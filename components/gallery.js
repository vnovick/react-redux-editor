import React from 'react';
import {connect} from 'react-redux';
import {  updateGalleryImageList } from 'actions/galleryActions'
import jsonp from 'jsonp';

function dragStartHandler(event) {
    return (e) => {
        e.dataTransfer.setData("text/html", e.target.outerHTML);
        e.dropEffect = "move";
    }
}
export const Gallery = class Editor extends React.Component {

    componentDidMount(){
        updateGalleryImageList(this.props.store, [{
            tbUrl: 'http://i1.manchestereveningnews.co.uk/incoming/article9882472.ece/ALTERNATES/s1227b/JS70280311.jpg'
        }, {
            tbUrl: 'http://www.tsmplug.com/wp-content/uploads/2013/08/Arsenal+Salary+list+2014.jpg'
        }]);
    }

    get getImageList(){
        return this.props.images.map((imageObject, index) => {
            let image = imageObject.toJS().tbUrl;
            return <img key={index} className="draggable-image" src={image} onDragStart={dragStartHandler(event)}/>
        });
    }
    render() {
        return (
          <section className={this.props.className}>
            <h1> Search For Videos or images</h1>
            <div id="gallery" className="card">
              { this.getImageList }
            </div>
            <div className="card" draggable="false" >
                <wrapperForEditor><iframe width="560" height="315" src="https://www.youtube.com/embed/Szm7JtD-54o" frameborder="0" allowfullscreen></iframe></wrapperForEditor>
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
