import React from 'react';
import {connect} from 'react-redux';

export const Html = class Editor extends React.Component {

    parseHtml(blocks) {
        return {
            __html: blocks.map( (block, index ) => {
                return !block.paragraphs ?
                this.parseImage(block.attributes.image, index) :
                this.parseParagraphs(block.paragraphs, block.attributes)
            }).join('')
        }
    }

    parseParagraphs(paragraphs, attributes){
        let actualParagraphs = paragraphs
        return actualParagraphs.map( ( paragraph, index ) => { return this.parseParagraph(paragraph, attributes, index);}).join("")
    }

    parseImage(image, index) {
        return `<img src=${image} />`
    }

    parseParagraph(text, attributes, index){
        if (!attributes) {
            return `<p>${text}</p>`
        } else {
            let constructedEntry = text
            Object.keys(attributes).map( key => {
                switch (key) {
                case 'bold':
                    constructedEntry = `<b>${constructedEntry}</b>`
                    break;
                case 'italic':
                    constructedEntry = `<i>${constructedEntry}</i>`
                    break;
                case 'underline':
                    constructedEntry = `<u>${constructedEntry}</u>`
                    break;
                }
                return constructedEntry
            })
            return constructedEntry
        }
    }

    render() {
        return (
          <aside className={this.props.className} style={this.props.style}>
            <h1 className="title">Html Output</h1>
            <div dangerouslySetInnerHTML={this.parseHtml(this.props.content.blocks)}/>
          </aside>
        )
    }
};

function mapStateToProps(state){
    return {
        content: state.editor.get('content').toJS()
    };
}

export const HtmlContainer = connect(mapStateToProps)(Html);
