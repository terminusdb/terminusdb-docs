function tdb_init() 
{
    // Set title and hide navbar on home page.

    const cSfx = " - TerminusDB Docs";
    
    if (location.hash == "#/")
    {
        document.title = `Home${cSfx}`;
        
        tdb_nav_hide();
    }
    else
        document.title += cSfx;
}

function tdb_nav_hide()
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

function tdb_theme()
{
    return;

    document.documentElement.style.setProperty('--base-background-color', 'rgb(250, 250, 250)'); 

    document.documentElement.style.setProperty('--heading-color', 'rgb(0, 0, 0)');

    document.documentElement.style.setProperty('--sidebar-background', 'rgb(200, 200, 200)');
    
    document.documentElement.style.setProperty('--link-color', 'orangered');

    document.documentElement.style.setProperty('--pagination-label-color', 'rgb(0, 0, 0)'); 

    document.documentElement.style.setProperty('--blockquote-background', 'rgb(240, 240, 240)');

    document.documentElement.style.setProperty('--table-row-odd-background', 'rgb(240, 240, 240)');

    document.documentElement.style.setProperty('--base-color', 'rgb(50, 50, 50)');

    document.documentElement.style.setProperty('--table-cell-border-color', 'rgb(200, 200, 200)');
}