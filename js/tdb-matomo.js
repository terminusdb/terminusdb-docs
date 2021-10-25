var _paq = window._paq = window._paq || [];

_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
    
(
    function() {
        var u="https://terminusdb.matomo.cloud/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '1']);
          
        var d=document, 
            g=d.createElement('script'), 
            s=d.getElementsByTagName('script')[0];
            
        g.async=true; 
        g.src='//cdn.matomo.cloud/terminusdb.matomo.cloud/matomo.js'; 
        s.parentNode.insertBefore(g,s);
    }
)();