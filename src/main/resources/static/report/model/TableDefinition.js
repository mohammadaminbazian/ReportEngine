/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : TableDefinition.js
 * Version   : 2.0.0
 * Description :
 *      Defines report table structure.
 *
 * ------------------------------------------------------------
 */
import { BaseDefinition } from "./BaseDefinition.js";

export class TableDefinition extends BaseDefinition {

    #columns;

    #header;

    #showHeader;

    #style;

    #options;

    constructor({

        columns = [],

        header = {},

        showHeader = true,

        style = {},

        options = {}


    } = {}) {

        super();

        this.#columns = columns;

        this.#header = header;

        this.#showHeader = showHeader;

        this.#style = style;

        this.#options = options;

    }

    get columns(){
        return this.#columns;
    }

    get visibleColumns(){

        return this.#columns.filter(

            column =>
                column.visible

        );

    }

    get header(){

        return this.#header;

    }

    get showHeader(){

        return this.#showHeader;

    }

    get style(){

        return this.#style;

    }

    get options(){

        return this.#options;

    }

    getTotalWidth(){

        return this.visibleColumns.reduce(

            (sum,column)=>

                sum + column.width,


            0

        );

    }

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
                errors.length===0,

            errors

        };

    }

    toJSON(){

        return {

            columns:this.#columns,

            header:this.#header,

            showHeader:this.#showHeader,

            style:this.#style,

            options:this.#options

        };

    }

}