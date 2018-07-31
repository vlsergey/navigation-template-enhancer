import expect from 'expect';
import TextNode from './TextNode';
import WikiDomNode from './WikiDomNode';

export default class Container extends WikiDomNode {

  static parseChildren( parser, node ) {
    const children = [];
    for ( let i = 0; i < node.childNodes.length; i++ ) {
      children.push( parser.parse( node.childNodes[ i ] ) );
    }
    return children;
  }

  constructor( children ) {
    super();
    expect ( children ).toBeAn( 'array' );
    this.children = children;
  }

  getChildByClass( cls ) {
    expect( cls ).toBeA( 'function', 'Passed argument cls is not a function: ' + cls );

    const childResults = this.children
      .filter( child => child instanceof Container )
      .flatMap( child => child.getChildByClass( cls ) );
    return this instanceof cls
      ? [ this, ...childResults ]
      : childResults;
  }

  getTextIfOnlyText() {
    if ( this.children.some( child => !( child instanceof TextNode ) ) ) return null;
    return this.children.map( child => child.value ).join( '' );
  }

  toWikitext( stripComments ) {
    return this.children
      .map( child => child.toWikitext( stripComments ) )
      .join( '' );
  }

}
