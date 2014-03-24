var globalseries = {};

var globaloptions = {
	series: [],

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
	title: {
	// 	text: id
	},

	pane: {
		size: '85%'
	},

	legend: {
		reversed: false,
		enabled: false,
		align: 'right',
		verticalAlign: 'top',
		y: 100,
		layout: 'vertical'
	},

	xAxis: {
		tickmarkPlacement: 'between',
		//categories: ['Build', 'Test', 'Delivery', 'Pipeline', 'XaaS']
		categories: []
	},

	yAxis: {
		min: 0,
		max: 100,
		endOnTick: false,
		showLastLabel: false,
		title: {
			text: 'score (%)'
		},
		labels: {
			formatter: function() {
				return this.value + '%';
			}
		}
	},

	tooltip: {
		valueSuffix: '%',
		followPointer: true
	},

	plotOptions: {
		series: {
			stacking: null,
			shadow: false,
			groupPadding: 0,
			pointPlacement: 'on'
		}
	}
};

//create a nice default colourpalette
var paletcolor = ['#fb7676','#6ef96e','#4e4ef8','#f9d961','#878787'];

function polarchart(parseries) {

	// create a deep copy of globaloptions
	var options = $.extend(true, {}, globaloptions);
	
	// add series to options
	options.series.push(parseries);

	options.title.text = parseries.name;	
	
	$('#' + parseries.name).highcharts(options);

	return;
}

function initdata(){
	
		$.ajax({ url: '/js/data.csv', 
	    		 async: false,
				 dataType: 'text',
	         	 success: function(data) {
			
		//$.get('js/data.csv', function(data) {
	    // Split the lines
	    var lines = data.split('\n');
    
	    // Iterate over the lines and add categories or series
	    $.each(lines, function(lineNo, line) {
			
	        var items = line.split(',');
			// skip empty, comment and wrong  lines
			if (line == '' || line.trim().slice(0,2) == '//') return true;
        
	        // header line containes categories
	        if (lineNo == 0) {
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
						series.color = paletcolor[lineNo - 1];
						series.fillcolor = series.color;
	                } else {
	                    series.data.push(parseFloat(item));
	                }
	            });
            
	            globalseries[series.name] = series;
    
	        }
        
	    });
    
	}});	
}

function projectchart(id, series){

	// create a deep copy of globaloptions
	var options = $.extend(true, {}, globaloptions);
	
	var localseries = [];

	// loop over globalseries and add them to the local series
	$.each(series, function(serieNo, serie) {
		localseries.push(serie);
	});
	
	options.series = localseries;
	options.title.text = "CDIT Maturity Scan Overview";
	options.legend.enabled = true;
	
	$('#' + id).highcharts(options);
		
}