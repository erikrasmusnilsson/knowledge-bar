/*
 *      
 *      Knowledge Bar, developed by Rasmus Nilsson
 *      info@rasmusnilsson.se
 *      https://rasmusnilsson.se/
 * 
 */

window.onresize = function () {
    if (window.screenX > 1221) {
        
    }
};

var knRuns = 0;
function knowledgeBar () {
    var bars = document.getElementsByClassName("knowledge-bar");
    var percent;
    var listItems;
    var numberOfBars;
    var animatesOnLoad = new Array();
    
    for (var i = 0; i < bars.length; i++) {
        
        percent = bars.item(i).dataset.percent;
        
        if (percent > 100 || percent < 0) {
            console.log(
                    "[Knowledge bar]\n" + 
                    "Percentage must be between 0-100."
            );
            continue;
        }
        
        listItems = "";
        numberOfBars = percent / 10;
        
        for (var j = 0; j < numberOfBars; j++) { // Fill with active bars
            var isAnim = bars.item(i).dataset.knAnimate;
            var customColor = bars.item(i).dataset.knActiveColor;
            var unactiveColor = bars.item(i).dataset.knUnactiveColor;
            listItems += "<li class='kn-bar active";
            listItems += isAnim ? " kn-animate kn-id-" + i + "'" : "'";
            listItems += customColor ? "data-color='"+customColor+"'" : "";
            listItems += customColor && !isAnim ? "style='background-color: "+customColor+"'" : "";
            listItems += customColor && isAnim && unactiveColor ? "style='background-color: "+unactiveColor+"'" : "";
            listItems += !customColor && isAnim && unactiveColor ?  "style='background-color: "+unactiveColor+"'" : "";
            listItems += "&nbsp;</li>";
        }
        for (var j = 0; j < (10 - numberOfBars); j++) { // Fill rest with unactive bars
            var customColor = bars.item(i).dataset.knUnactiveColor;
            listItems += "<li class='kn-bar'";
            listItems += customColor ? "style='background-color: "+customColor+"'" : "";
            listItems += ">&nbsp;</li>";
        }
        
        bars.item(i).innerHTML = listItems;
        if (bars.item(i).dataset.knAnimateOnLoad) {
            animatesOnLoad.push(bars.item(i));
        }
    }
    
    if (knRuns === 0) {
        window.onload = function(){
            for (var i = 0; i < animatesOnLoad.length; i++) {
                animateSpecificBars(i);
            }
        }
    } else {
        for (var i = 0; i < animatesOnLoad.length; i++) {
            animateSpecificBars(i);
        }
    }
    
    knRuns++;
}

function animateAllBars () {
    var activeBars = document.getElementsByClassName("kn-animate");
    for (var i = 0; i < activeBars.length; i++) {
        var customColor = activeBars.item(i).dataset.color;
        activeBars.item(i).style.backgroundColor = customColor ? customColor : "blueviolet";
        activeBars.item(i).style.transition = "all 0.2s " + (i / 5) + "s ease-out";
    }
}

function animateSpecificBars (id) {
    var activeBars = document.getElementsByClassName("kn-id-" + id);
    for (var i = 0; i < activeBars.length; i++) {
        var customColor = activeBars.item(i).dataset.color;
        activeBars.item(i).style.backgroundColor = customColor ? customColor : "blueviolet";
        activeBars.item(i).style.transition = "all 0.2s " + (i / 5) + "s ease-out";
    }
}


