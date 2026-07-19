/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : RowMeasureResult.js
 * Version   : 2.0.0
 * Description :
 *      Result object returned by MeasureManager.
 *
 * ------------------------------------------------------------
 */

export class RowMeasureResult {

    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #height;

    #lines;

    #cells;

    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({
        height = 0,
        lines = {},
        cells = {}
    } = {}) {
        this.#height = height;
        this.#lines = lines;
        this.#cells = cells;
    }

    //--------------------------------------------------
    // Getters
    //--------------------------------------------------

    get height() {

        return this.#height;

    }

    get lines() {

        return this.#lines;

    }

    get cells() {

        return this.#cells;
    }

    //--------------------------------------------------
    // Helpers
    //--------------------------------------------------

    hasMultipleLines() {

        return Object.values(this.#lines)
            .some(line => line > 1);

    }

    //--------------------------------------------------
    // JSON
    //--------------------------------------------------

    toJSON() {

        return {

            height: this.#height,

            lines: this.#lines,

            cells: this.#cells

        };

    }

}