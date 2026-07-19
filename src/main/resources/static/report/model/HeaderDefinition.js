/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : HeaderDefinition.js
 * Version   : 5.0.0
 *
 * Description:
 *      Defines report header layout.
 *
 *      Supports:
 *      - top row
 *      - three column middle row
 *      - bottom row
 *      - padding
 *      - margin
 *
 * ------------------------------------------------------------
 */


import { BaseDefinition } from "./BaseDefinition.js";


export class HeaderDefinition extends BaseDefinition {



    constructor({

                    height = null,

                    repeat = true,

                    margin = {},

                    padding = {},

                    sections = {},

                    metadata = {}

                } = {}){


        super(metadata);



        this.repeat =
            repeat;



        this.margin = {


            top:
                margin.top ?? 0,


            bottom:
                margin.bottom ?? 0


        };



        this.padding = {


            top:
                padding.top ?? 0,


            right:
                padding.right ?? 0,


            bottom:
                padding.bottom ?? 0,


            left:
                padding.left ?? 0


        };




        this.sections =

            this.createSections(
                sections
            );




        this.height =

            height;



    }







    //--------------------------------------------------
    // Create Structure
    //--------------------------------------------------

    createSections(sections){



        return [


            {

                name:"top",

                layout:"full",

                height:8,


                items:
                    sections.top ?? []

            },



            {

                name:"middle",

                layout:"three-column",

                height:24,


                columns:{


                    right:
                        sections.middle?.right ?? [],


                    center:
                        sections.middle?.center ?? [],


                    left:
                        sections.middle?.left ?? []


                }


            },



            {

                name:"bottom",

                layout:"full",

                height:8,


                items:
                    sections.bottom ?? []


            }


        ];


    }







    //--------------------------------------------------
    // Height Calculation
    //--------------------------------------------------

    getHeight(){



        if(this.height !== null){


            return this.height;


        }




        const sectionHeight =


            this.sections.reduce(

                (sum,section)=>


                    sum +

                    (section.height ?? 0),


                0


            );





        return (

            sectionHeight

            +

            this.padding.top

            +

            this.padding.bottom


        );


    }







    //--------------------------------------------------
    // Section
    //--------------------------------------------------

    getSection(name){


        return this.sections.find(

            section =>

                section.name === name

        );


    }







    addSection(section){


        this.sections.push(section);


        return this;


    }







    hasSections(){


        return this.sections.length > 0;


    }







    //--------------------------------------------------
    // Validation
    //--------------------------------------------------

    validate(){


        return {


            valid:true,


            errors:[]


        };


    }



}