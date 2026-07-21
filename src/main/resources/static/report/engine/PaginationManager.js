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
    paginate( runtimeReport, rows = [] ){
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
        const availableHeight = layout.bodyHeight;
        const columns =  table.visibleColumns;
        const pages = [];
        let page =  this.createPage(  1,  availableHeight  );
        rows.forEach(row => {
            const result =   this.measureManager.measureRow(  row,   columns  );
            const rowHeight = result.height;
            //----------------------------------
            // New Page
            //----------------------------------
            if( !page.canAccept(rowHeight) && !page.isEmpty() ){
                pages.push(page);
                page =     this.createPage(
                        pages.length + 1,
                        availableHeight
                    );
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