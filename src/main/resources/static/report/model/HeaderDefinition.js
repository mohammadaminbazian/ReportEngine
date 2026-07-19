/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : HeaderDefinition.js
 * Version   : 4.0.0
 *
 * Description :
 *      Header definition based on sections.
 *
 * ------------------------------------------------------------
 */
export class HeaderDefinition {


constructor(config = {}) {


    this.height =
        config.height ?? 40;


    this.repeat =
        config.repeat ?? true;



    if(Array.isArray(config.sections)){


        this.sections =
            config.sections;


    }
    else{


        this.sections = [

            {

                name:"top",

                layout:"full",

                height:8,

                items:
                    config.sections?.top ?? []

            },


            {

                name:"main",

                layout:"three-column",

                height:25,

                columns:
                    config.sections?.middle ?? {

                        right:[],
                        center:[],
                        left:[]

                    }

            },


            {

                name:"bottom",

                layout:"full",

                height:8,

                items:
                    config.sections?.bottom ?? []

            }


        ];


    }


}



    addSection(section){


        this.sections.push(section);


        return this;

    }



    getSection(name){


        return this.sections.find(

            section =>

            section.name === name

        );

    }



    hasSections(){


        return this.sections.length > 0;


    }


    getHeight(){

    return this.sections.reduce(

        (sum,section)=>

            sum + (section.height ?? 0),

        0

    );

}


}