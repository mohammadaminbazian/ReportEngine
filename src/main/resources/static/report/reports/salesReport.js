/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : salesReport.js
 * Version   : 2.0.0
 * Description :
 *      Sales report definition.
 *
 * ------------------------------------------------------------
 */

import { ReportDefinition } from "../model/ReportDefinition.js";
import { PageDefinition } from "../model/PageDefinition.js";
import { MeasureDefinition } from "../model/MeasureDefinition.js";
import { HeaderDefinition} from "../model/HeaderDefinition.js";
import { FooterDefinition} from "../model/FooterDefinition.js";
import { TableDefinition } from "../model/TableDefinition.js";
import { ColumnDefinition } from "../model/ColumnDefinition.js";

const page = new PageDefinition({
    size:"A4",//"A4",
    orientation:"LANDSCAPE",//"LANDSCAPE","PORTRAIT",
    margin:{
        top:1,
        right:3,
        bottom:1,
        left:2
    }
});






const measure =

new MeasureDefinition({

    font:"B Nazanin",//"IRANYekanXFaNum",//"B Nazanin", 

    fontSize: 10,

    lineHeight: 3,

    pageSizeModel : page.size + " " +page.orientation,

    row:{
        
        baseHeight:4,

        headerHeight:4

    }


});


const header = new HeaderDefinition({

    repeat: true,
    height:25,
    margin:{
        top:1,
        bottom:1
    },

    padding:{
        top:0,
        bottom:1,
        left:1,
        right:1
    },

    sections:{
       top: [

            {
                type: "text",

                binding: {

                    source: "context",

                    field: "companyTop"

                },

                align: "center"

            }

        ],  
    middle: {

        right: [

            {
                type: "text",

                binding: {

                    source: "context",

                    field: "company",
                    showLabel:true

                },

                align: "right"

            },

            {
                type: "text",

                binding: {

                    source: "context",

                    field: "branch",
                    showLabel:true

                },

                align: "right",


            },

            {
                type: "text",

                binding: {

                    source: "context",

                    field: "reportUser",
                    showLabel:true

                },

                align: "right"

            }

        ],

        center: [

            {
                type: "logo",

                src:  "./images/mel_logo.jpg",

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

                    field: "reportDate",
                    showLabel:true

                },

                align: "left"

            },

            {

                type: "pageNumber",
                
                align: "left"

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

                align: "right"

            }

        ]
    

    
    } 
});


const footer = new FooterDefinition({

    repeat: true,/*true,false,*/
    lastPageOnly: false,
    height:15,
    reserveHeight:15,
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
     showHeader:true,

    header:{
        height:9
    },

    columns:[

        new ColumnDefinition({

            field:"id",

            title:"شماره",

            width:3,

            thAlign:"center",

            tdAlign:"center"

        }),

        new ColumnDefinition({
            

            field:"artifactName",

            title:"نام اثر",

            width:8,

            thAlign:"center",

            tdAlign:"right"

        }),

        new ColumnDefinition({

            field:"province",

            title:"استان",

            width:10,

            thAlign:"center",

            tdAlign:"right"

        }),

        new ColumnDefinition({

            field:"contractor",

            title:"نام پیمانکار",

            width:10,

            type:"text",

            thAlign:"center",

            tdAlign:"right"

        }),

        new ColumnDefinition({

            field:"amount",

            title:"مبلغ",

            width:10,

            type:"number",

            thAlign:"center",

            tdAlign:"center"

        }),

        new ColumnDefinition({

            field:"currency",

            title:"واحد پول",

            width:3,

            type:"text",

            thAlign:"center",

            tdAlign:"center"

        }),

        new ColumnDefinition({

            field:"operationDate",

            title:"تاریخ",

            width:8,

            type:"date",

            thAlign:"center",

            tdAlign:"center"

        }),

        new ColumnDefinition({

            field:"description",

            title:"شرح",

            width:40,

            type:"text",

            thAlign:"center",

            tdAlign:"right"

        }),

        new ColumnDefinition({

            field:"status",

            title:"وضعیت",

            width:6,

            type:"text",

            thAlign:"center",

            tdAlign:"center"

        })

    ]

});

const salesReport = new ReportDefinition({

    name:"salesReport",

    page,

    header,

    footer,

    table,

    measure

});

export default salesReport;