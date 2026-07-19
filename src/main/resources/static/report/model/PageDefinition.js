/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : PageDefinition.js
 * Version   : 2.0.0
 * Description :
 *      Defines physical page properties.
 *
 *      No calculation.
 *      No layout generation.
 *
 * ------------------------------------------------------------
 */


import { BaseDefinition } from "./BaseDefinition.js";


export class PageDefinition extends BaseDefinition {


    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #size;

    #orientation;

    #margin;

    #print;



    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({

        size = "A4",

        orientation = "PORTRAIT",

        margin = {},

        print = {}

    } = {}) {


        super();


        this.#size = size.toUpperCase();


        this.#orientation =
            orientation.toUpperCase();



        this.#margin = {


            top: margin.top ?? 1,

            right: margin.right ?? 1,

            bottom: margin.bottom ?? 1,

            left: margin.left ?? 1


        };



        this.#print = {


            repeatHeader:
                print.repeatHeader ?? true,


            repeatFooter:
                print.repeatFooter ?? false


        };


    }



    //--------------------------------------------------
    // Getters
    //--------------------------------------------------

    get size() {

        return this.#size;

    }


    get orientation() {

        return this.#orientation;

    }


    get margin() {

        return this.#margin;

    }


    get print() {

        return this.#print;

    }



    //--------------------------------------------------
    // Helpers
    //--------------------------------------------------

    isLandscape() {


        return this.#orientation === "LANDSCAPE";


    }



    isPortrait() {


        return this.#orientation === "PORTRAIT";


    }

    //--------------------------------------------------
// Page Size
//--------------------------------------------------

getSize(){

    const sizes = {

        A4:{

            width:210,

            height:297

        },

        A5:{

            width:148,

            height:210

        }

    };

    const page = sizes[this.#size];

    if(!page){

        throw new Error(
            "Unsupported page size : " + this.#size
        );

    }

    if(this.isLandscape()){

        return{

            width:page.height,

            height:page.width

        };

    }

    return{

        width:page.width,

        height:page.height

    };

}


    //--------------------------------------------------
    // Validation
    //--------------------------------------------------

    validate() {


        const errors = [];



        const sizes = [

            "A4",

            "A5"

        ];



        if (!sizes.includes(this.#size)) {


            errors.push(

                "Unsupported page size"

            );

        }



        if (

            this.#orientation !== "PORTRAIT"

            &&

            this.#orientation !== "LANDSCAPE"

        ) {


            errors.push(

                "Unsupported orientation"

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


            size: this.#size,


            orientation: this.#orientation,


            margin: this.#margin,


            print: this.#print


        };


    }


}