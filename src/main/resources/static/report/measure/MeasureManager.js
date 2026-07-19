/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : MeasureManager.js
 * Version   : 3.1.0
 *
 * Description :
 *      Measurement coordinator.
 *
 *      Receives MeasureDefinition from ReportDefinition.
 *
 * ------------------------------------------------------------
 */


import { TextMeasurer } from "./TextMeasurer.js";
import { FontMetrics } from "./FontMetrics.js";
import { RowCalculator } from "./RowCalculator.js";



export class MeasureManager {



    #definition;

    #textMeasurer;

    #fontMetrics;

    #rowCalculator;



    constructor(measureDefinition){


        if(!measureDefinition){

            throw new Error(
                "MeasureDefinition is required"
            );

        }


        this.#definition =
            measureDefinition;



        this.#textMeasurer =
            new TextMeasurer({

                font:
                    measureDefinition.font,

                fontSize:
                    measureDefinition.fontSize

            });



        this.#fontMetrics =
            new FontMetrics({

                fontSize:
                    measureDefinition.fontSize,

                lineHeight:
                    measureDefinition.lineHeight

            });



        this.#rowCalculator =
            new RowCalculator({

                textMeasurer:
                    this.#textMeasurer,


                fontMetrics:
                    this.#fontMetrics,


                definition:
                    measureDefinition

            });


    }




    measureRow(row,columns){


        if(!Array.isArray(columns)){

            throw new Error(
                "MeasureManager.measureRow requires columns array"
            );

        }

        return this.#rowCalculator.calculate(

            row,

            columns

        );

    }



}