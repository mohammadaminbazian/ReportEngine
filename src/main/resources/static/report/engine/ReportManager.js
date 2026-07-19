/*
 * ------------------------------------------------------------
 * Report Engine
 * File      : ReportManager.js
 * Version   : 1.0.0
 * Description :
 *      Report Definition Manager
 * ------------------------------------------------------------
 */

export class ReportManager {

    #reports = new Map();

    //----------------------------------------------------------
    // Register
    //----------------------------------------------------------

    register(reportDefinition) {

        if (!reportDefinition) {

            throw new Error(
                "Report definition is required."
            );

        }

        if (!reportDefinition.name) {

            throw new Error(
                "Report name is required."
            );

        }

        if (this.#reports.has(reportDefinition.name)) {

            throw new Error(
                `Report '${reportDefinition.name}' already exists.`
            );

        }

        this.#reports.set(

            reportDefinition.name,

            reportDefinition

        );

    }

    //----------------------------------------------------------
    // Get
    //----------------------------------------------------------

    get(name) {

        return this.#reports.get(name);

    }

    //----------------------------------------------------------
    // Exists
    //----------------------------------------------------------

    has(name) {

        return this.#reports.has(name);

    }

    //----------------------------------------------------------
    // Remove
    //----------------------------------------------------------

    remove(name) {

        return this.#reports.delete(name);

    }

    //----------------------------------------------------------
    // Clear
    //----------------------------------------------------------

    clear() {

        this.#reports.clear();

    }

    //----------------------------------------------------------
    // Count
    //----------------------------------------------------------

    get count() {

        return this.#reports.size;

    }

    //----------------------------------------------------------
    // Get All
    //----------------------------------------------------------

    getAll() {

        return [...this.#reports.values()];

    }

}