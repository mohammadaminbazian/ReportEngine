/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : HtmlRenderer.js
 * Version   : 5.2.0
 *
 * Description :
 *      Converts RuntimeReport + Page model to HTML.
 *
 * Responsibilities:
 *      ✔ Header
 *      ✔ Footer
 *      ✔ Table
 *      ✔ Elements
 *
 * No Layout Calculation
 * No Pagination
 *
 * Compatible with:
 *      RuntimeReport 5.x
 *      PaginationManager 6.x
 *
 * ------------------------------------------------------------
 */


import { BindingResolver }
    from "../resolver/BindingResolver.js";



export class HtmlRenderer {



    constructor(){


        this.bindingResolver =
            new BindingResolver();


    }






    //--------------------------------------------------
    // Render
    //--------------------------------------------------

    render(

        runtimeReport,

        pages,

        context = {}

    ){


        return pages

            .map(page =>

                this.renderPage(

                    runtimeReport,

                    page,

                    context

                )

            )

            .join("");

    }







    //--------------------------------------------------
    // Page
    //--------------------------------------------------

    renderPage(

        runtimeReport,

        page,

        context

    ){


        return `

<section
class="report-page"
data-page="${page.number}">


${this.renderHeader(

            context.header,

            context

        )}



${this.renderTable(

            runtimeReport.table,

            page,

            context

        )}



${this.renderFooter(

            runtimeReport.footer,

            context.footer,

            page,

            context

        )}



</section>

`;

    }







    //--------------------------------------------------
    // Header
    //--------------------------------------------------

    renderHeader(

        header,

        context

    ){


        if(!header){

            return "";

        }



        return `

<header
class="report-header"
style="${this.renderBoxStyle(header)}">


${(header.sections ?? [])

            .map(section =>

                this.renderHeaderSection(

                    section,

                    context

                )

            )

            .join("")}


</header>

`;

    }








    //--------------------------------------------------
    // Header Section
    //--------------------------------------------------

    renderHeaderSection(

        section,

        context

    ){


        if(!section){

            return "";

        }




        //------------------------------------------
        // Three Column
        //------------------------------------------

        if(section.layout === "three-column"){



            return `

<div
class="header-section header-three-column"
style="${this.renderBoxStyle(section)}">



<div class="header-column header-right">

${(section.columns?.right ?? [])

                .map(item =>

                    this.renderElement(

                        item,

                        context

                    )

                )

                .join("")}

</div>




<div class="header-column header-center">

${(section.columns?.center ?? [])

                .map(item =>

                    this.renderElement(

                        item,

                        context

                    )

                )

                .join("")}

</div>




<div class="header-column header-left">

${(section.columns?.left ?? [])

                .map(item =>

                    this.renderElement(

                        item,

                        context

                    )

                )

                .join("")}

</div>



</div>

`;

        }







        //------------------------------------------
        // Full Width
        //------------------------------------------

        return `

<div
class="header-section"
style="${this.renderBoxStyle(section)}">


${(section.items ?? [])

            .map(item =>

                this.renderElement(

                    item,

                    context

                )

            )

            .join("")}



</div>

`;

    }









    //--------------------------------------------------
    // Footer
    //--------------------------------------------------

    renderFooter(

        footerDefinition,

        footer,

        page,

        context

    ){



        if(!footerDefinition || !footer){

            return "";

        }





        if(

            typeof footerDefinition.shouldRender === "function"

            &&

            !footerDefinition.shouldRender(

                page.number,

                page.totalPages

            )

        ){

            return "";

        }





        const footerContext = {


            ...context,


            pageNumber:
            page.number,


            totalPages:
            page.totalPages


        };





        return `

<footer
class="report-footer"
style="${this.renderBoxStyle(footer)}">


${(footer.rows ?? [])

            .map(item =>

                this.renderElement(

                    item,

                    footerContext

                )

            )

            .join("")}


</footer>

`;

    }









    //--------------------------------------------------
    // Table
    //--------------------------------------------------

    renderTable(

        tableDefinition,

        page,

        context

    ){



        if(!tableDefinition){

            return "";

        }





        return `

<table
class="report-table">



${

            tableDefinition.showHeader

            &&

            page.tableHeader


                ?

                this.renderTableHeader(

                    tableDefinition

                )


                :

                ""

        }




<tbody>


${page.rows

            .map(row =>

                this.renderRow(

                    tableDefinition,

                    row.data,

                    context

                )

            )

            .join("")}



</tbody>



</table>

`;

    }









    //--------------------------------------------------
    // Table Header
    //--------------------------------------------------

    renderTableHeader(

        tableDefinition

    ){


        return `

<thead>

<tr>


${tableDefinition.visibleColumns

            .map(column =>


                `

<th

style="
width:${column.width}mm;
text-align:${column.thAlign ?? "center"};
">

${column.title}

</th>

`


            )

            .join("")}



</tr>

</thead>

`;

    }









    //--------------------------------------------------
    // Table Row
    //--------------------------------------------------

    renderRow(

        tableDefinition,

        row,

        context

    ){


        return `

<tr>


${tableDefinition.visibleColumns

            .map(column =>


                `

<td

style="
width:${column.width}mm;
text-align:${column.tdAlign ?? "right"};
">

${this.resolveValue(

                    column,

                    row,

                    context

                )}

</td>

`


            )

            .join("")}



</tr>

`;

    }
    //--------------------------------------------------
    // Element
    //--------------------------------------------------

