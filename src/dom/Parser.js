import expect from 'expect';
import Root from './Root';
import Template from './Template';

const KNOWN_NODES = {
  root: Root,
  template: Template,
};

export default class Parser {

  parse( node ) {
    expect( node ).toBeAn( Element );

    const { nodeName } = node;
    const knownClass = KNOWN_NODES[ nodeName ];
    if ( !knownClass ) {
      throw new Error( 'Uknown node type: ' + nodeName );
    }
    return knownClass.parse( this, node );
  }

  parseDocument( doc ) {
    expect( doc ).toBeA( Document );

    const root = doc.documentElement;
    expect( root.nodeName ).toEqual( 'root' );

    return Root.parse( this, root );
  }

}
