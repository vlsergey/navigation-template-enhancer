import expect from 'expect';

export default class Template {

  static parse( parser, node ) {
    expect( parser ).toBeAn( 'object' );
    expect( node ).toBeAn( Element );

    let title;
    const parts = [];

    for ( let i = 0; i < node.children.length; i++ ) {
      const child = node.children[ i ];
      expect( child ).toBeAn( Element );

      switch ( child.nodeName ) {
      case 'title': {
        title = child.textContent;
        break;
      }
      case 'part': {
        const part = TemplatePart.parse( parser, child );
        parts.push( part );
        break;
      }
      default:
        throw new Error( 'Unsupported template child node: ' + child.nodeName );
      }
    }

    const result = new Template();
    result.title = title;
    result.parts = parts;
    return result;
  }

  toWikitext( stripComments ) {

    let result = '';
    if ( this.title ) {
      result += this.title.toWikitext( stripComments );
    }

    if ( this.parts ) {
      result += this.parts
        .map( child => child.toWikitext( stripComments ) )
        .join( '' );
    }

    return result;
  }

}

export class TemplatePart {

}
