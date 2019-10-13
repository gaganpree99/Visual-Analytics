/* Variables to read CSV File */
var textFromFileLoaded = ""
var titles = ""
var targetAttribute = ""
var inputAttributes = ""
var colorScheme = null;
var csvData = ""
var selectedColumns
var selectedColumnsName = []

/* check if a new file is selected */
$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

/* by default read iris.csv */
d3.csv('iris.csv', function (error, data) {
    if (error) throw (error);
    csvData = data;
    parser();
});

/* function to upload a new csv file */
function loadFileAsText() {
    if (document.getElementById('fileToLoad').value == "") {
        alert("Please Select a File to upload.");
        return;
    }
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    console.log(fileToLoad);

    cleanAll();
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        textFromFileLoaded = fileLoadedEvent.target.result;
        $('#opacity').val(100);

        csvData = d3.csvParse(textFromFileLoaded);
        parser();


    };
    fileReader.readAsText(fileToLoad, "UTF-8");

}

/* Parsing of CSV data */
function parser() {
    titles = csvData.columns;
    inputAttributes = titles.slice(0, titles.length - 1)
    targetAttribute = titles[titles.length - 1];

    // console.log(titles, inputAttributes, targetAttribute)
    createCheckBoxes();
    getColumns();
}

/* Dynamically create checkboxes */
function createCheckBoxes() {
    document.getElementById('append').innerHTML = "";
    var divTag = document.createElement("div");
    divTag.className = "filterCheckBoxes";

    for (var i = 0; i < inputAttributes.length; i++) {
        var div = document.createElement("div");
        // divTag.id = "filterCheckBoxes";

        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.id = inputAttributes[i];
        cb.checked = true;
        cb.value = inputAttributes[i];
        //cb.style = "margin:2%";
        cb.onchange = function () {
            getColumns();
        };

        document.getElementById("append").appendChild(divTag);
        div.append(cb)
        divTag.appendChild(div);
        div.appendChild(document.createTextNode(inputAttributes[i]));
    }
    selectedColumns = $("input:checked").length;

}

/* determine the checked checkboxes */
function getColumns() {
    // console.log(checkbox.id);
    // console.log($('#append').children());
    selectedColumns = $("input:checked")
    selectedColumnsName = [];
    for (let index = 0; index < selectedColumns.length; index++) {
        selectedColumnsName.push(selectedColumns[index].id);
        // console.log(selectedColumns[index].id)
    }
    $('.radviz-title').siblings().remove()
    createGraph();
    // console.log(selectedColumnsName)
}

/* Start plotting the RadViz from here */
function createGraph() {

    const IDtable = document.querySelector('#data-table');//the container of table
    const IDradviz = document.querySelector('#radviz');//the container of radviz
    const colorScheme = function (d) { return d[targetAttribute]; };//dimension used for coloring
    // console.log(colorScheme)
    const dimensions = selectedColumnsName//dimensions used for RadViz.
    const dimensionAnchor = Array.apply(null, { length: dimensions.length }).map(Number.call, Number).map(x => x * 2 * Math.PI / (dimensions.length)); // intial dataAnchor configration;


    plotRadViz()
        .DOMRadViz(IDradviz)
        .titles(titles)
        .colorScheme(colorScheme)
        .Dimensionality(dimensions)
        .dataAnchornchor(dimensionAnchor)
        .dataAnchorTA(csvData)
        .call();

}

/* Reset RadViz */
document.getElementById('resetRadViz').onclick = function () { resetRadViz() };
function resetRadViz() {
    $('input[type=checkbox]').prop('checked', true);
    $('#opacity').val(100);
    getColumns();
}
