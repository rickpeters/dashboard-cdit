
var scanData = {};
var scanPresentation = {};
var teamChartFiles = {};
var teamTableFiles = {};
var chartSlideTempl = '<div data-slidr=\"PROJECT_ID\" style=\"border-style: ridge; border-width: 2px; border-color: #e1e1e1; border-radius: 10px 10px 10px 10px; box-shadow: 3px 3px 3px 3px #5E5E5E;\"><div style=\"padding: 10px; text-align: center;\"><h2>PROJECT_ID</h2></div><div id=\"PROJECT_ID-agile\" style=\"float: left; width: 410px; height: 450px; margin: 0 auto\"></div><div id=\"PROJECT_ID-continuous-delivery\" style=\"float: left; width: 450px; height: 450px; margin: 0 auto\"></div></div>';
var tableSlideTempl = '<div data-slidr=\"PROJECT_ID-T\" style=\"border-style: ridge; border-width: 2px; border-color: #e1e1e1; border-radius: 10px 10px 10px 10px; box-shadow: 3px 3px 3px 3px #5E5E5E; width: 860px;\"><div style=\"padding: 10px; text-align: center;\"><h2>PROJECT_ID</h2></div><div id=\"PROJECT_ID-agile-TH\" style=\"float: left; text-align: center; width: 400px; height: 40px; margin: auto;\"><h4>Agile</h4></div><div id=\"PROJECT_ID-cd-TH\" style=\"float: left; text-align: center; width: 400px; height: 40px; margin: auto;\"><h4>Continuous Delivery</h4></div><div id=\"PROJECT_ID-agile-T\" style=\"float: left; width: 400px; height: 410px; margin: auto;\"></div><div id=\"PROJECT_ID-cd-T\" style=\"float: left; width: 400px; height: 410px; margin: auto;\"></div></div>';
var projectSlideTempl = '<div id=\"PROJECT_ID-project\" style=\"hidden: true;\"><div style=\"padding: 2px; width: 100%; text-align: center;\"><h3>PROJECT_ID</h3></div><div id=\"PROJECT_ID-project-agile\" style=\"float: left; width: 50%; height: 330px; margin: 0 auto\"></div><div id=\"PROJECT_ID-t-project-agile" style=\"float: left; padding-top: 50px; width: 50%; height: 330px; margin: 0 auto\"></div><div id=\"PROJECT_ID-project-continuous-delivery\" style=\"float: left; width: 50%; height: 330px; border-bottom: solid #781E87; margin: 0 auto\"></div><div id=\"PROJECT_ID-t-project-continuous-delivery\" style=\"float: left; width: 50%; padding-top: 50px; height: 330px; border-bottom: solid #781E87; margin: 0 auto\"></div></div><div style=\"float: no-float;\" />';
var globaloptions = {
	series: [],
	
	title: {
		text: 'Continuous Delivery',
		verticalAlign: 'top'
    },
	
	chart: {
		polar: true,
		// type: 'line',
		type: 'column',
		// type: 'area',
		backgroundColor:'transparent'
	},

	credits: {
		enabled: false
	},
	

	pane: {
		size: '70%'
	},

	legend: {
		reversed: false,
		enabled: false,
		align: 'center',
		verticalAlign: 'bottom',
		layout: 'horizontal'
	},

	xAxis: {
		tickmarkPlacement: 'between',
		//categories: ['continuous integration', 'automated deployment', 'test automation', 'provisioning', 'architecture']
		categories: []
	},

	yAxis: {
		min: 0,
		max: 100,
		tickInterval: 20,
		endOnTick: false,
		showLastLabel: false,
		//title: {
		//	text: 'score (%)'
		//},
		labels: {
			enabled: true,
			style: {
				color: '#FFFFFF'
			},
			//step: 20,
			formatter: function() {
				return this.value + '%';
			}
		}
	},

	tooltip: {
		valueSuffix: '%',
		followPointer: true
	},
	
	navigation: {
	    buttonOptions: {
	        enabled: false
	        }
	},

	plotOptions: {
		series: {
			stacking: null, //'normal', //'normal', //null, normal, percent
			shadow: false,
			groupPadding: 0,
			pointPlacement: 'on',
			dataLabels: {
				enabled: false,
				color: '#FFFFFF'
			}
		},
		area: { fillOpacity:  0.5},
		column: {
                	grouping: true,
                	shadow: false
                }
	}
};

