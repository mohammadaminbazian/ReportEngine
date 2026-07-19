async function start() {

    try {

        //--------------------------------------------------
        // دریافت داده گزارش
        //--------------------------------------------------

        const response =
            await fetch(`/api/report/${reportName}`);

        if (!response.ok) {
            throw new Error("Report API Error");
        }

        const reportData =
            await response.json();

        //--------------------------------------------------
        // بارگذاری Definition گزارش
        //--------------------------------------------------

        const reportModule =
            await import(`/report/reports/${reportName}.js`);

        const definition =
            reportModule.default;

        //--------------------------------------------------
        // بارگذاری ReportEngine
        //--------------------------------------------------

        const engineModule =
            await import("/report/engine/ReportEngine.js");

        const engine =
            new engineModule.ReportEngine();

        //--------------------------------------------------
        // نمایش گزارش
        //--------------------------------------------------

        engine.render(
            definition,
            reportData,
            document.getElementById("report-root")
        );

        document
            .getElementById("loading")
            .style.display = "none";

    }
    catch (e) {

        console.error(e);

    }

}

start();