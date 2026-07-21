/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : HeaderDefinition.js
 * Version   : 6.0.0
 *
 * Description:
 *      Defines report header structure.
 *
 * Responsibilities:
 *      ✔ Stores header definition only
 *      ✔ No layout calculation
 *      ✔ No binding resolution
 *      ✔ No rendering
 *
 * Contract:
 *
 * {
 *     repeat,
 *     height,
 *     margin,
 *     padding,
 *     sections:{
 *         top:[],
 *         middle:{
 *             right:[],
 *             center:[],
 *             left:[]
 *         },
 *         bottom:[]
 *     }
 * }
 *
 * ------------------------------------------------------------
 */

import { BaseDefinition } from "./BaseDefinition.js";

export class HeaderDefinition extends BaseDefinition {

    #repeat;
    #height;
    #margin;
    #padding;
    #sections;

    constructor(config = {}) {
        super(config);

        this.#repeat = config.repeat ?? true;
        this.#height = config.height ?? 0;

        this.#margin = {
            top: config.margin?.top ?? 0,
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

        this.#sections = {
            top: config.sections?.top ?? [],
            middle: {
                right: config.sections?.middle?.right ?? [],
                center: config.sections?.middle?.center ?? [],
                left: config.sections?.middle?.left ?? []
            },
            bottom: config.sections?.bottom ?? []
        };
    }

    get repeat() {
        return this.#repeat;
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

    get sections() {
        return this.#sections;
    }

    toJSON() {
        return {
            repeat: this.#repeat,
            height: this.#height,
            margin: this.#margin,
            padding: this.#padding,
            sections: this.#sections
        };
    }
}