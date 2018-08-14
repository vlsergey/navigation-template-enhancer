import Template from 'dom/Template';
import TextNode from 'dom/TextNode';

export default function enchance( dom ) {

  dom.getChildByClass( Template )
    .filter( template => template.findTitleText() === 'Навигационная полоса' )
    .forEach( template => {

      template.padNames();
      template.padValues();

      const contentPart = template.findPartByNameText( 'содержание' );
      if ( !contentPart ) return;

      contentPart
        .mapFilteredChildrenR(
          node => node instanceof TextNode,
          node => { node.value = node.value.replace( /&nbsp;/gm, ' ' ); return node; },
        );

      contentPart
        .mapFilteredChildrenR(
          node => node instanceof Template && node.findTitleText() === 'nowrap',
          node => node.getValuesAsNodesArray()
        );
      contentPart.mergeTextNodes();

      const oldValue = contentPart.getValueAsString();
      if ( !oldValue ) return;

      const items = oldValue.split( /(•|&#124;)/gm )
        .filter( item => item != '•' )
        .filter( item => item != '&#124;' )
        .map( item => item.trim() );

      const newValue = ' \n* ' + items.join( '\r\n* ' ).trim() + '\n';
      contentPart.setValueAsString( newValue );
    } );
}
