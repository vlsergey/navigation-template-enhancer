import expect from 'expect';

export default class Container {

  static parseChildren( parser, node ) {
    const children = [];
    for ( let i = 0; i < node.children.length; i++ ) {
      children.push( parser.parse( node.children[ i ] ) );
    }
    return children;
  }

  constructor( children ) {
    expect ( children ).toBeAn( 'array' );

    this.children = children;
  }

  toWikitext( stripComments ) {
    return this.children
      .map( child => child.toWikitext( stripComments ) )
      .join( '' );
  }

}
