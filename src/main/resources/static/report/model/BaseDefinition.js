/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : BaseDefinition.js
 * Version   : 3.0.0
 *
 * Description :
 *      Base class for all report definitions.
 *
 * Responsibilities
 *      ✔ Metadata
 *      ✔ Validation Contract
 *      ✔ Clone
 *      ✔ Serialization
 *      ✔ Utility Methods
 *      ✔ Immutable Helpers
 *
 * This class contains NO layout logic.
 * This class contains NO rendering logic.
 *
 * ------------------------------------------------------------
 */

export class BaseDefinition {

    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #metadata;

    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor(metadata = {}) {

        this.#metadata = Object.freeze({

            createdAt: new Date(),

            version: "1.0",

            ...metadata

        });

    }

    //--------------------------------------------------
    // Metadata
    //--------------------------------------------------

    get metadata() {

        return this.#metadata;

    }

    //--------------------------------------------------
    // Validation Contract
    //--------------------------------------------------

    validate() {

        return {

            valid: true,

            errors: []

        };

    }

    //--------------------------------------------------
    // JSON
    //--------------------------------------------------

    toJSON() {

        return {

            metadata: this.#metadata

        };

    }

    //--------------------------------------------------
    // Clone
    //--------------------------------------------------

    clone() {

        return structuredClone(this);

    }

    //--------------------------------------------------
    // Helpers
    //--------------------------------------------------

    isNull(value) {

        return value === null;

    }

    isUndefined(value) {

        return value === undefined;

    }

    isEmpty(value) {

        return value === null ||

            value === undefined;

    }

    isNumber(value) {

        return typeof value === "number"

            &&

            !Number.isNaN(value);

    }

    isString(value) {

        return typeof value === "string";

    }

    //--------------------------------------------------
    // Safe Value
    //--------------------------------------------------

    value(value, defaultValue) {

        return this.isEmpty(value)

            ? defaultValue

            : value;

    }

    //--------------------------------------------------
    // Freeze Helper
    //--------------------------------------------------

    freeze(object) {

        return Object.freeze(object);

    }

    //--------------------------------------------------
    // String
    //--------------------------------------------------

    toString() {

        return this.constructor.name;

    }

}