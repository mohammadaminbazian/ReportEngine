/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : FontMetrics.js
 * Version   : 1.0.0
 * Description :
 *      Calculates font related measurements.
 *
 * ------------------------------------------------------------
 */


export class FontMetrics {


    #fontSize;

    #lineHeight;



    constructor({

        fontSize = 10,

        lineHeight = 5

    } = {}) {


        this.#fontSize = fontSize;

        this.#lineHeight = lineHeight;


    }



    //--------------------------------------------------
    // Font Height
    //--------------------------------------------------

    getFontHeight(){


        /*
         * 1pt = 0.3527 mm
         *
         * Approximate printable height
         */

        return (

            this.#fontSize

            *

            0.3527

        );


    }



    //--------------------------------------------------
    // Line Height
    //--------------------------------------------------

    getLineHeight(){


        return this.#lineHeight;


    }


}