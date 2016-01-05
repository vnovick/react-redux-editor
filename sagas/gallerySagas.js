import { call, put, take } from 'redux-saga';
import { galleryActionTypes } from 'constants/actionTypes';
function* getSamplePhotos(url) {
    let actionResult = yield take(galleryActionTypes.FETCH_SAMPLE_PHOTOS)
    const response = yield call(fetch, actionResult.url)
    const jsonResponse = yield response.json();
    yield put({
        type: galleryActionTypes.FETCHED_PHOTOS,
        state: {
            images: jsonResponse.photos.photo.filter(photoObj => {
                return photoObj.url_s;
            })
        }
    });
}

export default [
    getSamplePhotos
]
