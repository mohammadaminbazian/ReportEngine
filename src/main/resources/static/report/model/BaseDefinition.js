/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : BaseDefinition.js
 * Version   : 2.0.0
 * Description :
 *      Base class for all report definitions.
 *
 *      Provides common definition behavior.
 *
 *      No layout calculation.
 *      No rendering.
 *      No pagination.
 *
 * ------------------------------------------------------------
 */


export class BaseDefinition {


    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #metadata;



    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor(metadata = {}) {


        this.#metadata = {

            createdAt: new Date(),

            ...metadata

        };


    }



    //--------------------------------------------------
    // Metadata
    //--------------------------------------------------

    get metadata() {

        return this.#metadata;

    }



    //--------------------------------------------------
    // Validation
    //--------------------------------------------------

    validate() {


        return {

            valid: true,

            errors: []

        };


    }



    //--------------------------------------------------
    // Convert To JSON
    //--------------------------------------------------

    toJSON() {


        return {

            metadata: this.#metadata

        };


    }



    //--------------------------------------------------
    // Clone Definition
    //--------------------------------------------------

    clone() {


        return Object.assign(

            Object.create(
                Object.getPrototypeOf(this)
            ),

            this

        );


    }



    //--------------------------------------------------
    // Utility
    //--------------------------------------------------

    isEmpty(value) {


        return (

            value === null ||

            value === undefined

        );


    }



    //--------------------------------------------------
    // String Representation
    //--------------------------------------------------

    toString() {


        return this.constructor.name;


    }


}