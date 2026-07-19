/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : ReportEngine.js
 * Version   : 6.0.0
 *
 * Description :
 *      Main report orchestrator.
 *
 * Flow:
 *
 *      ReportDefinition
 *              |
 *      BindingResolver
 *              |
 *      MeasureManager
 *              |
 *      LayoutManager
 *              |
 *      RuntimeReport
 *              |
 *      PaginationManager
 *              |
 *      HtmlRenderer
 *
 * ------------------------------------------------------------
 */


import { HtmlRenderer }
    from "./HtmlRenderer.js";

import { LayoutManager }
    from "./LayoutManager.js";

import { PaginationManager }
    from "./PaginationManager.js";

import { RuntimeReport }
    from "../model/RuntimeReport.js";

import { MeasureManager }
    from "../measure/MeasureManager.js";

import { BindingResolver }
    from "../resolver/BindingResolver.js";



export class ReportEngine {


    #renderer;



    constructor(){


        this.#renderer =
            new HtmlRenderer();


    }




    generate(

        reportDefinition,

        data = {}

    ){



        if(!reportDefinition){


            throw new Error(

                "ReportDefinition is required."

            );

        }





        const context =
            data.context ?? {};






        const header =
            BindingResolver.resolveHeader(

                reportDefinition.header,

                context

            );





        const footer =
            BindingResolver.resolveFooter(

                reportDefinition.footer,

                context

            );






        const measureManager =
            new MeasureManager(

                reportDefinition.measure

            );







        const layoutManager =
            new LayoutManager({

                pageDefinition:
                reportDefinition.page,


                measureDefinition:
                reportDefinition.measure,


                header:
                reportDefinition.header,


                footer:
                reportDefinition.footer

            });






        const layout =
            layoutManager.calculate();







        const runtimeReport =
            new RuntimeReport(

                reportDefinition,

                layout

            );







        if(!runtimeReport.table){


            throw new Error(

                "ReportDefinition.table is missing."

            );

        }







        const paginationManager =
            new PaginationManager(

                measureManager

            );






        const pages =
            paginationManager.paginate(

                runtimeReport,

                data.rows ?? []

            );








        pages.forEach(

            (page,index)=>{


                page.totalPages =
                    pages.length;




                page.tableHeader =

                    runtimeReport.table.showHeader

                    &&

                    (

                        index === 0

                        ||

                        runtimeReport.page.print.repeatHeader

                    );


            }

        );







        return this.#renderer.render(

            runtimeReport,

            pages,

            {

                ...context,

                header,

                footer,

                layout

            }

        );



    }







    renderTo(

        containerId,

        reportDefinition,

        data = {}

    ){



        const container =
            document.getElementById(

                containerId

            );





        if(!container){


            throw new Error(

                `Container '${containerId}' not found.`

            );

        }





        container.innerHTML =

            this.generate(

                reportDefinition,

                data

            );


    }


}