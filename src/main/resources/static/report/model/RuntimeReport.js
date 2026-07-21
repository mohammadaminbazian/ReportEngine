/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : RuntimeReport.js
 * Version   : 6.0.0
 *
 * Description :
 *      Runtime container for report execution.
 *
 * Responsibilities:
 *      ✔ Holds runtime data only
 *      ✔ No calculation
 *      ✔ No rendering
 *      ✔ No pagination
 *      ✔ No binding
 *
 * Contract:
 *
 * {
 *      definition,
 *      layout,
 *      header,
 *      footer,
 *      table,
 *      measure,
 *      context
 * }
 *
 * ------------------------------------------------------------
 */

export class RuntimeReport {

    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #definition;

    #layout;

    #header;

    #footer;

    #table;

    #measure;

    #context;

    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({

                    definition,

                    layout,

                    header = null,

                    footer = null,

                    table = null,

                    measure = null,

                    context = {}

                } = {}) {

        this.#definition = definition;

        this.#layout = layout;

        this.#header = header;

        this.#footer = footer;

        this.#table = table;

        this.#measure = measure;

        this.#context = context;

    }

    //--------------------------------------------------
    // Getters
    //--------------------------------------------------

    get definition() {
        return this.#definition;
    }

    get layout() {
        return this.#layout;
    }

    get header() {
        return this.#header;
    }

    get footer() {
        return this.#footer;
    }

    get table() {
        return this.#table;
    }

    get measure() {
        return this.#measure;
    }

    get context() {
        return this.#context;
    }

    //--------------------------------------------------
    // JSON
    //--------------------------------------------------

    toJSON() {

        return {

            definition: this.#definition,

            layout: this.#layout,

            header: this.#header,

            footer: this.#footer,

            table: this.#table,

            measure: this.#measure,

            context: this.#context

        };

    }

}