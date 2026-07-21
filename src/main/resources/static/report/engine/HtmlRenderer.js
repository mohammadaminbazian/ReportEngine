/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : HtmlRenderer.js
 * Version   : 6.0.0
 *
 * Description :
 *      Converts RuntimeReport to HTML.
 *
 * Responsibilities
 *      ✔ Render Header
 *      ✔ Render Footer
 *      ✔ Render Table
 *      ✔ Render Elements
 *
 * No Layout Calculation
 * No Pagination
 *
 * ------------------------------------------------------------
 */

export class HtmlRenderer {

    //--------------------------------------------------
    // Constructor
    //--------------------------------------------------

    constructor(){}

    //--------------------------------------------------
    // Render
    //--------------------------------------------------

    render(runtimeReport, pages){
        console.log("",runtimeReport.measure);
        return pages
            .map(page =>

                this.renderPage(

                    runtimeReport,

                    page

                )

            )
            .join("");

    }

    //--------------------------------------------------
    // Page
    //--------------------------------------------------

    renderPage(runtimeReport, page){

        const context={

            ...runtimeReport.context,

            pageNumber:page.number,

            totalPages:page.totalPages,

            measure:runtimeReport.measure

        };

        return `

<section
class="report-page"
data-page="${page.number}"
style="
position:relative;
width:${runtimeReport.layout.pageWidth}mm;
height:${runtimeReport.layout.pageHeight}mm;
overflow:hidden;
box-sizing:border-box;

font-family:${runtimeReport.measure.font};
font-size:${runtimeReport.measure.fontSize}pt;
line-height:${runtimeReport.measure.lineHeight}mm;
">

${this.renderHeader(

            runtimeReport,

            runtimeReport.header,

            context

        )}

${this.renderTable(

            runtimeReport,

            runtimeReport.table,

            page,

            context

        )}

${this.renderFooter(

            runtimeReport,

            runtimeReport.footer,

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

        runtimeReport,

        header,

        context

    ){

        if(!header){

            return "";

        }

        return `

<header

class="report-header"

style="

position:absolute;

left:0;

top:${runtimeReport.layout.headerTop}mm;

width:${runtimeReport.layout.printableWidth}mm;

${this.renderBoxStyle(header)}

">

${this.renderItems(

            header.sections.top,

            context

        )}

<div class="header-middle">

<div class="header-right">

${this.renderItems(

            header.sections.middle.right,

            context

        )}

</div>

<div class="header-center">

${this.renderItems(

            header.sections.middle.center,

            context

        )}

</div>

<div class="header-left">

${this.renderItems(

            header.sections.middle.left,

            context

        )}

</div>

</div>

${this.renderItems(

            header.sections.bottom,

            context

        )}

</header>

`;

    }

    //--------------------------------------------------
    // Render Items
    //--------------------------------------------------

    renderItems(

        items=[],

        context

    ){

        return items

            .map(item=>

                this.renderElement(

                    item,

                    context

                )

            )

            .join("");

    }
    //--------------------------------------------------
    // Footer
    //--------------------------------------------------

    renderFooter(

        runtimeReport,

        footer,

        page,

        context

    ){

        if(!footer){

            return "";

        }

        if(

            footer.lastPageOnly

            &&

            page.number !== page.totalPages

        ){

            return "";

        }

        const footerContext={

            ...context,

            pageNumber:page.number,

            totalPages:page.totalPages

        };

        return `

<footer

class="report-footer"

style="

position:absolute;

left:0;

top:${runtimeReport.layout.footerTop}mm;

width:${runtimeReport.layout.printableWidth}mm;

${this.renderBoxStyle(footer)}

">

${footer.rows

            .map(item=>

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

        runtimeReport,

        table,

        page,

        context

    ){

        if(!table){

            return "";

        }

        return `

<div

class="report-table-container"

style="

position:absolute;

left:${runtimeReport.layout.tableLeft}mm;

top:${runtimeReport.layout.bodyTop}mm;

width:${runtimeReport.layout.tableWidth}mm;

">

<table class="report-table"
style="width:100%;table-layout:fixed;border-collapse:collapse;">

${   table.showHeader   &&    page.tableHeader
   ?   this.renderTableHeader( table   )  : ""  }

<tbody>

${page.rows.map(row=>

                this.renderRow(

                    table,

                    row,

                    context

                )

            )

            .join("")}

</tbody>

</table>

</div>

`;

    }

    //--------------------------------------------------
    // Table Header
    //--------------------------------------------------

    renderTableHeader(

        table

    ){

        return `

<thead>

<tr>

${table.visibleColumns

            .map(column=>`

<th style="width:${column.width}mm; text-align:${column.thAlign ?? "center"};">

${column.title}

</th>

`)

            .join("")}

</tr>

</thead>

`;

    }

    //--------------------------------------------------
    // Table Row
    //--------------------------------------------------

    renderRow(

        table,

        rowInfo,

        context

    ){

        const row=rowInfo.data;

        return `

<tr>

${table.visibleColumns

            .map(column=>`

<td style="text-align:${column.tdAlign ?? "right"};width:${column.width}mm;height:${rowInfo.height}mm;">

${this.resolveValue(

                column,

                row,

                context

            )}

</td>

`)

            .join("")}

</tr>

`;

    }
    //--------------------------------------------------
    // Element
    //--------------------------------------------------

    renderElement(element, context){

        if(!element){
            return "";
        }

        switch(element.type){

            case "text":
                return this.renderText(element, context);

            case "title":
                return this.renderTitle(element);

            case "logo":
            case "image":
                return this.renderImage(element);

            case "pageNumber":
                return this.renderPageNumber(context);

            case "signature":
                return this.renderSignature(element, context);

            case "line":
                return "<hr class='report-line'>";

            case "html":
                return element.html ?? "";

            default:
                return this.renderText(element, context);

        }

    }


    //--------------------------------------------------
    // Text
    //--------------------------------------------------

    renderText(element, context){

        return `

<div
class="report-text"
style="${this.renderElementStyle(element)}">

${this.resolveBinding(element, context)}

</div>

`;

    }


    //--------------------------------------------------
    // Title
    //--------------------------------------------------

    renderTitle(element){

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

    renderImage(element){

        return `

<img class="report-image" src="${element.src}" style="
width:${element.width ?? 15}mm;
height:${element.height ?? 15}mm;
object-fit:${element.fit ?? "contain"};
"/>`;

    }


    //--------------------------------------------------
    // Page Number
    //--------------------------------------------------

    renderPageNumber(context){

        return `

<div class="report-page-number">

صفحه ${context.pageNumber}

از ${context.totalPages}

</div>

`;

    }


    //--------------------------------------------------
    // Signature
    //--------------------------------------------------

    renderSignature(element, context){

        return `

<div
class="report-signature"
style="${this.renderElementStyle(element)}">

${this.resolveBinding(element, context)}

</div>

`;

    }


    //--------------------------------------------------
    // Binding
    //--------------------------------------------------

    resolveBinding(element){

        if(element.value !== undefined){

            if(
                element.binding?.showLabel &&
                element.label
            ){
                return `${element.label} : ${element.value}`;
            }

            return element.value;
        }

        return (
            element.text ??
            ""
        );

    }


    //--------------------------------------------------
    // Cell Value
    //--------------------------------------------------

    resolveValue(column, row){

        return row[column.field] ?? "";

    }


    //--------------------------------------------------
    // Box Style
    //--------------------------------------------------

    renderBoxStyle(box = {}){

        const style = [];

        if(box.width != null){
            style.push(`width:${box.width}mm`);
        }

        if(box.height != null){
            style.push(`height:${box.height}mm`);
        }

        if(box.padding){

            style.push(

                `padding:
${box.padding.top ?? 0}mm
${box.padding.right ?? 0}mm
${box.padding.bottom ?? 0}mm
${box.padding.left ?? 0}mm`

                    .replace(/\s+/g," ")

            );

        }

        if(box.margin){

            style.push(

                `margin:
${box.margin.top ?? 0}mm
${box.margin.right ?? 0}mm
${box.margin.bottom ?? 0}mm
${box.margin.left ?? 0}mm`

                    .replace(/\s+/g," ")

            );

        }

        if(box.background){
            style.push(`background:${box.background}`);
        }

        if(box.border){
            style.push(`border:${box.border}`);
        }

        return style.join(";");

    }


    //--------------------------------------------------
    // Element Style
    //--------------------------------------------------

    renderElementStyle(element = {}){

        const style = [];

        if(element.align){
            style.push(`text-align:${element.align}`);
        }

        if(element.fontFamily){
            style.push(`font-family:${element.fontFamily}`);
        }

        if(element.fontSize){
            style.push(`font-size:${element.fontSize}pt`);
        }

        if(element.fontWeight){
            style.push(`font-weight:${element.fontWeight}`);
        }

        if(element.color){
            style.push(`color:${element.color}`);
        }

        if(element.width){
            style.push(`width:${element.width}mm`);
        }

        if(element.height){
            style.push(`height:${element.height}mm`);
        }

        if(element.padding){

            style.push(

                `padding:
${element.padding.top ?? 0}mm
${element.padding.right ?? 0}mm
${element.padding.bottom ?? 0}mm
${element.padding.left ?? 0}mm`

                    .replace(/\s+/g," ")

            );

        }

        if(element.margin){

            style.push(

                `margin:
${element.margin.top ?? 0}mm
${element.margin.right ?? 0}mm
${element.margin.bottom ?? 0}mm
${element.margin.left ?? 0}mm`

                    .replace(/\s+/g," ")

            );

        }

        if(element.display){
            style.push(`display:${element.display}`);
        }

        if(element.flex){
            style.push(`flex:${element.flex}`);
        }

        return style.join(";");

    }

}