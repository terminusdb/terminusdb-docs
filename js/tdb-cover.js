function tdb_cvrMain(o)
{
    const cClass = ["ready-transition", "ready-spinner"]; 
    var docBody = document.body.classList;

    o == 1 ? docBody.remove(cClass[0], cClass[1]) : docBody.add(cClass[0], cClass[1]);

    tdb_cvrOpac("cvr", (o == 1 ? o : 0.8));   
    tdb_cvrOpac("opt", o, 9);
}

function tdb_cvrSub(o)
{
    tdb_cvrOpac("cvr-pgs", (o == 1 ? o : 0.8));
    tdb_cvrOpac("pgs", o, 6);
}

function tdb_cvrVenn(o)
{
    tdb_cvrOpac("cvr-venn", (o == 1 ? o : 0.8));
    tdb_cvrOpac("venn", o, 4);
}

function tdb_cvrOpac(i, o, r)
{
    // i - id, o - opacity, r - repeat

    if (r == null)
        document.getElementById(`id-${i}`).style.opacity = o;
    else
        for (var n = 1; n <= r; n++)
            document.getElementById(`id-${i}-` + (n < 10 ? `0${n}` : n)).style.opacity = o;
}

function tdb_cvrHide(i)
{
    const e = document.getElementById(`id-${i}`)

    if (typeof(e) != 'undefined' && e != null)
        e.style.visibility = "hidden";
}