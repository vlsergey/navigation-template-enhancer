import 'babel-polyfill';
import addToolbarButton from './addToolbarButton';

import Parser from './dom/Parser';

if ( mw.config.get( 'wgDBname' ) === 'ruwiki' ) {
  addToolbarButton(
    'reformatNavigationTemplate',
    'Перформатировать шаблон навигации',
    'Переформатировать шаблон навигации в соответствии с лучшими практиками и рекомендациями',
    '//upload.wikimedia.org/wikipedia/commons/9/9d/Button_fait.png',
    '//upload.wikimedia.org/wikipedia/commons/9/9d/Button_fait.png',
    doReformat
  );
}

function doReformat() {
  const original = $( '#wpTextbox1' ).text();
  console.log( original );

  new mw.Api().post( {
    action: 'parse',
    contentmodel: 'wikitext',
    disablelimitreport: true,
    disableeditsection: true,
    prop: 'parsetree',
    text: original,
  } ).then( result => {
    const parser = new DOMParser();
    const strXml = result.parse.parsetree[ '*' ];
    console.log( 'Retrieved tree: ' + JSON.stringify( strXml ) );

    const doc = parser.parseFromString( strXml, 'application/xml' );
    console.log( doc );

    new Parser().convertDocument( doc );
  } );
}
