/*
 * ------------------------------------------------------------
 * Report Engine
 * File      : Formatter.js
 * Version   : 1.0.0
 * Description :
 *      Value Formatter
 * ------------------------------------------------------------
 */

export class Formatter {

    //----------------------------------------------------------
    // Main
    //----------------------------------------------------------

    static format(value, column) {

        if (column?.formatter instanceof Function) {

            return column.formatter(value);

        }

        const type = column?.type ?? "text";

        switch (type) {

            case "number":
                return this.number(value);

            case "currency":
                return this.currency(value);

            case "date":
                return this.date(value);

            case "time":
                return this.time(value);

            case "datetime":
                return this.dateTime(value);

            case "boolean":
                return this.boolean(value);

            case "percent":
                return this.percent(value);

            default:
                return this.text(value);

        }

    }

    //----------------------------------------------------------
    // Text
    //----------------------------------------------------------

    static text(value) {

        if (value === null || value === undefined) {

            return "";

        }

        return String(value);

    }

    //----------------------------------------------------------
    // Number
    //----------------------------------------------------------

    static number(value) {

        if (value === null || value === undefined || value === "") {

            return "";

        }

        return new Intl.NumberFormat("fa-IR").format(value);

    }

    //----------------------------------------------------------
    // Currency
    //----------------------------------------------------------

    static currency(value) {

        if (value === null || value === undefined || value === "") {

            return "";

        }

        return new Intl.NumberFormat(

            "fa-IR",

            {

                minimumFractionDigits: 0,

                maximumFractionDigits: 0

            }

        ).format(value);

    }

    //----------------------------------------------------------
    // Percent
    //----------------------------------------------------------

    static percent(value) {

        if (value === null || value === undefined) {

            return "";

        }

        return value + "%";

    }

    //----------------------------------------------------------
    // Boolean
    //----------------------------------------------------------

    static boolean(value) {

        return value ? "بلی" : "خیر";

    }

    //----------------------------------------------------------
    // Date
    //----------------------------------------------------------

    static date(value) {

        if (!value) {

            return "";

        }

        if (value instanceof Date) {

            return value.toLocaleDateString("fa-IR");

        }

        return value;

    }

    //----------------------------------------------------------
    // Time
    //----------------------------------------------------------

    static time(value) {

        if (!value) {

            return "";

        }

        if (value instanceof Date) {

            return value.toLocaleTimeString("fa-IR");

        }

        return value;

    }

    //----------------------------------------------------------
    // Date Time
    //----------------------------------------------------------

    static dateTime(value) {

        if (!value) {

            return "";

        }

        if (value instanceof Date) {

            return value.toLocaleString("fa-IR");

        }

        return value;

    }

}