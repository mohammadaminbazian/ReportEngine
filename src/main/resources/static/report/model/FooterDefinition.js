/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : FooterDefinition.js
 * Version   : 3.0.0
 *
 * Description :
 *      Defines report footer structure.
 *
 * Supports:
 *      - repeat footer
 *      - last page only
 *      - dynamic bindings
 *
 * ------------------------------------------------------------
 */


export class FooterDefinition {


    constructor(config = {}) {


        //--------------------------------------------------
        // Height
        //--------------------------------------------------

        this.height =
            config.height ?? 15;



        //--------------------------------------------------
        // Render rules
        //--------------------------------------------------

        this.repeat =
            config.repeat ?? false;


        this.lastPageOnly =
            config.lastPageOnly ?? false;



        //--------------------------------------------------
        // Footer rows
        //--------------------------------------------------

        this.rows =
            config.rows ?? [];



    }

    //--------------------------------------------------
    // Decide rendering
    //--------------------------------------------------

    shouldRender(pageNumber,totalPages){

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
    // Add row
    //--------------------------------------------------

    addRow(row){


        this.rows.push(row);


        return this;

    }





    hasRows(){


        return this.rows.length > 0;


    }

    //--------------------------------------------------
    // Height
    //--------------------------------------------------

    getHeight(){

        return this.height;

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
        valid:errors.length===0,
        errors
    };

}

}