/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : TableDefinition.js
 * Version   : 5.0.0
 *
 * Description:
 *      Defines report table structure.
 *
 * Responsibilities:
 *
 *      ✔ Columns
 *      ✔ Visible Columns
 *      ✔ Header configuration
 *      ✔ Table options
 *      ✔ Width calculation
 *
 * ------------------------------------------------------------
 */


import { BaseDefinition } from "./BaseDefinition.js";

export class TableDefinition extends BaseDefinition {

    #columns;

    #header;
    #row;
    #showHeader;

    #style;

    #options;



    constructor({

                    columns = [],

                    header = {},
                    row ={},
                    showHeader = true,

                    style = {},

                    options = {},

                    metadata = {}


                } = {}) {



        super(metadata);



        this.#columns = columns;

        this.#header = header;
        this.#row = {

            padding:{

                top: row.padding.top ,

                bottom: row.padding.bottom

            }

        };

        this.#showHeader =
            showHeader;


        this.#style =
            style;


        this.#options =
            options;


    }




    get headerHeight(){

        return this.#header?.height ?? 0;

    }
    //--------------------------------------------------
    // row
    //--------------------------------------------------
    get row(){

        return this.#row;

    }
    //--------------------------------------------------
    // Columns
    //--------------------------------------------------

    get columns(){


        return this.#columns;


    }







    //--------------------------------------------------
    // Visible Columns
    //--------------------------------------------------

    get visibleColumns(){


        return this.#columns

            .filter(

                column =>

                    column.visible !== false

            );


    }







    //--------------------------------------------------
    // Header
    //--------------------------------------------------

    get header(){


        return this.#header;


    }







    //--------------------------------------------------
    // Show Header
    //--------------------------------------------------

    get showHeader(){


        return this.#showHeader;


    }







    //--------------------------------------------------
    // Style
    //--------------------------------------------------

    get style(){


        return this.#style;


    }







    //--------------------------------------------------
    // Options
    //--------------------------------------------------

    get options(){


        return this.#options;


    }







    //--------------------------------------------------
    // Total Width
    //--------------------------------------------------

    getTotalWidth(){


        return this.visibleColumns.reduce(

            (sum,column)=>

                sum +

                (column.width ?? 0),


            0

        );


    }







    //--------------------------------------------------
    // Validation
    //--------------------------------------------------

    validate(){


        const errors=[];





        if(

            !Array.isArray(this.#columns)

        ){


            errors.push(

                "Columns must be array"

            );


        }





        return {


            valid:

                errors.length === 0,


            errors


        };


    }







    //--------------------------------------------------
    // JSON
    //--------------------------------------------------

    toJSON(){


        return {

            columns: this.#columns,

            header: this.#header,
            row: this.#row,

            showHeader: this.#showHeader,


            style:
            this.#style,


            options:
            this.#options


        };


    }



}