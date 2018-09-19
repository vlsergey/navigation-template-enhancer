import Template, { TemplatePart } from 'dom/Template';
import TextNode from 'dom/TextNode';

function enchanceNavigationContentPart( contentPart ) {
  contentPart
    .mapFilteredChildrenR(
      node => node instanceof TextNode,
      node => { node.value = node.value.replace( /&nbsp;/gm, ' ' ); return node; },
    );

  contentPart
    .mapFilteredChildrenR(
      node => node instanceof Template && ( node.findTitleText() === 'nobr' || node.findTitleText() === 'nowrap' || node.findTitleText() === 's' ),
      node => node.getValuesAsNodesArray()
    );
  contentPart
    .mapFilteredChildrenR(
      node => node instanceof Template && ( node.findTitleText() === '!' || node.findTitleText() === '*' || node.findTitleText() === '·' || node.findTitleText() === '•' ),
      () => new TextNode( '•' )
    );
  contentPart.mergeTextNodes();
  contentPart.mergeContainers();

  let oldValue = contentPart.getValueAsString();
  if ( !oldValue ) return;

  oldValue = oldValue.replace( /&bull;/gm, '•' );
  oldValue = oldValue.replace( /\]\]\s*\*\s*\[\[/gm, ']] • [[' );
  oldValue = oldValue.trim();
  if ( oldValue.startsWith( '*' ) ) oldValue = oldValue.substr( 1 );
  oldValue = oldValue.trim();

  const items = oldValue.split( /(·|•|&#124;|\n\*)/gm )
    .filter( item => [ '·', '•', '&#124;', '\n*' ].indexOf( item ) === -1 )
    .map( item => item.trim() );

  const newValue = ' \n* ' + items.join( '\r\n* ' ).trim() + '\n\n';
  contentPart.setValueAsString( newValue );
}

export default function enchance( dom ) {

  dom.getChildByClass( Template )
    .filter( template => template.toWikitext( true ).indexOf( '\n' ) !== -1 )
    .forEach( template => {
      template.padNames();
      template.padValues();
    } );

  dom.getChildByClass( Template )
    .filter( template => ( template.findTitleText() || '' ).toLowerCase() === 'навигационная полоса' )
    .forEach( template => {

      const contentPart = template.findPartByNameText( 'содержание' );
      if ( !contentPart ) return;

      enchanceNavigationContentPart( contentPart );
    } );

  dom.getChildByClass( Template )
    .filter( template => ( template.findTitleText() || '' ).toLowerCase() === 'навигационная таблица' )
    .forEach( template => {

      // add new line before header
      template.children
        .forEach( ( child, i, arr ) => {
          if ( !( child instanceof TemplatePart ) ) return;
          if ( !child.getNameAsString().startsWith( 'заголовок' ) ) return;

          if ( i == 0 ) return;
          const prev = arr[ i - 1 ];
          if ( !( prev instanceof TemplatePart ) ) return;

          const value = prev.getValueAsNode();
          value.children.push( new TextNode( '\n' ) );
          value.mergeTextNodes();
        } );

      // optimize lists
      template.children
        .forEach( child => {
          if ( !( child instanceof TemplatePart ) ) return;
          if ( !child.getNameAsString().startsWith( 'список' ) ) return;

          enchanceNavigationContentPart( child );
        } );

    } );
}
