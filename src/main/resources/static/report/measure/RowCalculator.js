/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : RowCalculator.js
 * Version   : 2.0.0
 *
 * Description :
 *      Calculates physical row height.
 *
 * Responsibilities
 *      ✔ Measure every cell
 *      ✔ Find maximum line count
 *      ✔ Calculate final row height
 *
 * No Pagination
 * No Rendering
 * No Layout
 *
 * ------------------------------------------------------------
 */

import { RowMeasureResult }
    from "../model/RowMeasureResult.js";

export class RowCalculator {

    //--------------------------------------------------
    // Private Fields
    //--------------------------------------------------

    #textMeasurer;

    #definition;

    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor({

                    textMeasurer,

                    definition

                }){

        this.#textMeasurer = textMeasurer;

        this.#definition = definition;

    }

    //--------------------------------------------------
    // Calculate
    //--------------------------------------------------

    calculate(

        row,

        columns

    ){

        const cells = {};

        const lines = {};

        let maxLines = 1;

        //--------------------------------------------------
        // Measure every column
        //--------------------------------------------------

        for(const column of columns){

            const value =  String(  row[column.field] ?? ""  );

            const lineCount =  Math.max( 1, this.#textMeasurer.calculateLines( value, column.width     )  );

            cells[column.field] = {

                value,

                lineCount

            };

            lines[column.field] = lineCount;

            if(lineCount > maxLines){

                maxLines = lineCount;

            }

        }

        //--------------------------------------------------
        // Calculate Height
        //--------------------------------------------------

        let height =  maxLines * this.#definition.lineHeight;
        height += this.#definition.padding.top + this.#definition.padding.bottom;

        height = Math.max(  height,   this.#definition.row.baseHeight  );

        height = Math.ceil(height);

        //--------------------------------------------------
        // Result
        //--------------------------------------------------

        return new RowMeasureResult({

            height,

            lines,

            cells

        });

    }

    //--------------------------------------------------
    // Limits
    //--------------------------------------------------

    #applyLimits(height){

        const {

            minHeight,

            maxHeight

        } = this.#definition.limits;

        if(minHeight != null){

            height =

                Math.max(

                    minHeight,

                    height

                );

        }

        if(maxHeight != null){

            height =

                Math.min(

                    maxHeight,

                    height

                );

        }

        return height;

    }

}