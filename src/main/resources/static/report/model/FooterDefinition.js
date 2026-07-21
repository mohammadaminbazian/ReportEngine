/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : FooterDefinition.js
 * Version   : 6.0.0
 *
 * Description:
 *      Defines report footer structure.
 *
 * Responsibilities:
 *      ✔ Stores footer definition only
 *      ✔ No layout calculation
 *      ✔ No binding resolution
 *      ✔ No rendering
 *
 * Contract:
 *
 * {
 *     repeat,
 *     lastPageOnly,
 *     height,
 *     margin,
 *     padding,
 *     rows:[]
 * }
 *
 * ------------------------------------------------------------
 */

import { BaseDefinition } from "./BaseDefinition.js";

export class FooterDefinition extends BaseDefinition {

    #repeat;
    #lastPageOnly;
    #height;
    #margin;
    #padding;
    #rows;

    constructor(config = {}) {
        super(config);

        this.#repeat = config.repeat ?? true;
        this.#lastPageOnly = config.lastPageOnly ?? false;
        this.#height = config.height ?? 15;

        this.#margin = {
            top: config.margin?.top ?? 1,
            right: config.margin?.right ?? 0,
            bottom: config.margin?.bottom ?? 0,
            left: config.margin?.left ?? 0
        };

        this.#padding = {
            top: config.padding?.top ?? 0,
            right: config.padding?.right ?? 0,
            bottom: config.padding?.bottom ?? 0,
            left: config.padding?.left ?? 0
        };

        this.#rows = config.rows ?? [];
    }

    get repeat() {
        return this.#repeat;
    }

    get lastPageOnly() {
        return this.#lastPageOnly;
    }

    get height() {
        return this.#height;
    }

    get margin() {
        return this.#margin;
    }

    get padding() {
        return this.#padding;
    }

    get rows() {
        return this.#rows;
    }

    toJSON() {
        return {
            repeat: this.#repeat,
            lastPageOnly: this.#lastPageOnly,
            height: this.#height,
            margin: this.#margin,
            padding: this.#padding,
            rows: this.#rows
        };
    }
}