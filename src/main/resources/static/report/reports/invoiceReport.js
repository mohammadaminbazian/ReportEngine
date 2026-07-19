/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : invoiceReport.js
 * Version   : 2.0.0
 * Description :
 *      Invoice report definition.
 *
 * ------------------------------------------------------------
 */

import {ReportDefinition} from "../model/ReportDefinition.js";
import {PageDefinition} from "../model/PageDefinition.js";
import {MeasureDefinition} from "../model/MeasureDefinition.js";
import {HeaderDefinition} from "../model/HeaderDefinition.js";
import {FooterDefinition} from "../model/FooterDefinition.js";
import {TableDefinition} from "../model/TableDefinition.js";
import {ColumnDefinition} from "../model/ColumnDefinition.js";

const page = new PageDefinition({
    size: "A4",//"A4",
    orientation: "LANDSCAPE",//"LANDSCAPE","PORTRAIT",
    margin: {
        top: 1,
        right: 3,
        bottom: 1,
        left: 2
    }
});


const measure =

    new MeasureDefinition({

        font: "B Nazanin",//"IRANYekanXFaNum",//"B Nazanin",

        fontSize: 10,

        lineHeight: 4,

        pageSizeModel: page.size + " " + page.orientation,

        row: {

            baseHeight: 4,

            headerHeight: 4

        }


    });


const header = new HeaderDefinition({

    repeat: true,

    sections: {
        top: [

            {
                type: "text",

                binding: {

                    source: "context",

                    field: "companyTop"

                },

                align: "left"

            }

        ],
        middle: {

            right: [

                {
                    type: "text",

                    binding: {

                        source: "context",

                        field: "company"

                    },

                    align: "left"

                },

                {
                    type: "text",

                    binding: {

                        source: "context",

                        field: "branch"

                    },

                    align: "left"

                },

                {
                    type: "text",

                    binding: {

                        source: "context",

                        field: "reportUser"

                    },

                    align: "left"

                }

            ],

            center: [

                {
                    type: "logo",

                    src: "./images/mel_logo.jpg",

                    width: 15,

                    height: 15,

                    fit: "contain"

                }

                /*,{

                     type: "title",

                     value: "گزارش فروش"

                 }*/

            ],

            left: [

                {

                    type: "text",

                    binding: {

                        source: "context",

                        field: "reportDate"

                    },

                    align: "right"

                },

                {

                    type: "pageNumber",

                    align: "right"

                }

            ]

        },
        bottom: [

            {
                type: "text",

                binding: {

                    source: "context",

                    field: "reportTitle"

                },

                align: "left"

            }

        ]


    }
});


const footer = new FooterDefinition({

    repeat: true,/*true,false,*/
    lastPageOnly: true,

    rows: [
        {
            type: "signature",
            binding: {
                source: "context",
                field: "preparedBy"
            }

        },

        {
            type: "signature",
            binding: {
                source: "context",
                field: "approvedBy"
            }
        }
    ]
});

const table = new TableDefinition({
    showHeader: true,

    columns: [

        new ColumnDefinition({

            field: "id",

            title: "شماره",

            width: 10,

            thAlign: "center",

            tdAlign: "center"

        }),

        new ColumnDefinition({


            field: "customer",

            title: "مشتری",

            width: 30,

            thAlign: "center",

            tdAlign: "right"

        }),

        new ColumnDefinition({

            field: "description",

            title: "شرح",

            width: 90,

            thAlign: "center",

            tdAlign: "right"

        }),

        new ColumnDefinition({

            field: "amount",

            title: "مبلغ",

            width: 30,

            type: "number",

            thAlign: "center",

            tdAlign: "center"

        })

    ]

});

const invoiceReport = new ReportDefinition({

    name: "invoiceReport",

    page,

    header,

    footer,

    table,

    measure

});

export default invoiceReport;