/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : BindingResolver.js
 * Version   : 5.0.0
 *
 * Description:
 *      Resolves report bindings.
 *
 * ------------------------------------------------------------
 */


export class BindingResolver {



    //--------------------------------------------------
    // Header
    //--------------------------------------------------

    static resolveHeader(

        header,

        context={}

    ){


        if(!header){

            return null;

        }



        header.sections =

            header.sections.map(

                section =>

                    this.resolveSection(

                        section,

                        context

                    )

            );



        return header;


    }








    //--------------------------------------------------
    // Section
    //--------------------------------------------------

    static resolveSection(

        section,

        context

    ){



        if(section.items){


            section.items =

                this.resolveItems(

                    section.items,

                    context

                );


        }






        if(section.columns){



            section.columns.right =

                this.resolveItems(

                    section.columns.right,

                    context

                );



            section.columns.center =

                this.resolveItems(

                    section.columns.center,

                    context

                );



            section.columns.left =

                this.resolveItems(

                    section.columns.left,

                    context

                );


        }





        return section;


    }








    //--------------------------------------------------
    // Items
    //--------------------------------------------------

    static resolveItems(

        items=[],

        context={}

    ){


        return items.map(

            item =>

                this.resolveItem(

                    item,

                    context

                )

        );


    }








    //--------------------------------------------------
    // Item
    //--------------------------------------------------

    static resolveItem(

        item,

        context

    ){



        if(!item.binding){


            return item;


        }





        if(

            item.binding.source !== "context"

        ){


            return item;


        }




        const value =

            context[
                item.binding.field
                ];





        return {


            ...item,


            value:

                value?.value

                ??

                value

                ??

                "",



            label:

                value?.label

                ??

                ""


        };


    }








    //--------------------------------------------------
    // Footer
    //--------------------------------------------------

    static resolveFooter(

        footer,

        context={}

    ){


        if(!footer){

            return null;

        }



        footer.rows =

            this.resolveItems(

                footer.rows,

                context

            );



        return footer;


    }








    //--------------------------------------------------
    // Generic
    //--------------------------------------------------

    static resolve(

        binding,

        context={}

    ){


        if(!binding){

            return "";

        }



        if(binding.source==="context"){


            const value =

                context[
                    binding.field
                    ];



            return (

                value?.value

                ??

                value

                ??

                ""

            );


        }




        return "";


    }



}