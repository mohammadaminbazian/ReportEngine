/*!
 * ------------------------------------------------------------
 * Report Engine
 * File : RuntimeReport.js
 * Version : 5.3.0
 *
 * Description:
 *
 * Runtime state of report generation.
 *
 * Keeps original ReportDefinition.
 * Adds calculated layout.
 * Keeps resolved runtime data.
 *
 * No Rendering.
 * No Pagination.
 *
 * ------------------------------------------------------------
 */


export class RuntimeReport {


    constructor(

        definition,

        layout,

        resolved = {}

    ){


        if(!definition){

            throw new Error(
                "ReportDefinition is required."
            );

        }


        this.definition =
            definition;



        this._layout =
            layout;



        this.resolved =
            resolved;


    }



    //--------------------------------------------------
    // Report Metadata
    //--------------------------------------------------

    get name(){

        return this.definition.name;

    }




    //--------------------------------------------------
    // Definitions
    //--------------------------------------------------

    get page(){

        return this.definition.page;

    }



    get header(){

        return this.definition.header;

    }



    get footer(){

        return this.definition.footer;

    }



    get table(){

        return this.definition.table;

    }



    get measure(){

        return this.definition.measure;

    }



    get options(){

        return this.definition.options;

    }




    //--------------------------------------------------
    // Runtime Layout
    //--------------------------------------------------

    get layout(){

        return this._layout;

    }



    //--------------------------------------------------
    // Runtime Resolved Values
    //--------------------------------------------------

    get resolvedHeader(){

        return this.resolved.header;

    }



    get resolvedFooter(){

        return this.resolved.footer;

    }



    get context(){

        return this.resolved.context ?? {};

    }



    //--------------------------------------------------
    // Validation Helpers
    //--------------------------------------------------

    hasTable(){

        return this.table !== null;

    }



    hasHeader(){

        return this.header !== null;

    }



    hasFooter(){

        return this.footer !== null;

    }


}