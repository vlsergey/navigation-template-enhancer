import assert from 'assert';
import enhanceNavStripeContent from 'enhancers/enhanceNavStripeContent';
import Parser from 'dom/Parser';

describe( 'dom/Parser', () => {

  it ( 'Can parse navigation template', () => {
    const sourceXml = '<root><template><title>Навигационная полоса\n'
        + '</title><part><name>имя </name><equals>=</equals><value>Муниципалитеты микрорегиона Умаризал\n'
        + '</value></part><part><name>цвет</name><equals>=</equals><value><template><title>цвет</title><part><name index="1"/><value>Бразилия</value></part></template>\n'
        + '</value></part><part><name>заглавие</name><equals>=</equals><value>Муниципалитеты микрорегиона [[Умаризал (микрорегион)|Умаризал]] ([[Бразилия]])\n'
        + '</value></part><part><name>содержание  </name><equals>=</equals><value>\n'
        + '&amp;nbsp;[[Алмину-Афонсу (Риу-Гранди-ду-Норти)|Алмину-Афонсу]]\n&amp;nbsp;&amp;#124;&amp;nbsp;[[Антониу-Мартинс]]\n'
        + '&amp;nbsp;&amp;#124;&amp;nbsp;[[Фрутуозу-Гомис]]\n&amp;nbsp;&amp;#124;&amp;nbsp;[[Жуан-Диас]]\n'
        + '&amp;nbsp;&amp;#124;&amp;nbsp;[[Лукресия (Риу-Гранди-ду-Норти)|Лукресия]]\n'
        + '&amp;nbsp;&amp;#124;&amp;nbsp;[[Мартинс (муниципалитет)|Мартинс]]\n'
        + '&amp;nbsp;&amp;#124;&amp;nbsp;[[Олью-д’Агуа-ду-Боржис]]\n'
        + '&amp;nbsp;&amp;#124;&amp;nbsp;[[Пату (Бразилия)|Пату]]\n'
        + '&amp;nbsp;&amp;#124;&amp;nbsp;[[Рафаэл-Годейру]]\n'
        + '&amp;nbsp;&amp;#124;&amp;nbsp;[[Серринья-дус-Пинтус]]\n'
        + '&amp;nbsp;&amp;#124;&amp;nbsp;[[Умаризал]]\n'
        + '</value></part></template><ignore>&lt;noinclude&gt;</ignore>\n'
        + '[[Категория:Навигационные шаблоны:География Бразилии|Умаризал]]\n'
        + '<ignore>&lt;/noinclude&gt;</ignore>\n'
        + '</root>';

    const doc = new DOMParser().parseFromString( sourceXml, 'application/xml' );
    const dom = new Parser().parseDocument( doc );

    enhanceNavStripeContent( dom );
    const actual = dom.toWikitext( false );

    const expected = '{{Навигационная полоса\n'
       + '|имя        = Муниципалитеты микрорегиона Умаризал\n'
       + '|цвет       = {{цвет|Бразилия}}\n'
       + '|заглавие   = Муниципалитеты микрорегиона [[Умаризал (микрорегион)|Умаризал]] ([[Бразилия]])\n'
       + '|содержание = \n'
       + '* [[Алмину-Афонсу (Риу-Гранди-ду-Норти)|Алмину-Афонсу]]\n'
       + '* [[Антониу-Мартинс]]\n'
       + '* [[Фрутуозу-Гомис]]\n'
       + '* [[Жуан-Диас]]\n'
       + '* [[Лукресия (Риу-Гранди-ду-Норти)|Лукресия]]\n'
       + '* [[Мартинс (муниципалитет)|Мартинс]]\n'
       + '* [[Олью-д’Агуа-ду-Боржис]]\n'
       + '* [[Пату (Бразилия)|Пату]]\n'
       + '* [[Рафаэл-Годейру]]\n'
       + '* [[Серринья-дус-Пинтус]]\n'
       + '* [[Умаризал]]\n'
       + '}}<noinclude>\n'
       + '[[Категория:Навигационные шаблоны:География Бразилии|Умаризал]]\n'
       + '</noinclude>';
    assert.equal( actual.replace( /\r/gm, '' ).trim(), expected.replace( /\r/gm, '' ).trim() );
  } );

  it ( 'Can enhance Шаблон:Коммуны департамента Валь-д’Уаз', () => {
    const sourceXml = '<root><template><title>Навигационная полоса\n'
      + '</title><part><name>имя  </name><equals>=</equals><value> Коммуны департамента Валь-д’Уаз\n'
      + '</value></part><part><name>цвет </name><equals>=</equals><value> <template><title>Цвет</title><part><name index="1"/><value>Франция</value></part></template>\n'
      + '</value></part><part><name>заглавие</name><equals>=</equals><value> Коммуны департамента [[Валь-д’Уаз]]\n'
      + '</value></part><part><name>содержание</name><equals>=</equals><value>\n'
      + '<template lineStart="1"><title>nowrap</title><part><name index="1"/><value>[[Аблеж]] •</value></part></template>\n'
      + '<template lineStart="1"><title>nowrap</title><part><name index="1"/><value>[[Аверн (Франция)|Аверн]] •</value></part></template>\n'
      + '<template lineStart="1"><title>nowrap</title><part><name index="1"/><value>[[Эрувиль (Валь-д’Уаз)|Эрувиль]] •</value></part></template>\n'
      + '<template lineStart="1"><title>nowrap</title><part><name index="1"/><value>[[Юс (Валь-д’Уаз)|Юс]]</value></part></template>\n'
      + '</value></part><part><name>скрыть</name><equals>=</equals><value><ignore>&lt;includeonly&gt;1&lt;/includeonly&gt;</ignore></value></part></template><template><title>#if:<tplarg><title>nocat</title><part><name index="1"/><value/></part></tplarg><template><title>NAMESPACE</title></template></title><part><name index="1"/><value/></part><part><name index="2"/><value>[[Категория:Коммуны департамента Валь-д’Уаз]]</value></part></template><ignore>&lt;noinclude&gt;</ignore>\n'
      + '[[Категория:Навигационные шаблоны:Коммуны по департаментам Франции|Валь-д’Уаз]]\n'
      + '[[Категория:Коммуны департамента Валь-д’Уаз|*Ш]]<ignore>&lt;/noinclude&gt;</ignore>\n'
      + '</root>';

    const doc = new DOMParser().parseFromString( sourceXml, 'application/xml' );
    const dom = new Parser().parseDocument( doc );

    enhanceNavStripeContent( dom );
    const actual = dom.toWikitext( false );

    const expected = '{{Навигационная полоса\n'
     + '|имя        = Коммуны департамента Валь-д’Уаз\n'
     + '|цвет       = {{Цвет|Франция}}\n'
     + '|заглавие   = Коммуны департамента [[Валь-д’Уаз]]\n'
     + '|содержание = \n'
     + '* [[Аблеж]]\n'
     + '* [[Аверн (Франция)|Аверн]]\n'
     + '* [[Эрувиль (Валь-д’Уаз)|Эрувиль]]\n'
     + '* [[Юс (Валь-д’Уаз)|Юс]]\n'
     + '|скрыть     = <includeonly>1</includeonly>\n'
     + '}}{{#if:{{{nocat|}}}{{NAMESPACE}}||[[Категория:Коммуны департамента Валь-д’Уаз]]}}<noinclude>\n'
     + '[[Категория:Навигационные шаблоны:Коммуны по департаментам Франции|Валь-д’Уаз]]\n'
     + '[[Категория:Коммуны департамента Валь-д’Уаз|*Ш]]</noinclude>\n';

    assert.equal( actual.replace( /\r/gm, '' ).trim(), expected.replace( /\r/gm, '' ).trim() );
  } );

} );
