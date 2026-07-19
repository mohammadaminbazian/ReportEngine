/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : PageDefinition.js
 * Version   : 5.0.0
 *
 * Description :
 *      Defines physical page properties.
 *
 * Responsibilities
 *      ✔ Page Size
 *      ✔ Orientation
 *      ✔ Margins
 *      ✔ Content Padding
 *      ✔ Header Spacing
 *      ✔ Footer Spacing
 *      ✔ Print Options
 *
 * No Layout Calculation
 * No Rendering
 * No Pagination
 *
 * ------------------------------------------------------------
 */

import { BaseDefinition } from "./BaseDefinition.js";

export class PageDefinition extends BaseDefinition {

    //--------------------------------------------------
    // Constants
    //--------------------------------------------------

    static PAGE_SIZES = Object.freeze({

        A4: {
            width: 210,
            height: 297
        },

        A5: {
            width: 148,
            height: 210
        }

    });

    static ORIENTATIONS = Object.freeze([
        "PORTRAIT",
        "LANDSCAPE"
    ]);

    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #size;

    #orientation;

    #margin;

    #content;

    #header;

    #footer;

    #print;

    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({

                    size = "A4",

                    orientation = "PORTRAIT",

                    margin = {},

                    content = {},

                    header = {},

                    footer = {},

                    print = {},

                    metadata = {}

                } = {}) {

        super(metadata);

        this.#size =
            size.toUpperCase();

        this.#orientation =
            orientation.toUpperCase();

        //--------------------------------------------------
        // Page Margin
        //--------------------------------------------------

        this.#margin = this.freeze({

            top: margin.top ?? 3,

            right: margin.right ?? 3,

            bottom: margin.bottom ?? 3,

            left: margin.left ?? 3

        });

        //--------------------------------------------------
        // Printable Content
        //--------------------------------------------------

        this.#content = this.freeze({

            paddingTop:
                content.paddingTop ?? 0,

            paddingRight:
                content.paddingRight ?? 0,

            paddingBottom:
                content.paddingBottom ?? 0,

            paddingLeft:
                content.paddingLeft ?? 0

        });

        //--------------------------------------------------
        // Header Layout
        //--------------------------------------------------

        this.#header = this.freeze({

            marginTop:
                header.marginTop ?? 2,

            marginBottom:
                header.marginBottom ?? 2

        });

        //--------------------------------------------------
        // Footer Layout
        //--------------------------------------------------

        this.#footer = this.freeze({

            marginTop:
                footer.marginTop ?? 2,

            marginBottom:
                footer.marginBottom ?? 2

        });

        //--------------------------------------------------
        // Print
        //--------------------------------------------------

        this.#print = this.freeze({

            repeatHeader:
                print.repeatHeader ?? true,

            repeatFooter:
                print.repeatFooter ?? false

        });

    }

    //--------------------------------------------------
    // Getters
    //--------------------------------------------------

    get size() {

        return this.#size;

    }

    get orientation() {

        return this.#orientation;

    }

    get margin() {

        return this.#margin;

    }

    get content() {

        return this.#content;

    }

    get header() {

        return this.#header;

    }

    get footer() {

        return this.#footer;

    }

    get print() {

        return this.#print;

    }

    //--------------------------------------------------
    // Unified Layout Settings
    //--------------------------------------------------

    get spacing() {

        return {

            margin: this.#margin,

            content: this.#content,

            header: this.#header,

            footer: this.#footer

        };

    }

    //--------------------------------------------------
    // Orientation
    //--------------------------------------------------

    isPortrait() {

        return this.#orientation === "PORTRAIT";

    }

    isLandscape() {

        return this.#orientation === "LANDSCAPE";

    }

    //--------------------------------------------------
    // Physical Page Size
    //--------------------------------------------------

    getSize() {

        const page =
            PageDefinition.PAGE_SIZES[this.#size];

        if (!page) {

            throw new Error(
                `Unsupported page size : ${this.#size}`
            );

        }

        if (this.isLandscape()) {

            return {

                width: page.height,

                height: page.width

            };

        }

        return {

            width: page.width,

            height: page.height

        };

    }

    //--------------------------------------------------
    // Validation
    //--------------------------------------------------

    validate() {

        const result =
            super.validate();

        const errors =
            [...result.errors];

        if (!(this.#size in PageDefinition.PAGE_SIZES)) {

            errors.push(
                `Unsupported page size : ${this.#size}`
            );

        }

        if (!PageDefinition.ORIENTATIONS.includes(this.#orientation)) {

            errors.push(
                `Unsupported orientation : ${this.#orientation}`
            );

        }

        return {

            valid:
                errors.length === 0,

            errors

        };

    }

    //--------------------------------------------------
    // JSON
    //--------------------------------------------------

    toJSON() {

        return {

            ...super.toJSON(),

            size: this.#size,

            orientation: this.#orientation,

            margin: this.#margin,

            content: this.#content,

            header: this.#header,

            footer: this.#footer,

            print: this.#print

        };

    }

}