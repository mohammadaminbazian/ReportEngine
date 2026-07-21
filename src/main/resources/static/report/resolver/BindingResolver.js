/*!
 * ------------------------------------------------------------
 * Report Engine
 * File      : BindingResolver.js
 * Version   : 6.0.0
 *
 * Description:
 *      Resolves Header / Footer bindings.
 *
 * Responsibilities:
 *      ✔ No Mutation
 *      ✔ Returns Runtime objects
 *      ✔ Supports V6 Contract
 *
 * ------------------------------------------------------------
 */

export class BindingResolver {

    //--------------------------------------------------
    // Header
    //--------------------------------------------------

    static resolveHeader(header, context = {}) {

        if (!header) {
            return null;
        }

        return {
            repeat: header.repeat,
            height: header.height,
            margin: { ...header.margin },
            padding: { ...header.padding },

            sections: {

                top: this.resolveItems(
                    header.sections?.top,
                    context
                ),

                middle: {

                    right: this.resolveItems(
                        header.sections?.middle?.right,
                        context
                    ),

                    center: this.resolveItems(
                        header.sections?.middle?.center,
                        context
                    ),

                    left: this.resolveItems(
                        header.sections?.middle?.left,
                        context
                    )

                },

                bottom: this.resolveItems(
                    header.sections?.bottom,
                    context
                )

            }

        };

    }

    //--------------------------------------------------
    // Footer
    //--------------------------------------------------

    static resolveFooter(footer, context = {}) {

        if (!footer) {
            return null;
        }

        return {

            repeat: footer.repeat,

            lastPageOnly: footer.lastPageOnly,

            height: footer.height,

            margin: { ...footer.margin },

            padding: { ...footer.padding },

            rows: this.resolveItems(
                footer.rows,
                context
            )

        };

    }

    //--------------------------------------------------
    // Items
    //--------------------------------------------------

    static resolveItems(items = [], context = {}) {

        return items.map(item =>
            this.resolveItem(item, context)
        );

    }

    //--------------------------------------------------
    // Item
    //--------------------------------------------------

    static resolveItem(item, context = {}) {

        if (!item) {
            return null;
        }

        if (!item.binding) {
            return { ...item };
        }

        if (item.binding.source !== "context") {
            return { ...item };
        }

        const value = context[item.binding.field];

        return {

            ...item,

            label:
                value?.label ??
                item.label ??
                "",

            value:
                value?.value ??
                value ??
                ""

        };

    }

    //--------------------------------------------------
    // Generic
    //--------------------------------------------------

    static resolve(binding, context = {}) {

        if (!binding) {
            return "";
        }

        if (binding.source !== "context") {
            return "";
        }

        const value = context[binding.field];

        return (
            value?.value ??
            value ??
            ""
        );

    }

}