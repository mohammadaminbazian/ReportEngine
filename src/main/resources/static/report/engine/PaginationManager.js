/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : PaginationManager.js
 * Version   : 3.0.0
 *
 * Description :
 *      Splits rows into pages.
 *
 * ------------------------------------------------------------
 */


import { Page } from "../model/Page.js";



export class PaginationManager {


    #layout;

    #measureManager;



    constructor({

        layout,

        measureManager

    }) {


        this.#layout =
            layout;


        this.#measureManager =
            measureManager;


    }





    paginate({

        rows = [],

        tableDefinition,

        header = null,

        footer = null


    }) {



        const pages = [];



        let currentPage =
            this.#createPage(

                1,

                header,

                tableDefinition

            );





        rows.forEach(row => {



            const measure =

                this.#measureManager.measureRow(

                    row,

                    tableDefinition.visibleColumns

                );





            if(

                !currentPage.canAccept(
                    measure.height
                )

            ){



                pages.push(
                    currentPage
                );



                currentPage =
                    this.#createPage(

                        pages.length + 1,

                        header,

                        tableDefinition

                    );


            }





            currentPage.addRow(

                {

                    data: row,

                    measure

                },

                measure.height

            );



        });





        if(!currentPage.isEmpty()){


            pages.push(
                currentPage
            );


        }





        this.#applyFooter(

            pages,

            footer

        );




        return pages;


    }






    #createPage(

        number,

        header,

        tableDefinition

    ){


        return new Page({


            number,


            table:
                tableDefinition,

            rows: [],

            header,

            availableHeight:
                this.#layout.bodyHeight

        });

    }


    #applyFooter(

        pages,

        footer

    ){


        if(!footer){

            return;

        }

    console.log("FOOTER OBJECT:", footer);
    console.log("FOOTER TYPE:", footer?.constructor?.name);
    console.log("HAS shouldRender:", typeof footer?.shouldRender);

        const totalPages =
            pages.length;




        pages.forEach(page => {



            if(

                footer.shouldRender(

                    page.number,

                    totalPages

                )

            ){


                page.setFooter(
                    footer
                );


            }



        });



    }



}