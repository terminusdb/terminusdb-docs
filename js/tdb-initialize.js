

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

function tdb_hashCheck()
{
    var sLoc = location.href;

    if (sLoc.indexOf("#") > -1 && sLoc.indexOf("/#/") == 0)
        location.href = sLoc.replace("#/", "/#/");

}

function tdb_init() 
{
    const cSfx = " - TerminusDB Docs";

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

    return; 

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(cssLinkIndex).replaceChild(newlink, oldlink);
}

/*
function tdb_theme()
{
    return;

    document.documentElement.style.setProperty('--base-background-color', 'rgb(250, 250, 250)'); 

    document.documentElement.style.setProperty('--heading-color', 'rgb(0, 0, 0)');

    document.documentElement.style.setProperty('--sidebar-background', 'rgb(250, 250, 250)');
    
    document.documentElement.style.setProperty('--link-color', 'rgb(3, 179, 248)');

    document.documentElement.style.setProperty('--pagination-label-color', 'rgb(0, 0, 0)'); 

    document.documentElement.style.setProperty('--blockquote-background', 'rgb(220, 220, 220)');

    document.documentElement.style.setProperty('--table-row-odd-background', 'rgb(240, 240, 240)');

    document.documentElement.style.setProperty('--base-color', 'rgb(50, 50, 50)');

    document.documentElement.style.setProperty('--table-cell-border-color', 'rgb(200, 200, 200)');

   // document.querySelector('.tdb-ico-nav').style.setProperty('fill', 'rgb(0, 0, 0)');;

    // console.log(document.getElementsByClassName("tdb-ico-nav").length);

   // document.getElementsByClassName("tdb-ico-nav")[0].style.fill = "rgb(0, 0, 0)";

}
*/