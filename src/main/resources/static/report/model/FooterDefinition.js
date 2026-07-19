/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : FooterDefinition.js
 * Version   : 5.0.0
 *
 * Description:
 *      Defines report footer.
 *
 * ------------------------------------------------------------
 */


import { BaseDefinition } from "./BaseDefinition.js";


export class FooterDefinition extends BaseDefinition {



    constructor({

                    height = 15,

                    repeat = false,

                    lastPageOnly = false,

                    visible = true,

                    reserveSpace = true,

                    rows = [],

                    metadata = {}


                } = {}){


        super(metadata);



        this.height =
            height;



        this.repeat =
            repeat;



        this.lastPageOnly =
            lastPageOnly;



        this.visible =
            visible;



        this.reserveSpace =
            reserveSpace;



        this.rows =
            rows;



    }







    //--------------------------------------------------
    // Render Decision
    //--------------------------------------------------

    shouldRender(

        pageNumber,

        totalPages

    ){



        if(!this.visible){

            return false;

        }




        if(this.repeat){

            return true;

        }





        if(this.lastPageOnly){


            return (

                pageNumber === totalPages

            );


        }



        return false;


    }








    //--------------------------------------------------
    // Layout Height
    //--------------------------------------------------

    getHeight(){


        if(

            this.reserveSpace

        ){


            return this.height;


        }



        return 0;


    }







    //--------------------------------------------------
    // Rows
    //--------------------------------------------------

    addRow(row){


        this.rows.push(row);


        return this;


    }







    hasRows(){


        return this.rows.length > 0;


    }







    validate(){


        const errors=[];



        if(

            this.repeat &&

            this.lastPageOnly

        ){


            errors.push(

                "repeat and lastPageOnly cannot both be true"

            );


        }




        return {


            valid:

                errors.length === 0,


            errors


        };


    }



}