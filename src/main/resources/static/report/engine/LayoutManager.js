/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : LayoutManager.js
 * Version   : 3.0.0
 *
 * Description :
 *      Calculates report layout.
 *
 * ------------------------------------------------------------
 */


export class LayoutManager {


    #pageDefinition;

    #measureDefinition;

    #header;

    #footer;



    constructor({

        pageDefinition,

        measureDefinition,

        header=null,

        footer=null

    }){


        this.#pageDefinition =
            pageDefinition;

        this.#measureDefinition =
            measureDefinition;

        this.#header =
            header;


        this.#footer =
            footer;


    }

    calculate(){

        const pageSize =
            this.#pageDefinition.getSize();


        const margin =
            this.#pageDefinition.margin;

        const contentWidth =
            pageSize.width
            -
            margin.left
            -
            margin.right;

        const contentHeight =
            pageSize.height
            -
            margin.top
            -
            margin.bottom;



        const headerHeight =
            this.#getHeaderHeight();



        const footerHeight =
            this.#getFooterHeight();




        return {


            pageWidth:
                pageSize.width,


            pageHeight:
                pageSize.height,


            contentWidth,


            contentHeight,


            headerHeight,


            footerHeight,


            bodyHeight:

                contentHeight
                -
                headerHeight
                -
                footerHeight,


            margin,

            font:
                this.#measureDefinition.font,

            fontSize:
                this.#measureDefinition.fontSize,

            lineHeight:
                this.#measureDefinition.lineHeight


        };


    }

    #getHeaderHeight(){
        return this.#header?.getHeight() ?? 0;
    }

    #getFooterHeight(){
        return this.#footer?.getHeight() ?? 0;
    }
   
}