$( document ).ready(function() {
	$("#convertCSV").click(function() {
		var csvData = $("#csvData").val();
		var jsonData = CSVToJSON(csvData);
		$("#jsonData").val(jsonData);
	});
});

function CSVToJSON(csvData) {
    var data = CSVToArray(csvData);
    var objData = [];
    for (var i = 1; i < data.length; i++) {
        objData[i - 1] = {};
        for (var k = 0; k < data[0].length && k < data[i].length; k++) {
            var key = data[0][k];
            objData[i - 1][key] = data[i][k]
        }
    }
    var jsonData = JSON.stringify(objData);
    jsonData = jsonData.replace(/},/g, "},\r\n");
    return jsonData;
}

function CSVToArray(csvData, delimiter) {
    delimiter = (delimiter || ",");
     var pattern = new RegExp((
    "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    "([^\"\\" + delimiter + "\\r\\n]*))"), "gi");
    var data = [[]];
    var matches = null;
    while (matches = pattern.exec(csvData)) {
        var matchedDelimiter = matches[1];
        if (matchedDelimiter.length && (matchedDelimiter != delimiter)) {
            data.push([]);
        }
        if (matches[2]) {
            var matchedDelimiter = matches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            var matchedDelimiter = matches[3];
        }
        data[data.length - 1].push(matchedDelimiter);
    }
    return (data);
}