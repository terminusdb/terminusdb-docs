var __tdb_hC = 0,
    __tdb_bC = 0;

function tdb_TOC(sHTML)
{    
    var toc         = document.getElementById("contents-page"),
        doc         = document.createElement("href"),
        p           = '<p class="tdb-f">',
        dv          = '<div class="tdb-h"></div>';
        br          = "<br>",
        sHdr        = "",
        sDiagram    = "",
        sTable      = "",
        sCode       = "",
        sI          = "",
        sO          = "",
        len         = 0;

    toc.innerHTML   = '<div style="top:0;left:0;z-index:11;"><img class="tdb-ico" src="../../img/ico/terminusdb-icon-contents-page.png" title="Hide contents page..."/></div>' + p + 
                      'Table of contents</p>';
    doc.innerHTML   = sHTML;
    doc             = doc.querySelectorAll("h1, h2, h3, h4");
    len             = doc.length;

    window.addEventListener("resize", function() { hideC(toc); });
    
    hideC(toc);

    for (var i = 0; i < doc.length; i++)
    {
        sI = doc[i].innerHTML;

        sI = sI.replace('class="anchor"', 'class="tdb-k"');

        if (sI.indexOf("Table:") > -1)
            sTable += dv + sI + br;
        else if (sI.indexOf("Diagram:") > -1)
            sDiagram += dv + sI + br;
        else if (sI.indexOf("Code:") > -1)
            sCode += dv + sI + br;
        else
        {
            sO = doc[i].outerHTML;

            if (sO.indexOf("h1") > -1)
                sI = sI.replace("tdb-k", "tdb-k tdb-k-h1");
            else if (sO.indexOf("h2") > -1)
                sI = br + sI.replace("tdb-k", "tdb-k tdb-k-h2");
            else if (sO.indexOf("h4") > -1)
                sI = "&#9864;&nbsp;&nbsp;</font>" + sI;

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
    if (sCode.length > 0)
        toc.innerHTML += p + 'Code</p>' + sCode;
}

function hideC(t)
{
    t.style.visibility = (t.clientWidth <= 298 ? "hidden" : "visible")
}
