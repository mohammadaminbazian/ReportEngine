/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : HtmlRenderer.js
 * Version   : 4.2.0
 *
 * Description :
 *      HTML Renderer
 *
 *      Supports:
 *      - Page Rendering
 *      - Section Header
 *      - Table Header
 *      - Table Body
 *      - Footer
 *      - Column Width
 *      - Column Alignment
 *
 * ------------------------------------------------------------
 */


export class HtmlRenderer {


    render(
        reportDefinition,
        pages,
        layout
    ){


        const container =
            document.createElement("div");


        container.className =
            "report-container";



        pages.forEach((page,index)=>{


            container.appendChild(

                this.renderPage(

                    page,

                    layout,

                    reportDefinition.table,

                    index + 1,

                    pages.length
                )

            );


        });



        return container;

    }






    renderPage(

        page,

        layout,

        tableDefinition,

        pageNumber,

        totalPages
    ){


        const div =
            document.createElement("div");


        div.className =
            "report-page";

        div.style.fontFamily =
            layout.font;


        div.style.fontSize =
            layout.fontSize + "pt";


        div.style.lineHeight =
            layout.lineHeight + "mm";

        div.style.width =
            layout.pageWidth + "mm";


        div.style.minHeight =
            layout.pageHeight + "mm";





        if(page.header){


            div.appendChild(

                this.renderHeader(

                    page.header,

                    pageNumber,

                    totalPages

                )

            );


        }






        div.appendChild(

            this.renderTable(

                page,

                tableDefinition

            )

        );







        if(page.footer){


            div.appendChild(

                this.renderFooter(

                    page.footer

                )

            );


        }



        return div;


    }









    //--------------------------------------------------
    // TABLE
    //--------------------------------------------------


    renderTable(

        page,

        tableDefinition

    ){



        const table =
            document.createElement("table");



        table.className =
            "report-table";





        table.appendChild(

            this.renderColGroup(

                tableDefinition

            )

        );






        if(tableDefinition.showHeader){


            table.appendChild(

                this.renderTableHeader(

                    tableDefinition

                )

            );


        }






        table.appendChild(

            this.renderTableBody(

                page,

                tableDefinition

            )

        );




        return table;


    }








    renderColGroup(tableDefinition){



        const colgroup =
            document.createElement("colgroup");



        tableDefinition.visibleColumns

        .forEach(column=>{


            const col =
                document.createElement("col");



            col.style.width =
                column.width + "mm";



            colgroup.appendChild(col);


        });



        return colgroup;


    }








    renderTableHeader(tableDefinition){


        const thead =
            document.createElement("thead");



        const tr =
            document.createElement("tr");



        tableDefinition.visibleColumns

        .forEach(column=>{


            const th =
                document.createElement("th");



            th.textContent =
                column.title;



            th.style.textAlign =
                column.thAlign;



            tr.appendChild(th);



        });



        thead.appendChild(tr);



        return thead;


    }








    renderTableBody(

        page,

        tableDefinition

    ){



        const tbody =
            document.createElement("tbody");



        page.rows.forEach(row=>{


            tbody.appendChild(

                this.renderRow(

                    row,

                    tableDefinition

                )

            );


        });



        return tbody;


    }








    renderRow(

        row,

        tableDefinition

    ){



        const tr =
            document.createElement("tr");



        const cells =
            Object.values(

                row.measure.cells

            );





        tableDefinition.visibleColumns

        .forEach((column,index)=>{


            tr.appendChild(

                this.renderCell(

                    cells[index],

                    column

                )

            );


        });



        return tr;


    }









    renderCell(

        cell,

        column

    ){


        const td =
            document.createElement("td");



        td.textContent =
            cell?.value ?? "";



        td.style.textAlign =
            column.tdAlign;



        return td;


    }









    //--------------------------------------------------
    // HEADER
    //--------------------------------------------------

renderHeader(

    header,

    pageNumber,

    totalPages

){

    const div =
        document.createElement("div");


    div.className =
        "report-header";



    header.sections.forEach(section=>{


        const sectionDiv =
            document.createElement("div");


        sectionDiv.className =
            "header-section";



        //----------------------------------
        // Three Column
        //----------------------------------

        if(
            section.layout === "three-column"
        ){


            sectionDiv.classList.add(
                "header-three-column"
            );



            Object.entries(section.columns)

            .forEach(([position,items])=>{


                const column =
                    document.createElement("div");


                column.className =
                    "header-column header-" + position;



                items.forEach(item=>{


                    column.appendChild(

                        this.renderItem(

                            item,

                            pageNumber,

                            totalPages

                        )

                    );


                });



                sectionDiv.appendChild(column);


            });



        }



        //----------------------------------
        // Full Section
        //----------------------------------

        else {


            sectionDiv.classList.add(
                "header-full"
            );



            (section.items ?? [])

            .forEach(item=>{


                sectionDiv.appendChild(

                    this.renderItem(

                        item,

                        pageNumber,

                        totalPages

                    )

                );


            });


        }




        div.appendChild(sectionDiv);



    });



    return div;

}
   

    renderHeaderSection(

        parent,

        name,

        items,

        pageNumber,

        totalPages

    ){



        if(!items){
            return;
        }



        const section =
            document.createElement("div");



        section.className =
            "header-section header-" + name;





        items.forEach(item=>{


            section.appendChild(

                this.renderItem(

                    item,

                    pageNumber,

                    totalPages

                )

            );


        });




        parent.appendChild(section);


    }









    renderMiddleHeader(

        parent,

        middle,

        pageNumber,

        totalPages

    ){



        if(!middle){
            return;
        }





        const section =
            document.createElement("div");



        section.className =
            "header-section header-middle";



        section.classList.add(
            "header-three-column"
        );







        ["right","center","left"]

        .forEach(position=>{



            const column =
                document.createElement("div");



            column.className =
                "header-column header-" + position;





            (middle[position] ?? [])

            .forEach(item=>{


                column.appendChild(

                    this.renderItem(

                        item,

                        pageNumber,

                        totalPages

                    )

                );


            });




            section.appendChild(column);



        });




        parent.appendChild(section);


    }









    renderItem(

        item,

        pageNumber,

        totalPages

    ){



        const div =
            document.createElement("div");



        switch(item.type){


            case "logo":


                const img =
                    document.createElement("img");



                img.src =
                    item.src;



                if(item.width){

                    img.style.width =
                        item.width + "mm";

                }



                if(item.height){

                    img.style.height =
                        item.height + "mm";

                }



                div.appendChild(img);


                break;




            case "pageNumber":

                //div.style.paddingRight= "65mm";
                div.textContent =
                    `صفحه ${pageNumber} از ${totalPages}`;

               // div.style='${styleItem}';
                break;

            default:
                div.textContent = this.resolve(item);
        }



        return div;


    }




    resolve(item){


            let result="";


            if(
                item.label
                &&
                item.label.trim() !== ""
            ){

                result +=
                    item.label + " : ";

            }



            if(
                item.value !== undefined
                &&
                item.value !== null
            ){

                result +=
                    item.value;

            }



            return result;


        }


    //--------------------------------------------------
    // FOOTER
    //--------------------------------------------------


    renderFooter(footer){


        const div =
            document.createElement("div");


        div.className =
            "report-footer";



        footer.rows.forEach(row=>{


            const item =
                document.createElement("div");



            item.textContent =
                row.value ?? "";



            div.appendChild(item);



        });



        return div;


    }


}