//create a nice default colourpalette
// {{placeholder_js}}
var paletcolor = ['#BCCF02', '#5BB12F', '#9B539C', '#EB65A0', '#73C5E1', '#fb7676','#6ef96e','#4e4ef8','#f9d961','#325da7', '#f68c06', '#c19e9e', '#a8c5a8'];


function getTeamIds(){
	$.ajax({url: "/data", async: false, success: function(data){
			$(data).find("a:contains(.csv)").each(function(){
				fName = $(this).attr("href")
				if (fName.indexOf("-agile-data.csv") > -1){
					var pId = fName.split("-agile-data.csv")[0];
					var teamFile = {filename: fName, projectId: pId, scanType: 'agile'};
					teamChartFiles[pId] = teamFile;
				} else if (fName.indexOf("-cd-data.csv") > -1){
					var pId = fName.split("-cd-data.csv")[0];
					var teamFile = {filename: fName, projectId: pId, scanType: 'cd'};
					teamChartFiles[pId] = teamFile;
				} else if (fName.indexOf("-agilet-data.csv") > -1){
					var pId = fName.split("-agilet-data.csv")[0];
					var teamFile = {filename: fName, projectId: pId, scanType: 'agile'};
					teamTableFiles[pId] = teamFile;
				} else if (fName.indexOf("-cdt-data.csv") > -1){
					var pId = fName.split("-cdt-data.csv")[0];
					var teamFile = {filename: fName, projectId: pId, scanType: 'cd'};
					teamTableFiles[pId] = teamFile;
				}
			});
		}
	});
}

function writeChartSlides(){
	var sliderHtmlContainer = document.getElementById("slidr-home-demo");
	var slidesHtml = sliderHtmlContainer.innerHTML;
	for (var p in teamChartFiles) {
		var slideHtml = chartSlideTempl.valueOf();
		slideHtml = slideHtml.replace(/PROJECT_ID/g, teamChartFiles[p].projectId);
		slidesHtml = slidesHtml.concat(slideHtml);
	}
	sliderHtmlContainer.innerHTML = slidesHtml;
}

function writeTableSlides(){
	var sliderHtmlContainer = document.getElementById("slidr-home-demo");
	var slidesHtml = sliderHtmlContainer.innerHTML;
	for (var p in teamTableFiles) {
		var slideHtml = tableSlideTempl.valueOf();
		slideHtml = slideHtml.replace(/PROJECT_ID/g, teamTableFiles[p].projectId);
		slidesHtml = slidesHtml.concat(slideHtml);
	}
	sliderHtmlContainer.innerHTML = slidesHtml;
}

function writeProjectSlides(){
	var projectSlidesContainer = document.getElementById("project-pages");
	var projectSlidesHtml = projectSlidesContainer.innerHTML;
	for (var p in teamChartFiles) {
		var slideHtml = projectSlideTempl.valueOf();
		slideHtml = slideHtml.replace(/PROJECT_ID/g, teamChartFiles[p].projectId);
		projectSlidesHtml = projectSlidesHtml.concat(slideHtml);
	}
	projectSlidesContainer.innerHTML = projectSlidesHtml;
}

function writeMenu(){
	var menu = document.getElementById("menu-bar");
	var menuHtml = menu.innerHTML;
	for (var p in teamChartFiles) {
		
		var menuItemHtmlTempl = '<a id=\"PROJECT_ID_link\" class=\"navbar-brand\" href=\"#\">PROJECT_ID</a>';
		var menuItemHtml = menuItemHtmlTempl.valueOf();
		menuItemHtml = menuItemHtml.replace(/PROJECT_ID/g, teamChartFiles[p].projectId);
		menuHtml = menuHtml.concat(menuItemHtml);
	}
	menu.innerHTML = menuHtml;
	for (var p in teamChartFiles) {
		$('#'+ p + '_link').click(function(event){swapDisplay(event.target.id); return false; });
	}
	$('#home').click(function(event){ swapDisplay(event.target.id); return false; });

}


