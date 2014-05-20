(function(){
    function getFileContent(p_sUrl, p_fCallback) {
        var oRequest = new XMLHttpRequest();
        
        oRequest.open('GET', p_sUrl, true);

        oRequest.onload = function() {
            var sData = 'Could not retrieve ' . p_sUrl;

            if (oRequest.status >= 200 && oRequest.status < 400){
                sData = oRequest.responseText;
            }

            p_fCallback(undefined, sData);
        };

        oRequest.onerror = function(p_oError) {
            p_fCallback(p_oError, data);
        };

        oRequest.send();
    }

    getFileContent('./dabblet.html', function(p_oError, p_sData) {
        if (typeof p_oError !== 'undefined') {
            console.log(p_oError, p_sData);
        } else {
            document.getElementById('dabblet-html-goes-here').outerHTML = p_sData;
            getFileContent('./dabblet.js', function(p_oError, p_sData){
                if (parent === window) {
                    if (typeof p_oError !== 'undefined') {
                        alert('Could not load Dabblet Javascript');
	                } else {
        		        eval(p_sData);		
	                }
                }
            });
        }
    });
    
    getFileContent('./dabblet.css', function(p_oError, p_sData) {
        var sTitle;
        
        if (typeof p_oError !== 'undefined') {
            sTitle = p_sData = 'Untitled';
        } else {
            sTitle = (p_sData && p_sData.match(/^\/\*[\s\*\r\n]+(.+?)($|\*\/)/m) || [,'Untitled'])[1];
        }
        
        document.title = sTitle + ' ✿ Dabblet';
    });
    
}());

/* EOF */
