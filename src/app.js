import addToolbarButton from './addToolbarButton';
import enhanceNavStripeContent from 'enhancers/enhanceNavStripeContent';
import { getServerApi } from './ApiUtils.js';
import Parser from './dom/Parser';

if ( !window._babelPolyfill ) {
  require( 'babel-polyfill' );
}

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
  const jQueryTextBox = $( '#wpTextbox1' );
  const original = jQueryTextBox[ 0 ].value;
  jQueryTextBox.prop( 'disabled', true );

  getServerApi().postPromise( {
    action: 'parse',
    contentmodel: 'wikitext',
    disablelimitreport: true,
    disableeditsection: true,
    prop: 'parsetree',
    text: original,
  } ).then( result => {
    const parser = new DOMParser();
    const strXml = result.parse.parsetree[ '*' ];

    const doc = parser.parseFromString( strXml, 'application/xml' );
    const dom = new Parser().parseDocument( doc );
    enhanceNavStripeContent( dom );

    const newText = dom.toWikitext( false );
    $( '#wpTextbox1' )[ 0 ].value = newText;
  } ).finally( () => {
    jQueryTextBox.prop( 'disabled', false );
  } );
}
