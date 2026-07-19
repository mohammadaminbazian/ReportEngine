/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : BindingResolver.js
 * Version   : 2.0.0
 *
 * Description :
 *      Resolves report bindings.
 *
 * ------------------------------------------------------------
 */


export class BindingResolver {



   /* static resolveHeader(
        header,
        context={}
    ){


        if(!header){

            return null;

        }



        return {


            ...header,


            sections:

                Array.isArray(header.sections)

                ?

                header.sections.map(

                    section =>

                    this.#resolveSection(
                        section,
                        context
                    )

                ) :   []

        };


    }*/

static resolveHeader(

    header,

    context = {}

){


    if(!header){

        return null;

    }



    header.sections =


        (header.sections ?? [])

        .map(

            section =>

            this.#resolveSection(

                section,

                context

            )

        );



    return header;


}


    static #resolveSection(

        section,

        context

    ){


        const result = {


            ...section

        };




        //---------------------------------
        // Normal section items
        //---------------------------------

        if(section.items){


            result.items =

                section.items.map(

                    item =>

                    this.#resolveItem(

                        item,

                        context

                    )

                );


        }





        //---------------------------------
        // Column section
        //---------------------------------

        if(section.columns){


            result.columns = {


                right:

                    this.#resolveItems(

                        section.columns.right,

                        context

                    ),



                center:

                    this.#resolveItems(

                        section.columns.center,

                        context

                    ),



                left:

                    this.#resolveItems(

                        section.columns.left,

                        context

                    )

            };


        }



        return result;


    }





    static #resolveItems(

        items=[],

        context

    ){


        return items.map(

            item =>

            this.#resolveItem(

                item,

                context

            )

        );


    }






    static #resolveItem(

        item,

        context

    ){



        if(!item.binding){


            return {

                ...item

            };


        }





        if(
            item.binding.source !== "context"
        ){


            return {

                ...item

            };


        }





        const data =

            context[
                item.binding.field
            ];





        if(!data){


            return {


                ...item,


                label:"",


                value:""


            };


        }





        return {


            ...item,


            label:data.label ?? "",


            value:data.value ?? ""


        };



    }

//--------------------------------------------------
// Resolve Footer
//--------------------------------------------------

/*static resolveFooter(

    footer,

    context = {}

){


    if(!footer){

        return null;

    }



    return {


        ...footer,


        rows:

            (footer.rows ?? [])

            .map(

                item =>

                    this.#resolveItem(

                        item,

                        context

                    )

            )


    };


}*/

//--------------------------------------------------
// Resolve Footer
//--------------------------------------------------

static resolveFooter(

    footer,

    context = {}

){


    if(!footer){

        return null;

    }



    footer.rows =

        (footer.rows ?? [])

        .map(

            item =>

            this.#resolveItem(

                item,

                context

            )

        );



    return footer;


}

}