    renderElement(

        element,

        context

    ){


        if(!element){

            return "";

        }



        switch(element.type){


            case "text":

                return this.renderText(

                    element,

                    context

                );



            case "title":

                return this.renderTitle(

                    element

                );



            case "logo":

            case "image":

                return this.renderImage(

                    element

                );



            case "pageNumber":

                return this.renderPageNumber(

                    context

                );



            case "signature":

                return this.renderSignature(

                    element,

                    context

                );



            case "line":

                return "<hr class='report-line'>";



            case "html":

                return element.html ?? "";



            default:

                return this.renderText(

                    element,

                    context

                );

        }


    }









    //--------------------------------------------------
    // Text
    //--------------------------------------------------

    renderText(

        element,

        context

    ){


        const value =

            this.resolveBinding(

                element,

                context

            );





        return `

<div

class="report-text"

style="${this.renderElementStyle(element)}">

${value}

</div>

`;

    }









    //--------------------------------------------------
    // Title
    //--------------------------------------------------

    renderTitle(

        element

    ){


        return `

<div

class="report-title"

style="${this.renderElementStyle(element)}">

${element.value ?? ""}

</div>

`;

    }









    //--------------------------------------------------
    // Image
    //--------------------------------------------------

    renderImage(

        element

    ){


        return `

<img

class="report-image"

src="${element.src}"

style="
width:${element.width ?? 15}mm;
height:${element.height ?? 15}mm;
object-fit:${element.fit ?? "contain"};
"

/>

`;

    }









    //--------------------------------------------------
    // Page Number
    //--------------------------------------------------

    renderPageNumber(

        context

    ){


        return `

<div class="report-page-number">

صفحه

${context.pageNumber}

از

${context.totalPages}

</div>

`;

    }









    //--------------------------------------------------
    // Signature
    //--------------------------------------------------

    renderSignature(

        element,

        context

    ){


        const value =

            this.resolveBinding(

                element,

                context

            );





        return `

<div

class="report-signature"

style="${this.renderElementStyle(element)}">

${value}

</div>

`;

    }









    //--------------------------------------------------
    // Binding
    //--------------------------------------------------

    resolveBinding(

        element,

        context

    ){



        if(!element.binding){


            return (

                element.value

                ??

                element.text

                ??

                ""

            );

        }





        return BindingResolver.resolve(

            element.binding,

            context

        );


    }









    //--------------------------------------------------
    // Cell Value
    //--------------------------------------------------

    resolveValue(

        column,

        row,

        context

    ){



        if(column.binding){


            return BindingResolver.resolve(

                column.binding,

                {

                    ...context,

                    row

                }

            );


        }





        return row[column.field] ?? "";


    }









    //--------------------------------------------------
    // Box Style
    //--------------------------------------------------

    renderBoxStyle(

        box = {}

    ){


        const style = [];





        if(box.width != null){


            style.push(

                `width:${box.width}mm`

            );

        }





        if(box.height != null){


            style.push(

                `height:${box.height}mm`

            );

        }







        if(box.padding){


            style.push(`

padding:
${box.padding.top ?? 0}mm
${box.padding.right ?? 0}mm
${box.padding.bottom ?? 0}mm
${box.padding.left ?? 0}mm

`.replace(/\s+/g," "));


        }







        if(box.margin){


            style.push(`

margin:
${box.margin.top ?? 0}mm
${box.margin.right ?? 0}mm
${box.margin.bottom ?? 0}mm
${box.margin.left ?? 0}mm

`.replace(/\s+/g," "));


        }







        if(box.background){


            style.push(

                `background:${box.background}`

            );


        }







        if(box.border){


            style.push(

                `border:${box.border}`

            );


        }






        return style.join(";");


    }









    //--------------------------------------------------
    // Element Style
    //--------------------------------------------------

    renderElementStyle(

        element = {}

    ){


        const style=[];







        if(element.align){


            style.push(

                `text-align:${element.align}`

            );


        }







        if(element.fontFamily){


            style.push(

                `font-family:${element.fontFamily}`

            );


        }







        if(element.fontSize){


            style.push(

                `font-size:${element.fontSize}pt`

            );


        }







        if(element.fontWeight){


            style.push(

                `font-weight:${element.fontWeight}`

            );


        }







        if(element.color){


            style.push(

                `color:${element.color}`

            );


        }







        if(element.width){


            style.push(

                `width:${element.width}mm`

            );


        }







        if(element.height){


            style.push(

                `height:${element.height}mm`

            );


        }







        if(element.padding){


            style.push(`

padding:
${element.padding.top ?? 0}mm
${element.padding.right ?? 0}mm
${element.padding.bottom ?? 0}mm
${element.padding.left ?? 0}mm

`.replace(/\s+/g," "));


        }







        if(element.margin){


            style.push(`

margin:
${element.margin.top ?? 0}mm
${element.margin.right ?? 0}mm
${element.margin.bottom ?? 0}mm
${element.margin.left ?? 0}mm

`.replace(/\s+/g," "));


        }







        if(element.display){


            style.push(

                `display:${element.display}`

            );


        }







        if(element.flex){


            style.push(

                `flex:${element.flex}`

            );


        }






        return style.join(";");


    }



}