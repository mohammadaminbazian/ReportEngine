/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : LayoutManager.js
 * Version   : 5.0.0
 *
 * Description:
 *      Calculates physical report layout.
 *
 * No Rendering.
 * No Pagination.
 *
 * ------------------------------------------------------------
 */


export class LayoutManager {



    #page;

    #measure;

    #header;

    #footer;



    constructor({

                    pageDefinition,

                    measureDefinition,

                    header = null,

                    footer = null


                }){


        this.#page =
            pageDefinition;


        this.#measure =
            measureDefinition;


        this.#header =
            header;


        this.#footer =
            footer;


    }






    calculate(){



        const pageSize =

            this.#page.getSize();




        const spacing =

            this.#page.spacing;





        const margin =

            spacing.margin;




        const pageWidth =

            pageSize.width;



        const pageHeight =

            pageSize.height;






        //------------------------------------------
        // Printable
        //------------------------------------------


        const printableWidth =

            pageWidth
            -
            margin.left
            -
            margin.right;



        const printableHeight =

            pageHeight
            -
            margin.top
            -
            margin.bottom;








        //------------------------------------------
        // Header
        //------------------------------------------


        const headerHeight =

            this.#header

                ?

                this.#header.getHeight()

                :

                0;




        const headerTop =

            margin.top

            +

            spacing.header.marginTop;





        const headerBottom =

            headerTop

            +

            headerHeight

            +

            spacing.header.marginBottom;








        //------------------------------------------
        // Footer
        //------------------------------------------


        const footerHeight =

            this.#footer

                ?

                this.#footer.getHeight()

                :

                0;




        const footerBottom =

            pageHeight

            -

            margin.bottom

            -

            spacing.footer.marginBottom;





        const footerTop =

            footerBottom

            -

            footerHeight

            -

            spacing.footer.marginTop;









        //------------------------------------------
        // Body
        //------------------------------------------


        const bodyTop =

            headerBottom;



        const bodyBottom =

            footerTop;




        const bodyHeight =

            Math.max(

                0,

                bodyBottom - bodyTop

            );








        //------------------------------------------
        // Table Area
        //------------------------------------------


        const content =

            spacing.content;



        const tableLeft =

            margin.left

            +

            content.paddingLeft;




        const tableWidth =

            printableWidth

            -

            content.paddingLeft

            -

            content.paddingRight;








        return {



            pageWidth,

            pageHeight,



            printableWidth,

            printableHeight,



            margin,



            headerTop,

            headerHeight,

            headerBottom,



            footerTop,

            footerHeight,

            footerBottom,



            bodyTop,

            bodyBottom,

            bodyHeight,



            tableLeft,

            tableWidth,



            font:

            this.#measure.font,


            fontSize:

            this.#measure.fontSize,


            lineHeight:

            this.#measure.lineHeight


        };



    }


}