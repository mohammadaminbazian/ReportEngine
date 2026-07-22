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
    paginate( runtimeReport, rows = [],tableHeaderHeight = 0 ){
        if(!runtimeReport){
            throw new Error("RuntimeReport is required.");
        }

        const layout = runtimeReport.layout;
        if(!layout){
            throw new Error("RuntimeReport.layout is missing." );
        }

        const table = runtimeReport.table;
        if(!table){
            throw new Error( "RuntimeReport.table is missing.");
        }
        // const availableHeight = layout.bodyHeight;
        let availableHeight = layout.bodyHeight;

        if(table.showHeader){
            availableHeight -= table.headerHeight;
        }


        /*if(runtimeReport.footer){
            availableHeight -= runtimeReport.footer.reserveHeight;
        }*/
        if(runtimeReport.footer){
            availableHeight -= runtimeReport.footer.reserveHeight;
        }
        const columns =  table.visibleColumns;
        const pages = [];
        let page =  this.createPage(  1,  availableHeight  );
        /*if (runtimeReport.table.showHeader) {
            page.usedHeight += tableHeaderHeight;
        }*/
        rows.forEach(row => {
            const result =   this.measureManager.measureRow(  row,   columns  );
            const rowHeight = result.height;
            //----------------------------------
            // New Page
            //----------------------------------
            console.table("PaginationManager next page.addRow(    row,   rowHeight   )",{
                id: row.id,
                rowHeight,
                usedHeight: page.usedHeight,
                availableHeight: page.availableHeight,
                canAccept: page.canAccept(rowHeight)
            });
           /* if (page.availableHeight <= page.usedHeight + rowHeight ){

            }*/
           // console.log("PaginationManager page.canAccept(rowHeight) ",page.canAccept(rowHeight));
            console.log("PaginationManager !page.canAccept(rowHeight) ",!page.canAccept(rowHeight));
            console.log("PaginationManager full ",!page.isEmpty());

            if( !page.canAccept(rowHeight) && !page.isEmpty() ){
                pages.push(page);
                page =     this.createPage(
                        pages.length + 1,
                        availableHeight
                    );
                /*if (runtimeReport.table.showHeader) {
                    page.usedHeight += tableHeaderHeight;
                }*/
            }
            page.addRow(    row,   rowHeight   );
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