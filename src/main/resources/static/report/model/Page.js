/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : Page.js
 * Version   : 6.0.0
 *
 * Description :
 *      Runtime page model.
 *
 * Responsibilities:
 *      ✔ Holds page rows
 *      ✔ Tracks used height
 *      ✔ Calculates remaining height
 *
 * No Rendering
 * No Layout
 * No Measurement
 *
 * ------------------------------------------------------------
 */

export class Page {

    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({

                    number = 1,

                    availableHeight = 0

                } = {}) {

        this.number = number;

        this.availableHeight = availableHeight;

        this.usedHeight = 0;

        this.rows = [];

        this.tableHeader = false;

        this.totalPages = 0;

    }

    //--------------------------------------------------
    // Add Row
    //--------------------------------------------------

    addRow(row, height) {

        this.rows.push({

            data: row,

            height

        });

        this.usedHeight += height;

    }

    //--------------------------------------------------
    // Can Accept
    //--------------------------------------------------

    canAccept(height) {

        return (

            this.usedHeight + height

            <=

            this.availableHeight

        );

    }

    //--------------------------------------------------
    // Empty
    //--------------------------------------------------

    isEmpty() {

        return this.rows.length === 0;

    }

    //--------------------------------------------------
    // Remaining Height
    //--------------------------------------------------

    get remainingHeight() {

        return (

            this.availableHeight

            -

            this.usedHeight

        );

    }

}