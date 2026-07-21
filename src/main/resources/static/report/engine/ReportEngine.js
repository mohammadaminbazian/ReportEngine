/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : ReportEngine.js
 * Version   : 6.0.0
 *
 * Description :
 *      Main report orchestrator.
 *
 * Pipeline
 *
 *      ReportDefinition
 *              │
 *      BindingResolver
 *              │
 *      MeasureManager
 *              │
 *      LayoutManager
 *              │
 *      RuntimeReport
 *              │
 *      PaginationManager
 *              │
 *      HtmlRenderer
 *
 * ------------------------------------------------------------
 */

import { HtmlRenderer } from "./HtmlRenderer.js";
import { LayoutManager } from "./LayoutManager.js";
import { PaginationManager } from "./PaginationManager.js";

import { RuntimeReport } from "../model/RuntimeReport.js";

import { MeasureManager } from "../measure/MeasureManager.js";

import { BindingResolver } from "../resolver/BindingResolver.js";

export class ReportEngine {

    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #renderer;

    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor() {

        this.#renderer =
            new HtmlRenderer();

    }

    //--------------------------------------------------
    // Generate
    //--------------------------------------------------

    generate(

        reportDefinition,

        data = {}

    ) {

        if (!reportDefinition) {

            throw new Error(
                "ReportDefinition is required."
            );

        }

        //--------------------------------------------------
        // Runtime Context
        //--------------------------------------------------

        const context =
            data.context ?? {};

        const rows =
            data.rows ?? [];

        //--------------------------------------------------
        // Resolve Header / Footer
        //--------------------------------------------------

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
        // Runtime Report
        //--------------------------------------------------

        const runtimeReport =
            new RuntimeReport({

                definition:
                reportDefinition,

                layout,

                header,

                footer,

                table:
                reportDefinition.table,

                measure: reportDefinition.measure,
                measureManager,

                context

            });

        if (!runtimeReport.table) {

            throw new Error(
                "ReportDefinition.table is missing."
            );

        }

        //--------------------------------------------------
        // Pagination
        //--------------------------------------------------

        const paginationManager =
            new PaginationManager(
                measureManager
            );

        /*const pages =
            paginationManager.paginate(                runtimeReport,                rows            );*/
        const pages =
            paginationManager.paginate(
                runtimeReport,
                rows,
                reportDefinition.measure.row.headerHeight
            );

        //--------------------------------------------------
        // Finalize Pages
        //--------------------------------------------------

        pages.forEach((page, index) => {

            page.totalPages =
                pages.length;

            page.tableHeader =

                runtimeReport.table?.showHeader

                &&

                (

                    index === 0

                    ||

                    runtimeReport.header?.repeat

                );

        });

        //--------------------------------------------------
        // Render
        //--------------------------------------------------

        return this.#renderer.render(

            runtimeReport,

            pages

        );

    }

    //--------------------------------------------------
    // Render To Container
    //--------------------------------------------------

    renderTo(

        containerId,

        reportDefinition,

        data = {}

    ) {

        const container =
            document.getElementById(
                containerId
            );

        if (!container) {

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
