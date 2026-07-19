import { ReportDefinition } from "../model/ReportDefinition.js";

export const invoiceReport = new ReportDefinition({

    name: "invoice",

    title: "صورتحساب",

    page: {

        size: "A4",

        orientation: "landscape",

        margin: {

            top: 12,
            right: 10,
            bottom: 12,
            left: 10

        }

    },

    header: {

        visible: true,

        repeat: true,

        height: 85

    },

    footer: {

        visible: true,

        repeat: false,

        height: 55

    },

    table: {

        repeatHeader: true,

        columns: [

            {
                field: "date",
                title: "تاریخ",
                width: 10
            },

            {
                field: "description",
                title: "شرح",
                width: 35
            },

            {
                field: "debit",
                title: "بدهکار",
                width: 15
            }

        ]

    }

});