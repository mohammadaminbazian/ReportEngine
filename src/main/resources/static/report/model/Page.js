/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : Page.js
 * Version   : 2.1.0
 * Description :
 *      Runtime representation of generated report page.
 *
 *      Created by PaginationManager.
 *
 *      Contains:
 *      - page number
 *      - rows
 *      - header
 *      - footer
 *      - height tracking
 *
 * ------------------------------------------------------------
 */


export class Page {


    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #number;

    #rows;

    #header;

    #table;

    #footer;

    #usedHeight;

    #availableHeight;


    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({

        number = 1,

        rows = [],

        header = null,

        table = null,

        footer = null,

        usedHeight = 0,

        availableHeight = 0


    } = {}) {

        this.#number = number;

        this.#rows = rows;

        this.#header = header;

        this.#table = table;

        this.#footer = footer;

        this.#usedHeight = usedHeight;

        this.#availableHeight = availableHeight;

    }

    //--------------------------------------------------
    // Getters
    //--------------------------------------------------

    get number(){

        return this.#number;

    }

    get rows(){

        return this.#rows;

    }

    get header(){

        return this.#header;

    }

    get table(){
        return this.#table;
    }

    get footer(){
        return this.#footer;
    }

    get usedHeight(){

        return this.#usedHeight;

    }

    get availableHeight(){

        return this.#availableHeight;

    }

    get remainingHeight(){

        return (
            this.#availableHeight
            -
            this.#usedHeight
        );

    }

    //--------------------------------------------------
    // Setters
    //--------------------------------------------------

    setHeader(header){

        this.#header = header;
    }

    setFooter(footer){
        this.#footer = footer;
    }

    //--------------------------------------------------
    // Row Management
    //--------------------------------------------------

    addRow(row,height){

        this.#rows.push(row);

        this.#usedHeight += height;

    }

    canAccept(height){



        return (

            this.remainingHeight

            >=

            height

        );


    }

    isEmpty(){


        return this.#rows.length === 0;


    }

    //--------------------------------------------------
    // Height
    //--------------------------------------------------

    setAvailableHeight(height){

        this.#availableHeight = height;

    }

    //--------------------------------------------------
    // JSON
    //--------------------------------------------------

    toJSON(){


        return {


            number:
                this.#number,

            rows:
                this.#rows,

            header:
                this.#header,

            table:
                this.#table,

            footer:
                this.#footer,

            usedHeight:
                this.#usedHeight,

            availableHeight:
                this.#availableHeight,

            remainingHeight:
                this.remainingHeight

        };

    }

}