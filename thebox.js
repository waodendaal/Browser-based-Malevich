// The Box by Adriaan Odendaal
// Webpages are just squares upon squares upon squares computationally seperated.
// Inspiration taken from Malevich ("the visual phenomena of the objective world are, in themselves, meaningless; the significant thing is feeling, as such, quite apart from the environment in which it is called forth") 
// and Rafael Rozendaal's "Abstract Browsing" https://www.newrafael.com/new-website-chrome-plugin-abstract-browsing-net/

// Block the body
var body = document.body 

// Set Animation
body.style.transition =  "3s ease-in-out";
body.style.padding = "0px";

setTimeout(function(){transformBody(body)}, 1000);

function transformBody(body){
    // Sets the square
    let heightWindow = window.innerHeight;
    let widthWindow = window.innerWidth;
    let preferedSize = heightWindow * 0.5
    let heightDocument = body.clientHeight;
    let widthDocument = body.clientWidth;
    console.log('Prefered Size: ', preferedSize)

    // Margin top = 1/4 of windowHeight
    body.style.marginTop = String(heightWindow * 0.25) + "px"
    // Margin bottom = (documentHeight - windowHeight) + 1/4 of windowHeight
    body.style.marginBottom = String((heightDocument - heightWindow) + (heightWindow * 0.25)) + "px"
    // Margin right = (documentWidth - preferedSize) * 0.5
    body.style.marginRight = String((widthDocument - preferedSize) * 0.5) + "px"
    // Margin left = (documentWidth - preferedSize) * 0.5
    body.style.marginLeft = String((widthDocument - preferedSize) * 0.5) + "px"
    
    var doms = document.getElementsByTagName("*");
    for (let i = 0; i < doms.length; i++){
        if (doms[i].tagName == 'HTML' || doms[i].tagName == 'BODY' ){
            console.log("Skip: ", doms[i])
        }
        else {
            doms[i].style.cssText = doms[i].style.cssText + "position:relative !important; transition: 3s ease-in-out;"
        }
    }

    // DOMs after Body
    setTimeout(function(){transformDOMs(preferedSize, doms)}, 1000);
}

function transformDOMs(preferedSize, doms){
    for (let i = 0; i < doms.length; i++){
        let extraCSS = ""
        setTimeout(function(){ 
            console.log("DOM DISPLAY: ", doms[i])
            if (doms[i].tagName == 'HTML' || doms[i].tagName == 'BODY' ){
                console.log("Skip A: ", doms[i])
                doms[i].style.height = String(preferedSize)+"px"
                doms[i].style.width = String(preferedSize)+"px"
            }
            else {
                if (getComputedStyle(doms[i])["display"] == "none"){
                    console.log("Skip B", doms[i])
                }
                else {

                    if (doms[i].tagName == 'DIV'){
                        if (getComputedStyle(doms[i])["background-color"]){
                            extraCSS = "top:auto !important; left:auto !important;";    
                        }
                        else {
                            extraCSS = "top:auto !important; left:auto !important; height:"+preferedSize+"px !important;"+"width:"+preferedSize+"px !important;";
                        }
                    }
                    if (doms[i].tagName == 'P' || String(doms[i].tagName).startsWith('H') ){
                        extraCSS = extraCSS + "z-index: 1000 !important;";
                    }
                    extraCSS = extraCSS + "overflow:visible !important;"
                    doms[i].style.cssText = doms[i].style.cssText + 
                                            "position:fixed !important;"+ 
                                            "display:auto !important;"+              
                                            "max-width:"+preferedSize+"px !important;"+
                                            "max-height:"+preferedSize+"px !important;"+
                                            "min-width:0px; !important;"+
                                            "min-height:0px; !important;"+
                                            "z-index:0 !important;"+
                                            "top: "+document.body.style.marginTop+" !important;"+
                                            "bottom:auto !important;"+
                                            "left: "+document.body.style.marginLeft+" !important;"+
                                            "padding:0px !important;"+
                                            "right:auto !important;"+
                                            "margin:0px !important;"+
                                            "text-overflow:hidden;"+
                                            "white-space:normal !important;" +
                                            extraCSS;
                }                                        
            }
        },300);
    }
}
