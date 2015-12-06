import jquery from 'jquery';
import sirTrevor from 'sir-trevor-js/sir-trevor';
import sirTrevorCss from 'sir-trevor-js/sir-trevor.css';
import trevorEvents from './sirTrevorEventsProxy';
import { setEditorState } from 'actions/editorActions';
import { Map } from 'immutable'

export default {
    getInstance: (store, element)=>{
        let SirTrevor = new sirTrevor.Editor({ el: jquery(element) });
        setEditorState(store, {
            editor: Map({
                instance: sirTrevor,
                editorClass: SirTrevor
            })
        })
        window.SirTrevor = SirTrevor;
        window.ST = sirTrevor;
        trevorEvents(store).map((action, key)=>{
            sirTrevor.EventBus.on(key, action);
        });
        return SirTrevor;
    }
};
