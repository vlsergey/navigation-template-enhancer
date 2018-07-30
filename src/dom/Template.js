import expect from 'expect';

export default class Template {

  static parse( parser, node ) {
    expect( parser ).toBeAn( 'object' );
    expect( node ).toBeAn( Element );

    let title;
    const parts = [];

    const children = [];
    for ( let i = 0; i < node.children.length; i++ ) {
      const node = node.children[ i ];
      expect( node ).toBeAn( Element );

      switch ( node.nodeName ) {
      case 'title':
        title = TemplateTitle.parse( parser, node );
        break;
      case 'part':
        const part = TemplatePart.parse( parser, node );
        parts.push( part );
        break;
      default:
        throw new Error( 'Unsupported template child node: ' + node.nodeName );
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

    if ( parts ) {
      result += this.parts
        .map( child => child.toWikitext( stripComments ) )
        .join( '' );
    }

    return result;
  }

}

export class TemplateTitle {

}

export class TemplatePart {

}
