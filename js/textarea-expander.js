function textAreaAutoExpander(options){
    var options = options || {};
    var $textarea, $div, 
    safetyMargin = typeof options.safetyMargin != "undefined" ?  options.safetyMargin : 100, 
    autoHeight    = typeof options.autoHeight    != "undefined" ?  options.autoHeight    : true, 
    autoWidth     = typeof options.autoWidth     != "undefined" ?  options.autoWidth     : true;
    if(typeof options == "string"){
        $textarea = document.querySelector(options);
    }else{
        if(options.selector){
            $textarea    = document.querySelector(options.selector);
        }else{
            throw new Error('Provide a selector!')
        }
    }
    // create a hidden textarea copy element
    var $div = document.createElement('div')
                $div.style.display  = "inline-block";
                $div.style.position = "fixed";
                $div.style.bottom   = "-4000px";
                $div.style.left     = "-4000px";
                $div.innerText  = $textarea.value;
                document.body.appendChild($div)

    // sync text values of textarea and the hidden element
    $textarea.addEventListener('input', (e)=>{
        $div.innerText  = e.target.value;
        resize()
    })

    syncCssParametersAll()
    resize()

    function syncCssParametersAll(){
        var textareaStyles = getComputedStyle($textarea)
        $div.style.fontFamily = textareaStyles.fontFamily
        $div.style.whiteSpace = textareaStyles.whiteSpace
        $div.style.fontSize   = textareaStyles.fontSize
        $div.style.lineHeight = textareaStyles.lineHeight
    }

    function resize(){
        if(autoHeight) $textarea.style.height = safetyMargin + $div.offsetHeight + "px";
        if(autoWidth)  $textarea.style.width  = safetyMargin + $div.offsetWidth  + "px";   
    }

    return {
        state: ()=>{
            return {
                selector     : options,
                $textarea   : $textarea,
                $div        : $div,
                safetyMargin : safetyMargin,
                autoHeight   : autoHeight,
                autoWidth    : autoWidth
            }
        },
        refresh: (options)=>{
            var options = options || {};
            if(typeof options.fontSize != "undefined") $textarea.style.fontSize = options.fontSize + "px";
            if(typeof options.lineHeight != "undefined") $textarea.style.lineHeight = options.lineHeight + "px";
            syncCssParametersAll()
            $textarea.dispatchEvent(new Event("input"))
        }
    }
}