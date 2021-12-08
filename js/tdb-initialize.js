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
    console.log("Checking local storage...")

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

function tdb_hashCheck()
{
    var sLoc = location.href;

    console.log(`Current file location: ${sLoc}`);

    if (sLoc.indexOf("#/") > -1 && sLoc.indexOf("/#/") == -1)
        location.href = sLoc.replace("#/", "/#/");
}

function tdb_init() 
{
    const cSfx = " - TerminusDB Docs";

    console.log(`Adding${cSfx} suffix...`)

    // Set title and hide navbar on home page.

    if (location.hash == "#/")
    {
        document.title = `Home${cSfx}`;
        
        tdb_navHide();
    }
    else
        document.title += cSfx;
}

function tdb_navHide()
{
    var e = document.getElementById("id-nav");
        
    if (typeof(e) != 'undefined' && e != null)
        e.style.visibility = "hidden";
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
    if (t == 1)
    {
        var oldLink = document.getElementsByTagName("link").item(1);
        
        oldLink.href = "css/terminusdb-docs-light.css";
    }
}