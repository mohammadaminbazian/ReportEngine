/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : MeasureDefinition.js
 * Version   : 2.0.0
 * Description :
 *      Defines measurement rules.
 *
 *      Used by MeasureManager.
 *
 *      No real measurement here.
 *
 * ------------------------------------------------------------
 */


import { BaseDefinition } from "./BaseDefinition.js";


export class MeasureDefinition extends BaseDefinition {



    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #font;

    #fontSize;

    #lineHeight;

    #padding;

    #row;

    #limits;



    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({

        font = "Arial",

        fontSize = 10,

        lineHeight = 5,

        padding = {},

        row = {},

        limits = {}


    } = {}) {



        super();



        this.#font = font;



        this.#fontSize = fontSize;



        this.#lineHeight = lineHeight;



        this.#padding = {


            top: padding.top ?? 1,


            right: padding.right ?? 1,


            bottom: padding.bottom ?? 1,


            left: padding.left ?? 1


        };



        this.#row = {


            baseHeight:
                row.baseHeight ?? 8,


            headerHeight:
                row.headerHeight ?? 8


        };



        this.#limits = {


            minHeight:
                limits.minHeight ?? 5,


            maxHeight:
                limits.maxHeight ?? 100


        };


    }



    //--------------------------------------------------
    // Getters
    //--------------------------------------------------

    get font() {

        return this.#font;

    }



    get fontSize() {

        return this.#fontSize;

    }



    get lineHeight() {

        return this.#lineHeight;

    }



    get padding() {

        return this.#padding;

    }



    get row() {

        return this.#row;

    }



    get limits() {

        return this.#limits;

    }



    //--------------------------------------------------
    // Validation
    //--------------------------------------------------

    validate() {


        const errors = [];



        if (this.#fontSize <= 0) {


            errors.push(

                "Font size must be positive"

            );

        }



        if (this.#lineHeight <= 0) {


            errors.push(

                "Line height must be positive"

            );

        }



        return {


            valid: errors.length === 0,


            errors


        };


    }



    //--------------------------------------------------
    // JSON
    //--------------------------------------------------

    toJSON() {


        return {


            font: this.#font,


            fontSize: this.#fontSize,


            lineHeight: this.#lineHeight,


            padding: this.#padding,


            row: this.#row,


            limits: this.#limits


        };


    }


}