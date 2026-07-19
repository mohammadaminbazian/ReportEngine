/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : Page.js
 * Version   : 3.0.0
 *
 * Runtime page model.
 *
 * ------------------------------------------------------------
 */


export class Page {



    constructor({

                    number = 1,

                    availableHeight = 0,

                    tableHeader = true


                } = {}){


        this.number =
            number;


        this.rows = [];


        this.usedHeight = 0;


        this.availableHeight =
            availableHeight;


        this.tableHeader =
            tableHeader;


    }







    addRow(row,height){



        this.rows.push({

            data:row,

            height

        });



        this.usedHeight += height;


    }








    canAccept(height){


        return (

            this.usedHeight + height

            <=

            this.availableHeight


        );


    }







    isEmpty(){


        return this.rows.length===0;


    }







    get remainingHeight(){


        return (

            this.availableHeight

            -

            this.usedHeight


        );


    }





}