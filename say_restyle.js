
//! annyang
//! version : 1.6.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
(function(a){"use strict";var b=this,c=b.SpeechRecognition||b.webkitSpeechRecognition||b.mozSpeechRecognition||b.msSpeechRecognition||b.oSpeechRecognition;if(!c)return b.annyang=null,a;var d,e,f=[],g={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},h=0,i=!1,j="font-weight: bold; color: #00f;",k=!1,l=/\s*\((.*?)\)\s*/g,m=/(\(\?:[^)]+\))\?/g,n=/(\(\?)?:\w+/g,o=/\*\w+/g,p=/[\-{}\[\]+?.,\\\^$|#]/g,q=function(a){return a=a.replace(p,"\\$&").replace(l,"(?:$1)?").replace(n,function(a,b){return b?a:"([^\\s]+)"}).replace(o,"(.*?)").replace(m,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},r=function(a){a.forEach(function(a){a.callback.apply(a.context)})},s=function(){t()||b.annyang.init({},!1)},t=function(){return d!==a};b.annyang={init:function(l,m){m=m===a?!0:!!m,d&&d.abort&&d.abort(),d=new c,d.maxAlternatives=5,d.continuous="http:"===b.location.protocol,d.lang="en-US",d.onstart=function(){r(g.start)},d.onerror=function(a){switch(r(g.error),a.error){case"network":r(g.errorNetwork);break;case"not-allowed":case"service-not-allowed":e=!1,r((new Date).getTime()-h<200?g.errorPermissionBlocked:g.errorPermissionDenied)}},d.onend=function(){if(r(g.end),e){var a=(new Date).getTime()-h;1e3>a?setTimeout(b.annyang.start,1e3-a):b.annyang.start()}},d.onresult=function(a){if(k)return i&&b.console.log("Speech heard, but annyang is paused"),!1;r(g.result);for(var c,d=a.results[a.resultIndex],e=0;e<d.length;e++){c=d[e].transcript.trim(),i&&b.console.log("Speech recognized: %c"+c,j);for(var h=0,l=f.length;l>h;h++){var m=f[h].command.exec(c);if(m){var n=m.slice(1);return i&&(b.console.log("command matched: %c"+f[h].originalPhrase,j),n.length&&b.console.log("with parameters",n)),f[h].callback.apply(this,n),r(g.resultMatch),!0}}}return r(g.resultNoMatch),!1},m&&(f=[]),l.length&&this.addCommands(l)},start:function(c){k=!1,s(),c=c||{},e=c.autoRestart!==a?!!c.autoRestart:!0,c.continuous!==a&&(d.continuous=!!c.continuous),h=(new Date).getTime();try{d.start()}catch(f){i&&b.console.log(f.message)}},abort:function(){e=!1,t&&d.abort()},pause:function(){k=!0},resume:function(){b.annyang.start()},debug:function(a){i=arguments.length>0?!!a:!0},setLanguage:function(a){s(),d.lang=a},addCommands:function(a){var c,d;s();for(var e in a)if(a.hasOwnProperty(e)){if(c=b[a[e]]||a[e],"function"!=typeof c)continue;d=q(e),f.push({command:d,callback:c,originalPhrase:e})}i&&b.console.log("Commands successfully loaded: %c"+f.length,j)},removeCommands:function(b){return b===a?void(f=[]):(b=Array.isArray(b)?b:[b],void(f=f.filter(function(a){for(var c=0;c<b.length;c++)if(b[c]===a.originalPhrase)return!1;return!0})))},addCallback:function(c,d,e){if(g[c]!==a){var f=b[d]||d;"function"==typeof f&&g[c].push({callback:f,context:e||this})}}}}).call(this);



var selectedElement;
var changeLog = [];


var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    .pulse {
      box-shadow: 0 0 0 rgba(23, 152, 72, 0.4);
      animation: pulse 0.8s infinite;
    }

    @-webkit-keyframes pulse {
      0% {
        -webkit-box-shadow: 0 0 0 0 rgba(23, 152, 72, 0.8);
      }
      99% {
          -webkit-box-shadow: 0 0 0 10px rgba(23, 152, 72, 0);
      }
      100% {
          -webkit-box-shadow: 0 0 0 0 rgba(23, 152, 72, 0);
      }
    }
    @keyframes pulse {
      0% {
        -moz-box-shadow: 0 0 0 0 rgba(23, 152, 72, 0.8);
        box-shadow: 0 0 0 0 rgba(23, 152, 72, 0.4);
      }
      99% {
          -moz-box-shadow: 0 0 0 10px rgba(23, 152, 72, 0);
          box-shadow: 0 0 0 10px rgba(23, 152, 72, 0);
      }
      100% {
          -moz-box-shadow: 0 0 0 0 rgba(23, 152, 72, 0);
          box-shadow: 0 0 0 0 rgba(23, 152, 72, 0);
      }
    }

    .shake { display: inline-block; -webkit-transform-origin: center center; -ms-transform-origin: center center; transform-origin: center center; }
    .shake.shake-slow { -webkit-animation-name: shake-slow; -ms-animation-name: shake-slow; animation-name: shake-slow; -webkit-animation-duration: 5s; -ms-animation-duration: 5s; animation-duration: 5s; -webkit-animation-iteration-count: infinite; -ms-animation-iteration-count: infinite; animation-iteration-count: infinite; -webkit-animation-timing-function: ease-in-out; -ms-animation-timing-function: ease-in-out; animation-timing-function: ease-in-out; -webkit-animation-delay: 0s; -ms-animation-delay: 0s; animation-delay: 0s; -webkit-animation-play-state: running; -ms-animation-play-state: running; animation-play-state: running; }

    @-webkit-keyframes shake-slow { 0% { -webkit-transform: translate(0px, 0px) rotate(0deg); }
      2% { -webkit-transform: translate(-1px, 3px) rotate(-1.5deg); }
      4% { -webkit-transform: translate(-4px, 5px) rotate(-1.5deg); }
      6% { -webkit-transform: translate(-1px, 6px) rotate(-0.5deg); }
      8% { -webkit-transform: translate(5px, -4px) rotate(-3.5deg); }
      10% { -webkit-transform: translate(-7px, -3px) rotate(-3.5deg); }
      12% { -webkit-transform: translate(-1px, 8px) rotate(2.5deg); }
      14% { -webkit-transform: translate(3px, -5px) rotate(-1.5deg); }
      16% { -webkit-transform: translate(1px, 0px) rotate(2.5deg); }
      18% { -webkit-transform: translate(-6px, -10px) rotate(-0.5deg); }
      20% { -webkit-transform: translate(3px, -2px) rotate(1.5deg); }
      22% { -webkit-transform: translate(0px, 0px) rotate(-2.5deg); }
      24% { -webkit-transform: translate(-5px, -4px) rotate(1.5deg); }
      26% { -webkit-transform: translate(-1px, 3px) rotate(-3.5deg); }
      28% { -webkit-transform: translate(1px, 1px) rotate(-3.5deg); }
      30% { -webkit-transform: translate(-4px, 8px) rotate(1.5deg); }
      32% { -webkit-transform: translate(-9px, 7px) rotate(-3.5deg); }
      34% { -webkit-transform: translate(4px, -9px) rotate(-2.5deg); }
      36% { -webkit-transform: translate(1px, -6px) rotate(-2.5deg); }
      38% { -webkit-transform: translate(-4px, 0px) rotate(-2.5deg); }
      40% { -webkit-transform: translate(3px, -7px) rotate(0.5deg); }
      42% { -webkit-transform: translate(4px, 4px) rotate(-0.5deg); }
      44% { -webkit-transform: translate(8px, -4px) rotate(-2.5deg); }
      46% { -webkit-transform: translate(9px, 9px) rotate(-3.5deg); }
      48% { -webkit-transform: translate(6px, -8px) rotate(-0.5deg); }
      50% { -webkit-transform: translate(-1px, 4px) rotate(-3.5deg); }
      52% { -webkit-transform: translate(4px, 6px) rotate(-1.5deg); }
      54% { -webkit-transform: translate(9px, -3px) rotate(2.5deg); }
      56% { -webkit-transform: translate(8px, -2px) rotate(-3.5deg); }
      58% { -webkit-transform: translate(-2px, -9px) rotate(-0.5deg); }
      60% { -webkit-transform: translate(-1px, -5px) rotate(2.5deg); }
      62% { -webkit-transform: translate(-8px, 3px) rotate(2.5deg); }
      64% { -webkit-transform: translate(6px, -2px) rotate(-3.5deg); }
      66% { -webkit-transform: translate(-5px, 9px) rotate(-1.5deg); }
      68% { -webkit-transform: translate(3px, 1px) rotate(-0.5deg); }
      70% { -webkit-transform: translate(6px, 4px) rotate(-1.5deg); }
      72% { -webkit-transform: translate(-6px, -5px) rotate(1.5deg); }
      74% { -webkit-transform: translate(-8px, 0px) rotate(-0.5deg); }
      76% { -webkit-transform: translate(-5px, -8px) rotate(1.5deg); }
      78% { -webkit-transform: translate(5px, -3px) rotate(-1.5deg); }
      80% { -webkit-transform: translate(-6px, -3px) rotate(-1.5deg); }
      82% { -webkit-transform: translate(7px, 8px) rotate(-1.5deg); }
      84% { -webkit-transform: translate(-6px, 9px) rotate(0.5deg); }
      86% { -webkit-transform: translate(1px, 8px) rotate(-3.5deg); }
      88% { -webkit-transform: translate(-9px, -2px) rotate(1.5deg); }
      90% { -webkit-transform: translate(4px, -6px) rotate(-1.5deg); }
      92% { -webkit-transform: translate(0px, -1px) rotate(0.5deg); }
      94% { -webkit-transform: translate(2px, -9px) rotate(2.5deg); }
      96% { -webkit-transform: translate(-9px, 1px) rotate(-2.5deg); }
      98% { -webkit-transform: translate(-9px, -5px) rotate(-3.5deg); } }

    @-ms-keyframes shake-slow { 0% { -ms-transform: translate(0px, 0px) rotate(0deg); }
      2% { -ms-transform: translate(-10px, 5px) rotate(-2.5deg); }
      4% { -ms-transform: translate(7px, 7px) rotate(-3.5deg); }
      6% { -ms-transform: translate(8px, -7px) rotate(-2.5deg); }
      8% { -ms-transform: translate(-8px, 3px) rotate(-0.5deg); }
      10% { -ms-transform: translate(3px, -10px) rotate(-1.5deg); }
      12% { -ms-transform: translate(-9px, -6px) rotate(2.5deg); }
      14% { -ms-transform: translate(-2px, -6px) rotate(-0.5deg); }
      16% { -ms-transform: translate(6px, -1px) rotate(0.5deg); }
      18% { -ms-transform: translate(5px, -1px) rotate(0.5deg); }
      20% { -ms-transform: translate(7px, -5px) rotate(-0.5deg); }
      22% { -ms-transform: translate(-8px, 5px) rotate(2.5deg); }
      24% { -ms-transform: translate(0px, 4px) rotate(2.5deg); }
      26% { -ms-transform: translate(-1px, 2px) rotate(-1.5deg); }
      28% { -ms-transform: translate(-1px, -1px) rotate(1.5deg); }
      30% { -ms-transform: translate(-5px, -5px) rotate(2.5deg); }
      32% { -ms-transform: translate(0px, 7px) rotate(-0.5deg); }
      34% { -ms-transform: translate(-9px, 3px) rotate(-0.5deg); }
      36% { -ms-transform: translate(3px, -5px) rotate(-2.5deg); }
      38% { -ms-transform: translate(5px, 2px) rotate(-0.5deg); }
      40% { -ms-transform: translate(6px, -3px) rotate(0.5deg); }
      42% { -ms-transform: translate(-4px, -6px) rotate(-0.5deg); }
      44% { -ms-transform: translate(9px, 2px) rotate(-3.5deg); }
      46% { -ms-transform: translate(6px, -4px) rotate(1.5deg); }
      48% { -ms-transform: translate(6px, 5px) rotate(2.5deg); }
      50% { -ms-transform: translate(-9px, -2px) rotate(-2.5deg); }
      52% { -ms-transform: translate(-7px, 9px) rotate(-0.5deg); }
      54% { -ms-transform: translate(-5px, -5px) rotate(-3.5deg); }
      56% { -ms-transform: translate(-6px, -10px) rotate(1.5deg); }
      58% { -ms-transform: translate(-3px, 1px) rotate(-3.5deg); }
      60% { -ms-transform: translate(3px, 5px) rotate(2.5deg); }
      62% { -ms-transform: translate(-1px, -8px) rotate(2.5deg); }
      64% { -ms-transform: translate(6px, -7px) rotate(-0.5deg); }
      66% { -ms-transform: translate(-7px, -1px) rotate(0.5deg); }
      68% { -ms-transform: translate(-3px, -4px) rotate(-1.5deg); }
      70% { -ms-transform: translate(-10px, 9px) rotate(2.5deg); }
      72% { -ms-transform: translate(9px, 9px) rotate(2.5deg); }
      74% { -ms-transform: translate(-6px, 8px) rotate(-0.5deg); }
      76% { -ms-transform: translate(-5px, -10px) rotate(-2.5deg); }
      78% { -ms-transform: translate(-7px, -9px) rotate(-0.5deg); }
      80% { -ms-transform: translate(8px, -4px) rotate(2.5deg); }
      82% { -ms-transform: translate(9px, 4px) rotate(-0.5deg); }
      84% { -ms-transform: translate(-1px, -1px) rotate(2.5deg); }
      86% { -ms-transform: translate(-6px, -3px) rotate(0.5deg); }
      88% { -ms-transform: translate(-2px, -4px) rotate(0.5deg); }
      90% { -ms-transform: translate(5px, 1px) rotate(0.5deg); }
      92% { -ms-transform: translate(1px, 2px) rotate(-3.5deg); }
      94% { -ms-transform: translate(-5px, -10px) rotate(1.5deg); }
      96% { -ms-transform: translate(-6px, 3px) rotate(-3.5deg); }
      98% { -ms-transform: translate(-1px, -7px) rotate(-2.5deg); } }

    @keyframes shake-slow { 0% { transform: translate(0px, 0px) rotate(0deg); }
      2% { transform: translate(6px, -7px) rotate(2.5deg); }
      4% { transform: translate(8px, -8px) rotate(2.5deg); }
      6% { transform: translate(1px, -8px) rotate(-3.5deg); }
      8% { transform: translate(-3px, 4px) rotate(-0.5deg); }
      10% { transform: translate(0px, -3px) rotate(1.5deg); }
      12% { transform: translate(-1px, 2px) rotate(0.5deg); }
      14% { transform: translate(6px, 6px) rotate(-1.5deg); }
      16% { transform: translate(-7px, 4px) rotate(-0.5deg); }
      18% { transform: translate(7px, 8px) rotate(-3.5deg); }
      20% { transform: translate(-6px, 2px) rotate(1.5deg); }
      22% { transform: translate(9px, 5px) rotate(-1.5deg); }
      24% { transform: translate(7px, -2px) rotate(0.5deg); }
      26% { transform: translate(-7px, -10px) rotate(-0.5deg); }
      28% { transform: translate(-10px, -8px) rotate(-1.5deg); }
      30% { transform: translate(8px, 4px) rotate(0.5deg); }
      32% { transform: translate(0px, 4px) rotate(1.5deg); }
      34% { transform: translate(-8px, 6px) rotate(-0.5deg); }
      36% { transform: translate(-5px, 7px) rotate(1.5deg); }
      38% { transform: translate(-4px, -4px) rotate(-1.5deg); }
      40% { transform: translate(9px, 4px) rotate(-1.5deg); }
      42% { transform: translate(9px, -5px) rotate(2.5deg); }
      44% { transform: translate(-5px, -4px) rotate(-2.5deg); }
      46% { transform: translate(7px, -7px) rotate(1.5deg); }
      48% { transform: translate(-5px, 8px) rotate(0.5deg); }
      50% { transform: translate(9px, 1px) rotate(-1.5deg); }
      52% { transform: translate(-9px, -5px) rotate(-3.5deg); }
      54% { transform: translate(-2px, 9px) rotate(1.5deg); }
      56% { transform: translate(6px, -1px) rotate(1.5deg); }
      58% { transform: translate(-6px, 0px) rotate(-0.5deg); }
      60% { transform: translate(3px, 1px) rotate(1.5deg); }
      62% { transform: translate(5px, -7px) rotate(-0.5deg); }
      64% { transform: translate(9px, 2px) rotate(2.5deg); }
      66% { transform: translate(6px, 0px) rotate(-2.5deg); }
      68% { transform: translate(5px, -4px) rotate(-2.5deg); }
      70% { transform: translate(-8px, 5px) rotate(-2.5deg); }
      72% { transform: translate(-6px, -2px) rotate(0.5deg); }
      74% { transform: translate(-3px, 7px) rotate(-3.5deg); }
      76% { transform: translate(-7px, -8px) rotate(-3.5deg); }
      78% { transform: translate(-1px, -2px) rotate(2.5deg); }
      80% { transform: translate(8px, 6px) rotate(-2.5deg); }
      82% { transform: translate(-2px, -9px) rotate(2.5deg); }
      84% { transform: translate(8px, -10px) rotate(-0.5deg); }
      86% { transform: translate(-6px, 0px) rotate(2.5deg); }
      88% { transform: translate(-1px, 9px) rotate(-3.5deg); }
      90% { transform: translate(-7px, 8px) rotate(1.5deg); }
      92% { transform: translate(-10px, -8px) rotate(0.5deg); }
      94% { transform: translate(-8px, 6px) rotate(1.5deg); }
      96% { transform: translate(4px, -9px) rotate(2.5deg); }
      98% { transform: translate(-4px, 9px) rotate(0.5deg); } }



`;
document.getElementsByTagName('head')[0].appendChild(style);



var selectText = function(text) {
    console.log('selectText - text: ', text);

    var allElements = document.querySelectorAll('*');
    allElements = Array.prototype.slice.call(allElements, 0);

    var newSelectedElement;

    var newSelectedElements = allElements.filter(function(element) {
        return element.innerText.toLowerCase().includes(text.toLowerCase());
    });

    if (newSelectedElements.length) {
        newSelectedElements.sort(function(a, b) {
            return a.innerText.length - b.innerText.length;
        });
        newSelectedElement = newSelectedElements[0];
    }

    console.log('newSelectedElement: ', newSelectedElement);

    if (newSelectedElement) {
        if (selectedElement) {
            selectedElement.className = selectedElement.className.replace(' pulse', '');
        }
        selectedElement = newSelectedElement;
        selectedElement.className += ' pulse';
    }

};


var selectParent = function() {
    if (!selectedElement) { return false; }
    if (selectedElement.parentNode) {
        selectedElement.className = selectedElement.className.replace(' pulse', '');
        selectedElement = selectedElement.parentNode;
        selectedElement.className += ' pulse';
    }
};


var selectNext = function() {
    if (!selectedElement) { return false; }
    if (selectedElement.nextElementSibling) {
        selectedElement.className = selectedElement.className.replace(' pulse', '');
        selectedElement = selectedElement.nextElementSibling;
        selectedElement.className += ' pulse';
    }
};


var selectPrevious = function() {
    if (!selectedElement) { return false; }
    if (selectedElement.previousElementSibling) {
        selectedElement.className = selectedElement.className.replace(' pulse', '');
        selectedElement = selectedElement.previousElementSibling;
        selectedElement.className += ' pulse';
    }
};


var selectChild = function(ordinal) {
    if (!selectedElement || !ordinal) { return false; }
    ordinal = ordinal.toLowerCase();
    var ordinals = {
        'first': 1,
        'second': 2,
        'third': 3,
        'fourth': 4,
        'fifth': 5,
        'sixth': 6,
        'seventh': 7,
        'eighth': 8,
        'ninth': 9,
        'tenth': 10
    };

    var pos = ordinals[ordinal];
    if (pos) {
        newSelectedElement = selectedElement.children[pos];
    } else if (ordinal == 'last') {
        newSelectedElement = selectedElement.children[selectedElement.children.length-1];
    }

    if (newSelectedElement) {
        selectedElement.className = selectedElement.className.replace(' pulse', '');
        selectedElement = newSelectedElement;
        selectedElement.className += ' pulse';
    }
};


var selectElement = function(element) {
    element = element.toLowerCase();
    console.log('selectElement - element: ', element);
    var hint;
    var hints = [
        ['image', 'img'],
        ['button', 'button'],
        ['dropdown menu', 'select'],
        ['dropdown', 'select'],
        ['element', null]
    ];

    hints.forEach(function(value) {
        if (element.includes(value[0])) {
            element = element.replace(value[0], '');
            hint = value[1];
        }
    });

    newSelectedElement = findElement(element.trim(), hint);

    console.log('newSelectedElement: ', newSelectedElement);

    if (selectedElement) {
        selectedElement.className = selectedElement.className.replace(' pulse', '');
    }
    if (newSelectedElement) {
        selectedElement = newSelectedElement;
        selectedElement.className += ' pulse';
    }

};

var findElement = function(element, hint) {
    console.log('findElement - element: ', element, ' hint: ', hint);
    var found;
    var checks = [];
    element = element.toLowerCase();

    dashed_element = element.replace(' ', '-');
    underscored_element = element.replace(' ', '_');

    element_words = element.split(" ");
    if (element_words.length > 1) {
        camel_words = element_words.map(function(word, index) {
            return (index == 0) ? word : word.charAt(0).toUpperCase() + word.slice(1);
        })
        element = camel_words.join("");
    }

    if (hint) {
        checks = checks.concat([
            hint + '#' + element,
            hint + '[id^="' + element + '"]',
            hint + '.' + element,
            '#' + element + ' ' + hint,
            '*[id^="' + element + '"] ' + hint,
            '.' + element + ' ' + hint,

            hint + '#' + dashed_element,
            hint + '[id^="' + dashed_element + '"]',
            hint + '.' + dashed_element,
            '#' + dashed_element + ' ' + hint,
            '*[id^="' + dashed_element + '"] ' + hint,
            '.' + dashed_element + ' ' + hint,

            hint + '#' + underscored_element,
            hint + '[id^="' + underscored_element + '"]',
            hint + '.' + underscored_element,
            '#' + underscored_element + ' ' + hint,
            '*[id^="' + underscored_element + '"] ' + hint,
            '.' + underscored_element + ' ' + hint

        ]);
        if (hint == 'button') {
            checks = checks.concat([
                'input#' + element + '[type="submit"]',
                'input[id^="' + element + '"][type="submit"]',
                'input.' + element + '[type="submit"]',

                'input#' + dashed_element + '[type="submit"]',
                'input[id^="' + dashed_element + '"][type="submit"]',
                'input.' + dashed_element + '[type="submit"]',

                'input#' + underscored_element + '[type="submit"]',
                'input[id^="' + underscored_element + '"][type="submit"]',
                'input.' + underscored_element + '[type="submit"]',

                'input[type="submit"][value="' + element + '"]',
                'input[type="button"][value="' + element + '"]'

            ]);
        }
    }

    checks = checks.concat([
        '#' + element,
        '*[id^="' + element + '"]',
        '.' + element,

        '#' + dashed_element,
        '*[id^="' + dashed_element + '"]',
        '.' + dashed_element,

        '#' + underscored_element,
        '*[id^="' + underscored_element + '"]',
        '.' + underscored_element
    ]);

    found = checks.filter(function(check) {
        return document.querySelectorAll(check).length;
    });

    console.log('found: ', found);

    if (found && found[0]) {
        var el = document.querySelectorAll(found[0])[0];
        return el;
    }

}

var setStyle = function(style, value) {
    console.log('setStyle - style: ', style, ' value: ', value);
    if (!selectedElement) {
        return;
    }
    style_words = style.split(" ");
    if (style_words.length > 1) {
        camel_words = style_words.map(function(word, index) {
            return (index == 0) ? word : word.charAt(0).toUpperCase() + word.slice(1);
        })
        style = camel_words.join("");
    }

    value = value.replace(" pixels", "px");
    value = value.replace(" pixel", "px");
    value = value.replace(" pickles", "px");
    value = value.replace(" percent", "%");
    value = value.replace(" per-cent", "%");

    value = value.replace(/(\d+),? (\d+),? (\d+)/, "rgb($1, $2, $3)");

    selectedElement.style[style] = value;

    changeLog.push({'element': selectedElement, 'style': style, 'value': value});

};


var shakeThingsUp = function() {
    var allElements = document.querySelectorAll('*');
    allElements = Array.prototype.slice.call(allElements, 0);

    shakeEm = ['DIV', 'SPAN', 'A', 'IMG', 'H1', 'H2', 'H2', 'H4', 'H5', 'H6',
               'B', 'STRONG', 'I', 'EM', 'INPUT', 'BUTTON'];

    shakeElements = allElements.filter(function(element) {
        return Math.random() > 0.4 && shakeEm.indexOf(element.tagName) > -1;
    });

    shakeElements.forEach(function(element) {
        element.className += "shake shake-slow";
    });
};


var selectLargestImage = function() {
    console.log('selectLargestImage');
    var images = document.getElementsByTagName('img');
    images = Array.prototype.slice.call(images, 0);
    console.log('images.length: ', images.length);
    var imageSizes = images.map(function(image) {
        var area = image.clientWidth * image.clientHeight;
        return {'image': image, 'area': area};
    });
    imageSizes.sort(function(a, b) {
        return b['area'] > a['area'];
    });
    var newSelectedElement = imageSizes[0]['image'];
    console.log('newSelectedElement: ', newSelectedElement);

    if (selectedElement) {
        selectedElement.className = selectedElement.className.replace(' pulse', '');
    }
    selectedElement = newSelectedElement;
    selectedElement.className += ' pulse';

};


var replaceText = function(text) {
    if (!selectedElement) { return false; }
    var capitalize = function(string, capital_letter, word_to_capitalize) {
        console.log('capitalize - capital_letter: ', capital_letter, ' word_to_capitalize: ', word_to_capitalize);
        if (capital_letter.toUpperCase() == word_to_capitalize.charAt(0).toUpperCase()) {
            return word_to_capitalize.charAt(0).toUpperCase() + word_to_capitalize.slice(1);
        }
    };
    text = text.replace(/capital (\w) (\w+)/g, capitalize);
    selectedElement.innerHTML = text;
    changeLog.push({'element': selectedElement, 'operation': 'replace text', 'value': text});
}


var hideElement = function() {
    if (!selectedElement) { return false; }
    selectedElement.previousDisplay = selectedElement.style.display;
    selectedElement.style.display = 'none';
    changeLog.push({'element': selectedElement, 'style': 'display', 'value': 'none'});
};


var showElement = function() {
    if (!selectedElement) { return false; }
    selectedElement.style.display = selectedElement.previousDisplay;
    changeLog.push({'element': selectedElement, 'style': 'display', 'value': selectedElement.previousDisplay});
};


var speakStyle = function(style) {
    console.log('speakStyle - style: ', style);
    if (!selectedElement) { return false; }

    style_words = style.split(" ");
    if (style_words.length > 1) {
        camel_words = style_words.map(function(word, index) {
            return (index == 0) ? word : word.charAt(0).toUpperCase() + word.slice(1);
        })
        style = camel_words.join("");
    }

    var value = selectedElement.style[style];
    if (!value) {
        computed = true;
        if (style == 'width') {
            computed = selectedElement.offsetWidth + 'px';
        }
        else if (style == 'height') {
            computed = selectedElement.offsetHeight + 'px';
        }
        computedStyles = window.getComputedStyle(selectedElement);
        dashed_style = style.replace(' ', '-');
        computed = computedStyles[dashed_style];
        if (computed.includes('px')) {
            computed = computed.replace('px','');
            computed = Math.round(computed) + ' pixels';
        }
    }

    if (value) {
        value = value.replace("px", " pixels");
        value = value.replace("%", " percent");
        var msg = new SpeechSynthesisUtterance('Its ' + style + ' is ' + value + '.');
    } else if (computed) {
        computed = computed.replace("px", " pixels");
        computed = computed.replace("%", " percent");
        var msg = new SpeechSynthesisUtterance('Its ' + style + ' is not set, but its computed ' + style + ' is ' + computed + '.');
    } else {
        var msg = new SpeechSynthesisUtterance('I could not determine its ' + style + '.');
    }
    msg.onstart = function(e) {
        annyang.pause();
    };
    msg.onend = function(e) {
        annyang.resume();
    };
    window.speechSynthesis.speak(msg);
};


var showChangeLog = function() {
    console.table(changeLog);
};



if (annyang) {

  annyang.debug(true);

  // Let's define a command.
  var commands = {
    'show (the) change log': showChangeLog,
    'output (the) change log': showChangeLog,
    'print (the) change log': showChangeLog,
    '(show me the) change log': showChangeLog,
    'hide it': hideElement,
    'show it': showElement,
    'select the largest image': selectLargestImage,
    'shake things up': shakeThingsUp,
    'select the parent': selectParent,
    'select the :ordinal child': selectChild,
    'select its parent': selectParent,
    'select its :ordinal child': selectChild,
    '(go to the) next element': selectNext,
    'select (the) next element': selectNext,
    '(go to the) next sibling': selectNext,
    'select (the) next sibling': selectNext,
    '(go to the) previous element': selectPrevious,
    'select (the) previous element': selectPrevious,
    '(go to the) previous sibling': selectPrevious,
    'select (the) previous sibling': selectPrevious,
    'select the text *text': selectText,
    'select the *element': selectElement,
    'change (the) text to *value': replaceText,
    'replace (the) text with *value': replaceText,
    'change the *style to *value': setStyle,
    'set the *style to *value': setStyle,
    'change (its) *style to *value': setStyle,
    'set (its) *style to *value': setStyle,
    'tell me its *style': speakStyle,
    'tell me the *style': speakStyle
  };


  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  annyang.start();
}

