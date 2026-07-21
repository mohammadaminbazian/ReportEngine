/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : PaginationManager.js
 * Version   : 6.1.0
 *
 * Description:
 *      Splits report rows into pages.
 *
 * Input:
 *      RuntimeReport
 *
 * Responsibilities:
 *      - Calculate page breaks
 *      - Measure rows
 *      - Create Page models
 *
 * No Rendering
 *
 * ------------------------------------------------------------
 */


import { Page } from "../model/Page.js";



export class PaginationManager {


    constructor(measureManager){

        this.measureManager =  measureManager;

    }






    //--------------------------------------------------
    // Paginate
    //--------------------------------------------------

    paginate(

        runtimeReport,

        rows = []

    ){



        if(!runtimeReport){

            throw new Error(

                "RuntimeReport is required."

            );

        }





        const layout = runtimeReport.layout;




        if(!layout){

            throw new Error(

                "RuntimeReport.layout is missing."

            );

        }





        const table =

            runtimeReport.table;




        if(!table){

            throw new Error(

                "RuntimeReport.table is missing."

            );

        }

        const availableHeight = layout.bodyHeight;

       /* console.log("=== Layout ===", {
            pageHeight: layout.pageHeight,
            printableHeight: layout.printableHeight,
            headerHeight: layout.headerHeight,
            footerHeight: layout.footerHeight,
            bodyHeight: layout.bodyHeight,
            availableHeight
        });*/


        const columns =  table.visibleColumns;







        const pages = [];

        let page =  this.createPage(  1,  availableHeight  );


        rows.forEach(row => {

            const result =   this.measureManager.measureRow(  row,   columns  );

            const rowHeight = result.height;

           /* console.log("pAGINAtionManager >>",{
                id: row.id,
                height: rowHeight
            });*/
            /*console.table({
                rowId: row.id,
                rowHeight,
                usedHeight: page.usedHeight,
                remainingHeight: page.remainingHeight,
                availableHeight: page.availableHeight,
                canAccept: page.canAccept(rowHeight)
            });*/

            //----------------------------------
            // New Page
            //----------------------------------

            if(

                !page.canAccept(rowHeight)

                &&

                !page.isEmpty()

            ){

                /*console.warn("PaginationManager >> PAGE BREAK", {
                    pageNumber: page.number,
                    usedHeight: page.usedHeight,
                    availableHeight: page.availableHeight,
                    nextRowHeight: rowHeight
                });*/

                pages.push(page);



                page =

                    this.createPage(

                        pages.length + 1,

                        availableHeight

                    );


            }







            page.addRow(

                row,

                rowHeight

            );



        });







        if(!page.isEmpty()){

            pages.push(page);

        }






        return pages;


    }








    //--------------------------------------------------
    // Create Page
    //--------------------------------------------------

    createPage(

        number,

        height

    ){


        return new Page({
            number, availableHeight: height
            /*, tableHeader:true*/
        });


    }



}