var globalseries = {};
//var PDOKAgileSeries = {};
//var PDOKCDSeries = {};
//var BRKBAGAgileSeries = {};
//var BRKBAGCDSeries = {};

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
		column: {
                	grouping: true,
                	shadow: false
                }
	}
};

//create a nice default colourpalette
// {{placeholder_js}}
var paletcolor = ['#BCCF02', '#5BB12F', '#9B539C', '#EB65A0', '#73C5E1', '#fb7676','#6ef96e','#4e4ef8','#f9d961','#325da7', '#f68c06', '#c19e9e', '#a8c5a8'];

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
	
	//var copiedData = 'scan,ci,ad,ta,p,a$target, 10, 0, 10, 20, 0$final, 40, 50, 40, 20, 10$intermediate, 10, 20, 0, 30, 10$inital, 30, 10, 20, 10, 50';
	//var copiedData = 'scan,ci,ad,ta,p,a$target, 80, 80, 60, 80, 60$final, 70, 80, 50, 60, 50$intermediate, 40, 60, 40, 40, 20$inital, 20, 40, 10, 20, 10';
	//var lines = copiedData.split('$');
    //var projectId = 'data';
	$.ajax({ url: '/scans/js/' + projectId + '-' + scanType + '-data.csv', 
	    		 async: false,
				 dataType: 'text',
	         	 success: function(data) {
				 
	var lines = data.split('\n');			 
	
	var curLine = 0;
	$.each(lines, function(lineNo, line) {
		var items = line.split(',');
		// skip empty, comment and wrong  lines
		if (line == '' || line.trim().slice(0,2) == '//') return true;
        
	    // header line containes categories
		if (curLine == 0) {
		    globaloptions.xAxis.categories = [];
	        $.each(items, function(itemNo, item) {
	            if (itemNo > 0) globaloptions.xAxis.categories.push(item.trim());
	        });
	    }
        
	        // the rest of the lines contain data with their name in the first 
	        // position
	    else {
	        var series = {
	           data: []
	            };
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
            
	        globalseries[series.name] = series;
			
    
	    }
			// increment real line number (ignoring comments)
		curLine++;
        
	});
    
}});
		
}

function agileChart(projectId, id, series){
	initdata(projectId, 'agile');
	// create a deep copy of globaloptions
	var options = $.extend(true, {}, globaloptions);
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
		
}

function cdChart(projectId, id, series){
	initdata(projectId, 'cd');
	// create a deep copy of globaloptions
	var options = $.extend(true, {}, globaloptions);
	var localseries = [];

	// loop over globalseries and add them to the local series
	$.each(series, function(serieNo, serie) {
		localseries.push(serie);
	});
	
	options.series = localseries;
	options.title.text = "Continuous Delivery";
	options.title.align = "center";
	options.legend.enabled = true;
	$('#' + projectId + '-' + id).highcharts(options);
		
}