(function(){

    var sRoot = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/';
/*
        var aAvailableStyles = ['arta', 'ascetic', 'atelier-dune.dark', 'atelier-dune.light', 'atelier-forest.dark', 'atelier-forest.light', 'atelier-heath.dark', 'atelier-heath.light', 'atelier-lakeside.dark', 'atelier-lakeside.light', 'atelier-seaside.dark', 'atelier-seaside.light', 'brown_paper', 'dark', 'default', 'docco', 'far', 'foundation', 'github', 'googlecode', 'idea', 'ir_black', 'magula', 'mono-blue', 'monokai', 'monokai_sublime', 'obsidian', 'paraiso.dark', 'paraiso.light', 'pojoaque', 'railscasts', 'rainbow', 'school_book', 'solarized_dark', 'solarized_light', 'sunburst', 'tomorrow-night-blue', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'tomorrow-night', 'tomorrow', 'vs', 'xcode', 'zenburn']
        var aAvailableLanguages = ['1c', 'actionscript', 'apache', 'apacheconf', 'applescript', 'as', 'asciidoc', 'atom', 'autohotkey', 'avrasm', 'axapta', 'bash', 'bat', 'bf', 'brainfuck', 'c', 'c++', 'capnp', 'capnproto', 'clj', 'clojure', 'cmake', 'cmake.in', 'cmd', 'coffee', 'coffeescript', 'cpp', 'cs', 'csharp', 'cson', 'css', 'd', 'delphi', 'diff', 'django', 'dos', 'elixir', 'erl', 'erlang', 'fix', 'fs', 'fsharp', 'gemspec', 'gherkin', 'glsl', 'go', 'golang', 'gyp', 'h', 'h++', 'haml', 'handlebars', 'haskell', 'hbs', 'hs', 'html', 'html.handlebars', 'html.hbs', 'http', 'iced', 'ini', 'irb', 'java', 'javascript', 'jinja', 'js', 'json', 'jsp', 'lasso', 'lassoscript', 'lisp', 'livecodeserver', 'ls', 'lua', 'm', 'mak', 'makefile', 'markdown', 'mathematica', 'matlab', 'md', 'mel', 'mizar', 'mk', 'mkd', 'mkdown', 'ml', 'mm', 'mma', 'monkey', 'nginx', 'nginxconf', 'nix', 'nsis', 'obj-c', 'objc', 'objectivec', 'ocaml', 'osascript', 'oxygene', 'parser3', 'patch', 'perl', 'php', 'php3', 'php4', 'php5', 'php6', 'pl', 'plist', 'podspec', 'profile', 'protobuf', 'py', 'python', 'r', 'rb', 'rib', 'rs', 'rsl', 'rss', 'ruby', 'ruleslanguage', 'rust', 'scala', 'sci', 'scilab', 'scss', 'sh', 'smalltalk', 'sql', 'st', 'tex', 'thor', 'thrift', 'vala', 'vb', 'vbnet', 'vbs', 'vbscript', 'vhdl', 'vim', 'x86asm', 'xhtml', 'xml', 'xsl', 'zsh']
*/    
    
    function getQueryParameters(p_sUrl) {
        var oParameters, sQuery, aKeyValuePairs, aKeyValuePair;

        oParameters = {};
        sQuery = p_sUrl.split('?')[1] || '';
        aKeyValuePairs = sQuery.split('&');

        aKeyValuePairs.forEach(function(p_sKeyValuePair) {
            aKeyValuePair = p_sKeyValuePair.split('=');
            oParameters[aKeyValuePair[0]] = aKeyValuePair[1] || '';
        });

        return oParameters;
    }

    function getParameters(){
        var oParameters, oQueryParameters, aScripts, iLastScript, sIndex;

        oParameters = {
              theme : 'default'
            , language : ''
        };
        aScripts = document.getElementsByTagName('script');
        iLastScript = aScripts.length - 1;
        oQueryParameters = getQueryParameters(aScripts[iLastScript].src);

        for(sIndex in oQueryParameters){
            //noinspection JSUnfilteredForInLoop
            if(typeof oParameters[sIndex] !== 'undefined'){
                //noinspection JSUnfilteredForInLoop
                oParameters[sIndex] = decodeURIComponent(oQueryParameters[sIndex]);
            }
        }

        return oParameters;
    }

    /* Code adopted from the jQuery `getScript` function */
    function loadScript(p_sScript, p_fCallback) {
        var fCallback, oNode, sState;
        
        fCallback = p_fCallback || function(){};
        
        oNode = document.createElement('script');
        oNode.src = sRoot + p_sScript;
        oNode.async = true;
        
        oNode.onreadystatechange = oNode.onload = function() {
            sState = oNode.readyState;
            if (!fCallback.done && (!sState || /loaded|complete/.test(sState))) {
                fCallback.done = true;
                fCallback();
            }
        };
        document.getElementsByTagName('head')[0].appendChild(oNode);
    }

    function addJsHighlight(p_oParameters){
        var sTheme, aLanguages, oNode, t_iIndex, aScripts = [];

        sTheme = p_oParameters.theme || 'default';

        if (p_oParameters.language && p_oParameters.language.indexOf(',')) {
            aLanguages = p_oParameters.language.split(',');        
        } else if (p_oParameters.language !== '') {
            aLanguages = [p_oParameters.language]
        } else {
            aLanguages = [];
        }

        /* add theme stylesheet */
        oNode = document.createElement('link');
        oNode.setAttribute('rel', 'stylesheet');
        oNode.setAttribute('href', sRoot + '/styles/' + sTheme + '.min.css');
        document.head.appendChild(oNode);

        /* add language for each language parameter */
        for (t_sIndex in aLanguages) {
           aScripts.push('languages/' + aLanguages[t_sIndex] + '.min.js');
        }


        /* add highlight.js */
        loadScript('/highlight.min.js', function(){
            /* add language specific JS once hljs is loaded */
            for (t_iIndex in aScripts) {
                loadScript(aScripts[t_iIndex]);
            }
            
            hljs.initHighlightingOnLoad();
        });
    }

    addJsHighlight(getParameters());
    
}());
    

