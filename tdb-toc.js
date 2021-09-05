var __tdb_hC = false;
var __tdb_init = false; // Set to true if visibility starts as hidden
    
function tdb_TOC(sHTML)
{    
    var toc         = document.getElementById("contents-page"),
        tocCtrl     = document.getElementById("contents-ctrl"),
        doc         = document.createElement("href"),
        p           = '<p class="tdb-f">',
        dv          = '<div class="tdb-h"></div>';
        br          = "<br>",
        sHdr        = "",
        sDiagram    = "",
        sTable      = "",
        sCode       = "",
        sData       = "";
        sI          = "",
        sO          = "",
        len         = 0;

    toc.innerHTML   = '<b>Table of contents<b><br><br>'; 
    tocCtrl.innerHTML = '<img onclick="hideCtrl()" src="img/ico/terminusdb-icon-contents-page.png" title="Show/hide contents page"/>'; 
    
    doc.innerHTML   = sHTML;
    doc             = doc.querySelectorAll("h1, h2, h3, h4, h5");
    len             = doc.length;

    window.addEventListener("resize", function() { hideC(toc, tocCtrl); });

    hideC(toc, tocCtrl);
    
    for (var i = 0; i < doc.length; i++)
    {
        sI = doc[i].innerHTML;

        sI = sI.replace('class="anchor"', 'class="tdb-k"');

        if (sI.indexOf("Table:") > -1)
            sTable += dv + sI.replace("Table: ", "") + br;
        else if (sI.indexOf("Diagram:") > -1)
            sDiagram += dv + sI.replace("Diagram: ", "") + br;
        else if (sI.indexOf("Data:") > -1)
            sData += dv + sI.replace("Data: ", "") + br;
        else if (sI.indexOf("Code:") > -1)
            sCode += dv + sI.replace("Code: ", "") + br;
        else
        {
            sO = doc[i].outerHTML;

            if (sO.indexOf("h1") > -1)
                sI = sI.replace("tdb-k", "tdb-k tdb-k-h1");
            else if (sO.indexOf("h2") > -1)
                sI = br + sI.replace("tdb-k", "tdb-k tdb-k-h2");
            else if (sO.indexOf("h4") > -1)
                sI = "&nbsp;&nbsp;&nbsp;&nbsp;</font>" + sI;
            else if (sO.indexOf("h5") > -1)
                sI = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>" + sI;

            sHdr += dv + sI + br;
        }
    }

    toc.innerHTML += sHdr;
    
    if (sTable.length > 0 || sDiagram.length > 0 || sCode.length > 0)
        toc.innerHTML += '<hr class="tdb-l"/>';

    if (sTable.length > 0)
        toc.innerHTML += p + 'Tables</p>' + sTable;
    if (sDiagram.length > 0)
        toc.innerHTML += p + 'Diagrams</p>' + sDiagram;
    if (sData.length > 0)
        toc.innerHTML += p + 'Data</p>' + sData;
    if (sCode.length > 0)
        toc.innerHTML += p + 'Code</p>' + sCode;

    toc.innerHTML += br;
}

function hideCtrl()
{
    // Quick fix - a more efficient solution to follow.

    var v = document.getElementById("contents-page");

    if (v.style.visibility == "visible")
    {
        v.style.visibility = "hidden";

        __tdb_hC = true;
    }
    else
    {   
        v.style.visibility = "visible";

        __tdb_hC = false;
    }

} 

function hideC(t, tC)
{
    // Quick fix - a more efficient solution to follow.

    if (__tdb_init)
    {
        __tdb_init = false;
        return;
    }

    t.style.visibility = (t.clientWidth > 290 && !__tdb_hC ? "visible" : "hidden");
    
    tC.style.visibility = (t.clientWidth > 290 ? "visible" : "hidden");
}