function setTables(){
	for (var p in teamTableFiles) {
		$('#' + teamTableFiles[p].projectId + '-agile-T').CSVToTable('data/' + teamTableFiles[p].projectId + '-agilet-data.csv');
		$('#' + teamTableFiles[p].projectId + '-t-project-agile').CSVToTable('data/' + teamTableFiles[p].projectId + '-agilet-data.csv');
		$('#' + teamTableFiles[p].projectId + '-cd-T').CSVToTable('data/' + teamTableFiles[p].projectId + '-cdt-data.csv');
		$('#' + teamTableFiles[p].projectId + '-t-project-continuous-delivery').CSVToTable('data/' + teamTableFiles[p].projectId + '-cdt-data.csv');
	}
}
//function polarchart(parseries) {

	// create a deep copy of globaloptions
//	var options = $.extend(true, {}, globaloptions);
	
	// add series to options
//	options.series.push(parseries);

//	options.title.text = parseries.name;	
	
//	$('#' + parseries.name).highcharts(options);

//	return;
//}

function initdata(projectId, scanType){
	var scanDataSeries = {};
	var scanDataPresentation = $.extend(true, {}, globaloptions);
	$.ajax({ url: '/data/' + projectId + '-' + scanType + '-data.csv', async: false, dataType: 'text', success: function(data) {
		var lines = data.split('\n');			 
		var curLine = 0;
		$.each(lines, function(lineNo, line) {
			var items = line.split(',');
			// skip empty, comment and wrong  lines
			if (line == '' || line.trim().slice(0,2) == '//') return true;
				// header line containes categories
				if (curLine == 0) {
					scanDataPresentation.xAxis.categories = [];
					$.each(items, function(itemNo, item) {
						if (itemNo > 0) scanDataPresentation.xAxis.categories.push(item.trim());
						});
					}
				else {
					var series = {data: []};
					$.each(items, function(itemNo, item) {
						if (itemNo == 0) {
							series.name = item;
							series.color = paletcolor[curLine - 1];
							series.fillcolor = series.color;
						} else {
							series.data.push(parseFloat(item));
							series.zIndex = itemNo;
							series.stack = 0;
							series.type = 'areaspline';
						}
					});
					scanDataSeries[series.name] = series;
				}
			// increment real line number (ignoring comments)
			curLine++;
		});
	}});
	scanData[projectId + '_' + scanType] = scanDataSeries;
	scanPresentation[projectId + '_' + scanType] = scanDataPresentation;
}

function agileChart(projectId, scanType, id){
	var series = scanData[projectId + '_' + scanType];
	var options = scanPresentation[projectId + '_' + scanType];
	var localseries = [];

	// loop over globalseries and add them to the local series
	$.each(series, function(serieNo, serie) {
		localseries.push(serie);
	});
	
	options.series = localseries;
	options.title.text = "Agile";
	options.title.align = "center";
	options.legend.enabled = true;
	$('#' + projectId + '-' + id).highcharts(options);
	options.title.align = "right";
	options.legend.verticalAlign = "middle";
	options.legend.align = "right";
	options.legend.layout = "vertical";
	$('#' + projectId + '-project-' + id).highcharts(options);
		
}

function cdChart(projectId, scanType, id){
	var series = scanData[projectId + '_' + scanType];
	var options = scanPresentation[projectId + '_' + scanType];
	var localseries = [];

	// loop over series and add them to the local series
	$.each(series, function(serieNo, serie) {
		localseries.push(serie);
	});
	
	options.series = localseries;
	options.title.text = "Continuous Delivery";
	options.title.align = "center";
	options.legend.enabled = true;
	$('#' + projectId + '-' + id).highcharts(options);
	options.title.align = "right";
	options.legend.verticalAlign = "middle";
	options.legend.align = "right";
	options.legend.layout = "vertical";
	$('#' + projectId + '-project-' + id).highcharts(options);
		
}

function swapDisplay(linkId){
			if (linkId != 'home'){
				linkId = linkId.split("_link")[0];
			}
			for (var p in teamChartFiles) {
				if (p == linkId){
					document.getElementById(p + '-project').style.display="block";
				} else {
					document.getElementById(p + '-project').style.display="none";
				}
			}
			if (linkId != 'home'){
				document.getElementById("slidr-home-demo").style.display="none";
				document.getElementById("project-pages").style.display="block";
			} else {
				document.getElementById("slidr-home-demo").style.display="block";
				document.getElementById("project-pages").style.display="none";
			}
		}