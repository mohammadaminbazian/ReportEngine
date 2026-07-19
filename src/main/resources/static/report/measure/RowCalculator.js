/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : RowCalculator.js
 * Version   : 1.0.0
 * Description :
 *      Calculates row height.
 *
 * ------------------------------------------------------------
 */
import { RowMeasureResult } from "../model/RowMeasureResult.js";

export class RowCalculator {

    #textMeasurer;

    #fontMetrics;

    #definition;



    constructor({

        textMeasurer,

        fontMetrics,

        definition

    }){


        this.#textMeasurer =
            textMeasurer;


        this.#fontMetrics =
            fontMetrics;


        this.#definition =
            definition;


    }




    //--------------------------------------------------
    // Calculate Row
    //--------------------------------------------------

    calculate(row,columns){


        let maxLines = 1;


        const cells = {};

        const lines = {};



        columns.forEach(column=>{


            const value =
                row[column.field];


            const lineCount =

                this.#textMeasurer.calculateLines(

                    value,

                    column.width

                );



            lines[column.field] =
                lineCount;



            cells[column.field] = {


                value,

                lines:
                    lineCount

            };



            maxLines =
                Math.max(

                    maxLines,

                    lineCount

                );


        });





        let height =

            this.#fontMetrics.getFontHeight();



        height +=

            (

                (maxLines - 1)

                *

                this.#fontMetrics.getLineHeight()

            );



        height +=

            this.#definition.padding.top

            +

            this.#definition.padding.bottom;



        height =
            this.#applyLimit(height);



        return new RowMeasureResult({

            height,

            lines,

            cells

        });


    }





    #applyLimit(height){


        const min =

            this.#definition
                .limits
                .minHeight;



        const max =

            this.#definition
                .limits
                .maxHeight;



        return Math.min(

            Math.max(

                height,

                min

            ),

            max

        );

    }

}