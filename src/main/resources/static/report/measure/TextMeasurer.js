/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : TextMeasurer.js
 * Version   : 1.0.0
 * Description :
 *      Measures text size and line count.
 *
 *      Responsibility:
 *      - Canvas management
 *      - Text width calculation
 *      - Word wrapping
 *
 *      Unit:
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

    #font;

    #fontSize;



    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({

        font = "Arial",

        fontSize = 10

    } = {}) {


        this.#font = font;

        this.#fontSize = fontSize;


        this.#canvas =
            document.createElement("canvas");


        this.#context =
            this.#canvas.getContext("2d");


        this.#applyFont();


    }



    //--------------------------------------------------
    // Font
    //--------------------------------------------------

    #applyFont(){


        this.#context.font =

            `${this.#fontSize}px ${this.#font}`;


    }



    //--------------------------------------------------
    // Calculate Lines
    //--------------------------------------------------

    calculateLines(text,width){


        if(
            text === null ||
            text === undefined
        ){

            return 1;

        }


        text =
            String(text);



        if(text.length === 0){

            return 1;

        }



        const maxWidth =

            this.#mmToPx(width);



        const words =

            text.split(" ");



        let lineWidth = 0;

        let lines = 1;



        words.forEach(word=>{


            const wordWidth =

                this.#context.measureText(

                    word + " "

                ).width;



            if(

                lineWidth + wordWidth

                >

                maxWidth

            ){

                lines++;

                lineWidth =
                    wordWidth;

            }
            else{

                lineWidth += wordWidth;

            }


        });



        return lines;

    }

    //--------------------------------------------------
    // Convert mm to px
    //--------------------------------------------------

    #mmToPx(mm){

        return mm * 96 / 25.4;

    }


}