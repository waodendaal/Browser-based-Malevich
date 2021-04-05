// blacksquare.js is part of a triptych of Firefox browser-plugins called Browser-based Malevich
// by Adriaan Odendaal and internet teapot (www.internetteapot.com) 
// Github: https://github.com/waodendaal/Browser-based_Malevich
// Medium post: https://medium.com/internet-teapot 
//This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.


// Block the body
var body = document.body 
body.style.transition =  "20s ease-in-out";
body.style.padding = "0px";
body.style.background = "white !important";

// Counters for transformDoms
let loopCount = 0; 
let count = 1; 
let easeOut = 100;


setTimeout(function(){transformBody(body)}, 500);

function transformBody(body){

    // Sets the square
    let heightWindow = window.innerHeight;
    let widthWindow = window.innerWidth;
    let preferedSize = heightWindow * 0.5
    let heightDocument = body.clientHeight;
    let widthDocument = body.clientWidth;

    // Margin top = 1/4 of windowHeight
    body.style.marginTop = String(heightWindow * 0.25) + "px"
    // Margin bottom = (documentHeight - windowHeight) + 1/4 of windowHeight
    // body.style.marginBottom = String((heightDocument - heightWindow) + (heightWindow * 0.25)) + "px"
    // Margin right = (documentWidth - preferedSize) * 0.5
    body.style.marginRight = String((widthDocument - preferedSize) * 0.5) + "px"
    // Margin left = (documentWidth - preferedSize) * 0.5
    body.style.marginLeft = String((widthDocument - preferedSize) * 0.5) + "px"
    
    // body.style.width = String(preferedSize)+"px;"
    // body.style.height = String(preferedSize)+"px;"



    
    var doms = document.getElementsByTagName("*");
    for (let i = 0; i < doms.length; i++){
        if (doms[i].tagName != 'HTML' && doms[i].tagName != 'BODY' ){
            doms[i].style.cssText = doms[i].style.cssText + "transition: 5s ease-in-out;"
        }
    }

    // DOMs transform after transition applied
    setTimeout(function(){transformDOMs(preferedSize, doms)}, 100);
    // Don't know why I'm struggling to just get the damn <header> to change
    document.getElementsByTagName('header')[0].style.maxWidth =  "10px !important";
}


function transformDOMs(preferedSize, doms){
    // This section can still be improved. I've had to add a lot of weird extra provisions as I test on different websites. 
    // Animation can also be smoother.

    loopCount = doms.length
    // Timeout rather than for loop to give it a bit of space between transformations
    setTimeout(function() {  
        let i = loopCount - count;
        console.log(i)
        
        let extraCSS = ""


            if (doms[i].tagName == 'HTML' || doms[i].tagName == 'BODY' ){
                // doms[i].style.cssText = doms[i].style.cssText + "width: " + String(preferedSize)+"px !important;" + " height: " + String(preferedSize)+"px !important;" 
                doms[i].style.width = String(preferedSize)+"px !important;"
                doms[i].style.height = String(preferedSize)+"px !important;"
            }
            else {
                if (getComputedStyle(doms[i])["display"] == "none"){

                }
                else {

                    if (doms[i].tagName == 'DIV'){

                        if (doms[i].parentElement.tagName !== "DIV" && doms[i].parentElement.tagName !== "BODY" && doms[i].parentElement.tagName !== "HTML" ){
                            // extraCSS = extraCSS + "inset: auto !important;"
                            doms[i].parentElement.style.cssText = doms[i].style.cssText + "inset: auto !important;"
                        }
                    }

                    if (doms[i].parentElement.tagName == "LI"){
                        extraCSS = extraCSS + "inset: auto !important;"
                    }

                    if (doms[i].tagName == 'IMG' || doms[i].tagName == 'IFRAME' || doms[i].tagName == 'SVG') {
                        extraCSS = extraCSS + "filter: brightness(0%) !important; opacity: 1 !important;";
                    }

                    if (doms[i].tagName == 'A' || doms[i].tagName == 'P' || String(doms[i].tagName).startsWith('H') ){
                        extraCSS = extraCSS + "z-index: 1000 !important; color: black !important; ";
                    }

                    if (doms[i].tagName == 'UL' || doms[i].tagName == 'LI'){
                        extraCSS = extraCSS + "list-style: none !important; inset: auto !important;";
                    }

                    if (doms[i].tagName == 'TABLE' || doms[i].tagName == 'TBODY' || doms[i].tagName == 'TABLE' || doms[i].tagName == 'TABLE' ){
                        extraCSS = extraCSS + "display: inline !important; table-layout: fixed !important; width: 0px !important; height: 0px !important;"

                    }
                    extraCSS = extraCSS + "overflow:visible !important;"
                    doms[i].style.cssText = doms[i].style.cssText + 
                                            "position:fixed !important;"+ 
                                            "display:auto !important;"+              
                                            "width:"+preferedSize+"px !important;"+
                                            "height:"+preferedSize+"px !important;"+
                                            "min-width:0px; !important;"+
                                            "min-height:0px; !important;"+
                                            "z-index:0 !important;"+
                                            "top: "+document.body.style.marginTop+" !important;"+
                                            "bottom: auto !important;"+
                                            "left: "+document.body.style.marginLeft+" !important;"+
                                            "padding:0px !important;"+
                                            "right:auto !important;"+
                                            "transfrom: none !important;"+
                                            "-moz-transform: none !important;"+
                                            "-webkit-transform: none !important;"+
                                            "margin:0px !important;"+
                                            "text-overflow:hidden;"+
                                            "white-space:normal !important;" +
                                            "background: black !important;"+
                                            "color: black !important;"+
                                            "border: black !important;" +
                                            extraCSS;
                    
                }                                        
            }

  
        count++;   
        if (easeOut > 1){
            easeOut--;
        }          
        if (count < loopCount) {       
            transformDOMs(preferedSize, doms)             
        }                      
      }, easeOut)
    
}


console.log(`%c
Browser-based Malevich is a triptych of Firefox browser-plugins from internet teapot that warp and distort any webpage you open into a digital approximation of one of the three thematically-related Suprematism paintings by early 20th-century avant-garde Russian artist Kazimir Malevich: Black Square (1913), Black Circle (1915), and Black Cross (1915).

                               xxX###xx        
                                ::XXX         
                         xxXX::::::###XXXXXx/#####
                    :::XXXXX::::::XXXXXXXXX/    ####
         xXXX//::::::://///////:::::::::::/#####    #         ##########
      XXXXXX//:::::://///x                       #####      ###   ###
     XXXX        :://///  www.internetteapot.com      #   ###    #
     XXXX        ::////   www.internetteapot.com       ####   #  #
      XXXX/:     ::////X  www.internetteapot.com      ###      ##
       ""XX//::::::////XX                             #       #
           "::::::::////XXXXXXXXXXXX/    #     #     #      ##
                 ::::////XXXXXXXXXX/##################   ###
                     ::::://XXXXXX/#    #     #   #######
                         ::::::::/################

Read the Medium post: Browser-based Malevich: What the Minimalism of Modernism Can Tell Us About Digital Culture --> https://medium.com/internet-teapot`, "font-family:monospace")
