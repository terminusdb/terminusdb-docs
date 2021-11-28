function tdb_nav_cover(o)
{
    document.getElementById("id-cvr").style.opacity = (o == 1 ? o : 0.8);

    document.getElementById("id-01").style.opacity = o;
    document.getElementById("id-02").style.opacity = o;
    document.getElementById("id-03").style.opacity = o;
    document.getElementById("id-04").style.opacity = o;
    document.getElementById("id-05").style.opacity = o;
    document.getElementById("id-06").style.opacity = o;
    document.getElementById("id-07").style.opacity = o;
    document.getElementById("id-08").style.opacity = o;
    document.getElementById("id-09").style.opacity = o;

}

function tdb_cvr_p(o)
{
    document.getElementById("id-cvr-pgs").style.opacity = (o == 1 ? o : 0.8);

    document.getElementById("id-pgs-01").style.opacity = o;
    document.getElementById("id-pgs-02").style.opacity = o;
    document.getElementById("id-pgs-03").style.opacity = o;
    document.getElementById("id-pgs-04").style.opacity = o;
    document.getElementById("id-pgs-05").style.opacity = o;
    document.getElementById("id-pgs-06").style.opacity = o;
}

function tdb_hide()
{
    document.getElementById("id-nav").style.visibility = "hidden";
}