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

function run() {

    var bShowForks, sSubDomain, sUrl, sUser, $List;

    sSubDomain = document.location.host.split('.').shift();

    if (sSubDomain === 'bpkg') {
        sSubDomain = 'bash';
    }

    sUser = 'potherca-' + sDomain;

    sShowForks = false;

    if (sSubDomain === 'contrib') {
      sShowForks = true;
    }

    var $List = $('#list'),
        /*/
            @TODO: Once there are more than a hundred repos for a user this needs to be
                  resolved by parsing the "Link" HTTP header send with the response
        /*/
        sUrl = 'https://api.github.com/users/' + sUser + '/repos?per_page=100'
    ;

    $.ajax({
        dataType: "json",
        url: sUrl,
        success: function(p_oData, p_sStatus, p_oRequest){
            $.each(p_oData, function(p_iIndex, p_oRepo){
                var sHomepageLink='';
                if(p_oRepo.fork === false || sShowForks === true){
                    if(p_oRepo.homepage){
                        sRepoName = '<a href="' + p_oRepo.homepage + '" target="_blank">' + p_oRepo.name  + '</a> '
                    } else {
                        sRepoName = '<a title="Click the Github icon to visit this repo" target="_blank">' + p_oRepo.name  + '</a> '
                    }
                    $List.append(
                          '<li>'
                            + ' <a href="' + p_oRepo.html_url + '" class="el el-github" target="_blank"></a>'
                            + sRepoName
                            + '<span class="description">' + p_oRepo.description + '</span>'
                        + '</li>'
                    );
                }
            });
        },
        error: function(p_oJqXHR, p_sStatus, p_sError){
            $List.append('<li class="error">' + p_sError + ': ' + p_sStatus + '</li>');
        }
    });
};

loadScript('https://code.jquery.com/jquery-1.12.4.min.js', run);

/*EOF*/
