import React from 'react';
import {connect} from 'react-redux';
import { triggerPhotoFetch } from 'actions/galleryActions'

function dragStartHandler(event) {
    return (e) => {
        e.dataTransfer.setData("text/html", e.target.outerHTML);
        e.dropEffect = "move";
    }
}
export const Gallery = class Editor extends React.Component {

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(triggerPhotoFetch());
    }

    get getImageList(){
        return this.props.images.map((imageObject, index) => {
            let image = imageObject.toJS().url_s;
            return <img key={index} className="draggable-image" src={image} onDragStart={dragStartHandler(event)}/>
        });
    }
    render() {
        return (
          <section className={this.props.className} style={{ width: '25%' }}>
            <h1 className="title"> Search For Videos or images</h1>
            <div id="gallery">
              { this.getImageList }
            </div>
            <wrapperForEditor>
              <iframe src="https://www.youtube.com/embed/Szm7JtD-54o" width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
            </wrapperForEditor>
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
