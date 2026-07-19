/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : ReportEngine.js
 * Version   : 3.2.0
 *
 * Description :
 *      Main report orchestrator.
 *
 * ------------------------------------------------------------
 */


import { HtmlRenderer } from "./HtmlRenderer.js";
import { LayoutManager } from "./LayoutManager.js";
import { PaginationManager } from "./PaginationManager.js";

import { MeasureManager } from "../measure/MeasureManager.js";

import { BindingResolver } from "../resolver/BindingResolver.js";



export class ReportEngine {



    constructor(){


        this.renderer =
            new HtmlRenderer();


    }






    generate(

        reportDefinition,

        data


    ){



        if(!reportDefinition){


            throw new Error(
                "ReportDefinition required"
            );


        }





        //--------------------------------------------------
        // Resolve Context
        //--------------------------------------------------

        const context =
            data.context ?? {};





        const header =

            BindingResolver.resolveHeader(

                reportDefinition.header,

                context

            );

console.log(
    "RESOLVED HEADER:",
    header
);

        const footer =

            BindingResolver.resolveFooter(

                reportDefinition.footer,

                context

            );







        //--------------------------------------------------
        // Measure
        //--------------------------------------------------

        const measureManager =

            new MeasureManager(

                reportDefinition.measure

            );







        //--------------------------------------------------
        // Layout
        //--------------------------------------------------

        const layoutManager =

            new LayoutManager({


                pageDefinition:

                    reportDefinition.page,
                    
                measureDefinition:
                    reportDefinition.measure,

                header,


                footer


            });




        const layout =

            layoutManager.calculate();








        //--------------------------------------------------
        // Pagination
        //--------------------------------------------------

        const paginationManager =

            new PaginationManager({


                layout,


                measureManager


            });





        const pages =

            paginationManager.paginate({



                rows:

                    data.rows ?? [],



                tableDefinition:

                    reportDefinition.table,



                header,



                footer



            });









        //--------------------------------------------------
        // Render
        //--------------------------------------------------

        return this.renderer.render(


            reportDefinition,


            pages,


            layout



        );


    }







    renderTo(

        containerId,

        reportDefinition,

        data


    ){



        const container =

            document.getElementById(

                containerId

            );



        if(!container){


            throw new Error(
                "Container not found"
            );


        }




        container.innerHTML="";




        container.appendChild(


            this.generate(

                reportDefinition,

                data

            )


        );



    }



}