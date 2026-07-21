/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : LayoutManager.js
 * Version   : 6.0.0
 *
 * Description :
 *      Calculates physical report layout.
 *
 * Responsibilities
 *      ✔ Page Area
 *      ✔ Printable Area
 *      ✔ Header Area
 *      ✔ Body Area
 *      ✔ Footer Area
 *      ✔ Table Area
 *
 * No Rendering
 * No Pagination
 * No Runtime State
 *
 * Unit :
 *      millimeter
 *
 * Contract :
 *
 * {
 *      pageWidth,
 *      pageHeight,
 *
 *      printableWidth,
 *      printableHeight,
 *
 *      headerTop,
 *      headerHeight,
 *
 *      footerTop,
 *      footerHeight,
 *
 *      bodyTop,
 *      bodyBottom,
 *      bodyHeight,
 *
 *      tableLeft,
 *      tableWidth
 * }
 *
 * ------------------------------------------------------------
 */

export class LayoutManager {

    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #page;

    #measure;

    #header;

    #footer;

    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({

                    pageDefinition,

                    measureDefinition,

                    header = null,

                    footer = null

                }) {

        this.#page = pageDefinition;

        this.#measure = measureDefinition;

        this.#header = header;

        this.#footer = footer;

    }

    //--------------------------------------------------
    // Calculate
    //--------------------------------------------------

    calculate() {

        //--------------------------------------------------
        // Page
        //--------------------------------------------------

        const pageSize = this.#page.getSize();

        const spacing = this.#page.spacing;

        const margin = spacing.margin;

        const pageWidth = pageSize.width;

        const pageHeight = pageSize.height;

        //--------------------------------------------------
        // Printable
        //--------------------------------------------------

        const printableWidth =
            pageWidth
            - margin.left
            - margin.right;

        const printableHeight =
            pageHeight
            - margin.top
            - margin.bottom;

        //--------------------------------------------------
        // Header
        //--------------------------------------------------

        const headerHeight =
            this.#header?.height ?? 0;

        const headerTop =
            margin.top +
            spacing.header.marginTop;

        //--------------------------------------------------
        // Footer
        //--------------------------------------------------

        const footerHeight =
            this.#footer?.height ?? 0;

        const footerTop =
            pageHeight
            - margin.bottom
            - spacing.footer.marginBottom
            - footerHeight;

        //--------------------------------------------------
        // Body
        //--------------------------------------------------

        const bodyTop =
            headerTop
            + headerHeight
            + spacing.header.marginBottom
            + spacing.content.paddingTop;

        const bodyBottom =
            footerTop
            - spacing.footer.marginTop
            - spacing.content.paddingBottom;

        const bodyHeight =
            Math.max(
                0,
                bodyBottom - bodyTop
            );

        //--------------------------------------------------
        // Table
        //--------------------------------------------------

        const tableLeft =
            margin.left
            + spacing.content.paddingLeft;

        const tableWidth =
            printableWidth
            - spacing.content.paddingLeft
            - spacing.content.paddingRight;

        //--------------------------------------------------
        // Result
        //--------------------------------------------------

        return {

            //------------------------------------------
            // Page
            //------------------------------------------

            pageWidth,
            pageHeight,

            //------------------------------------------
            // Printable
            //------------------------------------------

            printableWidth,
            printableHeight,

            //------------------------------------------
            // Header
            //------------------------------------------

            headerTop,
            headerHeight,

            //------------------------------------------
            // Footer
            //------------------------------------------

            footerTop,
            footerHeight,

            //------------------------------------------
            // Body
            //------------------------------------------

            bodyTop,
            bodyBottom,
            bodyHeight,

            //------------------------------------------
            // Table
            //------------------------------------------

            tableLeft,
            tableWidth

        };

    }

}