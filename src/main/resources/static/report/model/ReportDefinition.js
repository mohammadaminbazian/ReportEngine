/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : ReportDefinition.js
 * Version   : 2.0.0
 * Description :
 *      Defines report structure.
 *
 *      This class contains only report metadata.
 *      No calculation.
 *      No rendering.
 *      No pagination.
 *
 * ------------------------------------------------------------
 */
import { BaseDefinition } from "./BaseDefinition.js";

export class ReportDefinition extends BaseDefinition {

    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------
    #name;

    #page;

    #header;

    #footer;

    #sections;

    #table;

    #measure;

    #options;

    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------
    constructor({

        name = "unknown",

        page = null,

        header = null,

        footer = null,

        sections = [],

        table = null,

        measure = null,

        options = {}

    } = {}) {

        super();

        this.#name = name;

        this.#page = page;

        this.#header = header;

        this.#footer = footer;

        this.#sections = sections;

        this.#table = table;

        this.#measure = measure;

        this.#options = options;

    }

    //--------------------------------------------------
    // Getters
    //--------------------------------------------------
    get name() {

        return this.#name;

    }

    get page() {

        return this.#page;

    }

    get header() {

        return this.#header;

    }

    get footer() {

        return this.#footer;

    }

    get sections() {

        return this.#sections;

    }

    get table() {

        return this.#table;

    }

    get measure() {

        return this.#measure;

    }

    get options() {

        return this.#options;

    }

    //--------------------------------------------------
    // Helpers
    //--------------------------------------------------
    hasHeader() {

        return this.#header !== null;

    }

    hasFooter() {

        return this.#footer !== null;

    }

    hasTable() {

        return this.#table !== null;

    }

    //--------------------------------------------------
    // Validation
    //--------------------------------------------------
    validate() {
        const errors = [];

        if (!this.#name) {

            errors.push(
                "Report name is required"
            );

        }

        if (!this.#page) {

            errors.push(
                "Page definition is required"
            );

        }

        if (!this.#table) {

            errors.push(
                "Table definition is required"
            );

        }

        return {

            valid: errors.length === 0,

            errors
        };

    }

    //--------------------------------------------------
    // Serialization
    //--------------------------------------------------
    toJSON() {

        return {

            name: this.#name,

            page: this.#page,

            header: this.#header,

            footer: this.#footer,

            sections: this.#sections,

            table: this.#table,

            measure: this.#measure,

            options: this.#options

        };


    }

}