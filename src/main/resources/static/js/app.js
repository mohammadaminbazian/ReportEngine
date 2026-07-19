//--------------------------------------------------
// Report Loader
//--------------------------------------------------

async function start() {

    try {

        console.log("Report :", reportName);

        //--------------------------------------------------
        // Load Report Definition
        //--------------------------------------------------

        const reportModule =
            await import(
                `/report/reports/${reportName}Report.js`
                );

        const reportDefinition =
            reportModule.default;

        console.log(reportDefinition);



        //--------------------------------------------------
        // Load Generated Data
        //--------------------------------------------------

        const dataModule =
            await import(
                `/report/datas/${reportName}.js?ts=${Date.now()}`
                );

        const reportData =
            dataModule.default;

        console.log(reportData);



        //--------------------------------------------------
        // Load Engine
        //--------------------------------------------------

        const engineModule =
            await import(
                "/report/engine/ReportEngine.js"
                );

        const engine =
            new engineModule.ReportEngine();



        //--------------------------------------------------
        // Render
        //--------------------------------------------------

        engine.renderTo(

            "report-root",

            reportDefinition,

            reportData

        );



        //--------------------------------------------------
        // Hide Loading
        //--------------------------------------------------

        document
            .getElementById("loading")
            .style.display = "none";

    }
    catch (e) {

        console.error(e);

        document
            .getElementById("loading")
            .innerHTML =
            e.message;

    }

}

start();