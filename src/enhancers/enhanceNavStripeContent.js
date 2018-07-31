import Template from 'dom/Template';

export default function enchance( dom ) {

  dom.getChildByClass( Template )
    .filter( template => template.findTitleText() === 'Навигационная полоса' )
    .map( template => { template.padNames(); return template; } )
    .forEach( template => {

      const contentPart = template.findPartByNameText( 'содержание' );
      if ( !contentPart ) return;

      const oldValue = contentPart.getValueAsString();
      if ( !oldValue ) return;

      let newValue = oldValue
        .replace( /\n&nbsp;\[/gm, '\n* [' )
        .replace( /\n&nbsp;&#124;&nbsp;\[/gm, '\n* [' );

      newValue = '\n' + newValue.trim() + '\n';
      contentPart.setValueAsString( newValue );
    } );
}