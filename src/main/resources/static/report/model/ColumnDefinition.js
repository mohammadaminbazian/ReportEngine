/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : ColumnDefinition.js
 * Version   : 2.0.0
 * Description :
 *      Defines table column.
 *
 *      No rendering.
 *      No measurement.
 *
 * ------------------------------------------------------------
 */

import { BaseDefinition } from "./BaseDefinition.js";

export  class ColumnDefinition extends BaseDefinition {

    #field;

    #title;

    #width;

    #type;

    #thAlign;

    #tdAlign;

    #format;

    #visible;

    constructor({

        field,

        title = "",

        width = 20,

        type = "text",

        thAlign = "center",

        tdAlign = "right",

        format = null,

        visible = true

    } = {}) {

        super();

        this.#field = field;

        this.#title = title;

        this.#width = width;

        this.#type = type;

        this.#thAlign = thAlign;

        this.#tdAlign = tdAlign;

        this.#format = format;

        this.#visible = visible;
    }

    get field(){

        return this.#field;

    }

    get title(){

        return this.#title;

    }

    get width(){

        return this.#width;

    }

    get type(){

        return this.#type;

    }

    get thAlign(){
        return this.#thAlign;
    }

    get tdAlign(){
        return this.#tdAlign;
    }

    get format(){

        return this.#format;

    }

    get visible(){

        return this.#visible;

    }

    validate(){

        const errors=[];

        if(!this.#field){

            errors.push(
                "Column field is required"
            );

        }

        if(this.#width <= 0){

            errors.push(
                "Column width must be positive"
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


            field:this.#field,

            title:this.#title,

            width:this.#width,

            type:this.#type,

            thAlign:this.#thAlign,

            tdAlign:this.#tdAlign,

            format:this.#format,

            visible:this.#visible

        };


    }


}