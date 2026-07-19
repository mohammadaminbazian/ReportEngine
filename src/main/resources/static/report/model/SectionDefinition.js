/*
 * ------------------------------------------------------------
 * Report Engine
 * File      : SectionDefinition.js
 * Version   : 1.1.0
 * Description :
 *      Base Definition for Header and Footer
 * ------------------------------------------------------------
 */

import { BaseDefinition } from "./BaseDefinition.js";

export class SectionDefinition extends BaseDefinition {

    constructor(config = {}) {

        super(config);

        this._validate();

    }

    //----------------------------------------------------------
    // Validation
    //----------------------------------------------------------

    _validate() {

        if (this.height < 0) {

            throw new Error(
                "Section height cannot be negative."
            );

        }

        if (!Array.isArray(this.elements)) {

            throw new Error(
                "Section elements must be an array."
            );

        }

    }

    //----------------------------------------------------------
    // Visibility
    //----------------------------------------------------------

    get visible() {

        return this.getValue("visible", true);

    }

    //----------------------------------------------------------
    // Repeat
    //----------------------------------------------------------

    get repeat() {

        return this.getValue("repeat", true);

    }

    //----------------------------------------------------------
    // Height
    //----------------------------------------------------------

    get height() {

        return this.getValue("height", 20)

    }

    //----------------------------------------------------------
    // Css Class
    //----------------------------------------------------------

    get cssClass() {

        return this.getValue("cssClass", "");

    }

    //----------------------------------------------------------
    // Elements
    //----------------------------------------------------------

    get elements() {

        const elements = this.getValue("elements", []);

        return Array.isArray(elements)
            ? elements
            : [];

    }

    //----------------------------------------------------------
    // Helpers
    //----------------------------------------------------------

    isVisible() {

        return this.visible;

    }

    isRepeated() {

        return this.repeat;

    }

    hasElements() {

        return this.elements.length > 0;

    }

}