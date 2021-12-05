const __tdb_width = 312, // Auto-hide threshold 
      __cVis = "visible",
      __cHid = "hidden"

var  __tdb_init = false, // Set to true if visibility starts as hidden 
     __tdb_hC   = false;
    
function tdb_TOC(sHTML)
{    
    var toc      = document.getElementById("contents-page"),
        tocCtrl  = document.getElementById("contents-ctrl"),
        doc      = document.createElement("href"),
        sHdr     = "",
        sDiagram = "",
        sTable   = "",
        sCode    = "",
        sData    = "",
        nLen     = "",
        sI       = "",
        sO       = "";

    const sp = '<span class="tdb-f">',
          dv = '<div class="tdb-h"></div>',
          br = "<br>";

    doc.innerHTML= sHTML;
    doc = doc.querySelectorAll("h1, h2, h3, h4, h5");
    nLen= doc.length;

    if (nLen == 1)
    {
        toc.style.visibility = __cHid;
        tocCtrl.style.visibility = __cHid;
        return;
    }
    
    tocCtrl.innerHTML = '<img onclick="hideCtrl()" src="img/ico/terminusdb-icon-contents-page.png" title="Show/hide contents page..."/>'; 
    toc.innerHTML     = sp + 'Table of contents</span>' + br + br;

    window.addEventListener("resize", function() { hideC(toc, tocCtrl); });

    hideC(toc, tocCtrl);
    
    for (var i = 0; i < nLen; i++)
    {
        sI = doc[i].innerHTML;

        sI = sI.replace('class="anchor"', 'class="tdb-k tdb-g"');

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
                sI = sI.replace("tdb-k tdb-g", "tdb-k tdb-k-h1");
            else if (sO.indexOf("h2") > -1)
                sI = br + sI.replace("tdb-k tdb-g", "tdb-k tdb-k-h2");
            else if (sO.indexOf("h4") > -1)
                sI = sI.replace("tdb-k tdb-g", "tdb-k tdb-dg");
            else if (sO.indexOf("h5") > -1)
                sI = "&nbsp;&nbsp;</font>" + sI;

            sHdr += dv + sI + br;
        }
    }

    toc.innerHTML += sHdr;

    toc.innerHTML += (sTable.length > 0 || sDiagram.length > 0 || sCode.length > 0 || sData.length > 0 ? '<hr class="tdb-l"/>' : br);

    if (sTable.length > 0)
        toc.innerHTML += sp + 'Tables</span>' + sTable + br;
    if (sDiagram.length > 0)
        toc.innerHTML += sp + 'Diagrams</span>' + sDiagram + br;
    if (sData.length > 0)
        toc.innerHTML += sp + 'Data</span>' + sData + br;
    if (sCode.length > 0)
        toc.innerHTML += sp + 'Code</span>' + sCode + br;
}

function hideCtrl()
{
    // Quick fix.

    var v = document.getElementById("contents-page");

    if (v.style.visibility == __cVis)
    {
        v.style.visibility = __cHid;
        __tdb_hC = true;
    }
    else
    {   
        v.style.visibility = __cVis;

        __tdb_hC = false;
    }
} 

function hideC(t, tC)
{
    // Quick fix.

    if (__tdb_init)
    {
        __tdb_init = false;
        return;
    }

    t.style.visibility = (t.clientWidth > __tdb_width && ! __tdb_hC ? __cVis : __cHid);
    tC.style.visibility = (t.clientWidth > __tdb_width ?__cVis : __cHid);
}