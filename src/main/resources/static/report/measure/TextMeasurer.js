/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : TextMeasurer.js
 * Version   : 2.0.0
 *
 * Description :
 *      Measures text using Canvas.
 *
 * Responsibilities
 *      ✔ Text Width
 *      ✔ Line Count
 *      ✔ Text Height
 *
 * No Layout
 * No Pagination
 * No Rendering
 *
 * Unit
 *      millimeter
 *
 * ------------------------------------------------------------
 */

export class TextMeasurer {

    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #canvas;

    #context;

    #fontFamily;

    #fontSize;

    #lineHeight;
    #measureElement;

     static PX_PER_MM = 12;//96 / 25.4;
    #PxPerMM =0;
    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({

                    font = "Arial",

                    fontSize = 10,

                    lineHeight = 4

                } = {}) {

        this.#fontFamily = font;
        this.#fontSize = fontSize;
        this.#lineHeight = lineHeight;

        this.#canvas = document.createElement("canvas");

        this.#context = this.#canvas.getContext("2d");

        this.#applyFont();
        this.#measureElement = this.#createMeasureElement();
        let count = (fontSize - TextMeasurer.PX_PER_MM)  / 2;

        this.#PxPerMM = TextMeasurer.PX_PER_MM;
        if(fontSize > TextMeasurer.PX_PER_MM){
            for (let i = 0; i <count ;i++){
                this.#PxPerMM = this.#PxPerMM - 1;
            }
        }else if(fontSize < TextMeasurer.PX_PER_MM){
            for (let i = 0; i <count ;i++){
                this.#PxPerMM = this.#PxPerMM + 1;
            }
        }

    }

    //--------------------------------------------------
    // Font
    //--------------------------------------------------

    #applyFont(){

        this.#context.font =
            `${this.#fontSize}pt "${this.#fontFamily}"`;

    }

    #createMeasureElement(){

        const div = document.createElement("div");

        div.style.position = "absolute";

        div.style.visibility = "hidden";

        div.style.left = "-100000px";

        div.style.top = "-100000px";

        div.style.whiteSpace = "normal";

        div.style.wordBreak = "break-word";

        div.style.overflowWrap = "break-word";

        div.style.boxSizing = "border-box";

        div.style.padding = "0";

        div.style.margin = "0";

        div.style.fontFamily = this.#fontFamily;

        div.style.fontSize = `${this.#fontSize}pt`;

        div.style.lineHeight = `${this.#lineHeight}mm`;

        document.body.appendChild(div);

        return div;

    }
    //--------------------------------------------------
    // Width
    //--------------------------------------------------

    measureWidth(text){

        if(text == null){

            return 0;

        }

        return this.#pxToMm(

            this.#context
                .measureText(
                    String(text)
                ).width

        );

    }

    //--------------------------------------------------
    // Line Count
    //--------------------------------------------------

   /* calculateLines(

        text,

        widthMM

    ){

        if(text == null){

            return 1;

        }

        text =
            String(text);

        if(text.length === 0){

            return 1;

        }

        const maxWidth =

            this.#mmToPx(widthMM);

        let currentWidth = 0;

        let lines = 1;

        for(const ch of text){

            if(ch === "\n"){

                lines++;
                currentWidth = 0;
                continue;

            }

            const w =

                this.#context
                    .measureText(ch)
                    .width;

            if(currentWidth + w > maxWidth){

                lines++;

                currentWidth = w;

            }else{
                currentWidth += w;
            }
        }
        return lines;
    }*/

    calculateLines(text, widthMM){

        if(text == null){

            return 1;

        }

        text = String(text);

        if(text.length===0){

            return 1;

        }

        const div = this.#measureElement;

        div.style.width = `${widthMM}mm`;

        div.textContent = text;

        const heightPx =
            div.getBoundingClientRect().height;

        const heightMM =
            this.#pxToMm(heightPx);

        return Math.max(

            1,

            Math.ceil(

                heightMM /

                this.#lineHeight

            )

        );

    }

    //--------------------------------------------------
    // Height
    //--------------------------------------------------

    measureHeight(

        text,

        widthMM

    ){
      /*  element.style.width = widthMM + "mm";

        element.textContent = text;

        return element.getBoundingClientRect().height;
        return (

            this.calculateLines(

                text,

                widthMM

            )

            *

            this.#lineHeight

        );*/
        const div = this.#measureElement;

        div.style.width = `${widthMM}mm`;

        div.textContent = text ?? "";

        return this.#pxToMm(

            div.getBoundingClientRect().height

        );

    }

    //--------------------------------------------------
    // Font Height
    //--------------------------------------------------

    getFontSize(){

        return this.#fontSize;

    }

    //--------------------------------------------------
    // Line Height
    //--------------------------------------------------

    getLineHeight(){

        return this.#lineHeight;

    }

    //--------------------------------------------------
    // mm -> px
    //--------------------------------------------------

    #mmToPx(mm){

        return mm * TextMeasurer.PX_PER_MM;

    }

    //--------------------------------------------------
    // px -> mm
    //--------------------------------------------------

    #pxToMm(px){
console.log("px:",px," ,TextMeasurer.PX_PER_MM",TextMeasurer.PX_PER_MM, "  , mm",px / TextMeasurer.PX_PER_MM)
        let mm =  px /  this.#PxPerMM ;
        if (mm <=0){
            return 1;
        } else {
            return mm;
        }
        //return px / TextMeasurer.PX_PER_MM;

    }

}