if (tdb_localStore()) 
{
    //  Include search plugin if local storage is enabled.

    var script = document.createElement('script');

    script.src = 'https://cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js';
    script.async = false;
        
    document.head.appendChild(script);
}

function tdb_localStore() 
{
    try 
    {
      localStorage.setItem('x', 'x');
      localStorage.removeItem('x');

      return true;
    } 
    catch (e)
    { 
      return false;
    }
}

function tdb_title() 
{
    const cSfx = " - TerminusDB Docs";

    // Set title and hide navbar on home page.

    if (location.hash == "#/")
    {
        document.title = `Home${cSfx}`;
        
        tdb_cvrHide("nav");
        tdb_cvrHide("theme");
    }
    else
        document.title += cSfx;
}

function tdb_adjust()
{
    var d = document.getElementById("main").style;
    
    d.marginLeft = "50px";
    d.marginTop  = "65px";
    d.float      = "left";
}

function tdb_theme(t) 
{
    var cssLnk = document.getElementsByTagName("link").item(3);
    const cssList = ["dark", "light"];

    cssLnk.href = `css/terminusdb-docs-${cssList[t]}.css`;
}