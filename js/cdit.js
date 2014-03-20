function polarchart(id, series_data, series_color) {

	$('#' + id).highcharts({
		series: [{
			//type: 'line',
			name: id,
			color: series_color,
			fillcolor: 'FF00FF',
			data: series_data
		}],

		chart: {
			polar: true,
			// type: 'line'
			type: 'column',
			// type: 'area'
			backgroundColor:'transparent'
		},

		credits: {
			enabled: false
		},
		title: {
			text: id
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
			categories: ['Build', 'Test', 'Delivery', 'Pipeline', 'XaaS']
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
	});


	return;
}

var options = {
    chart: {
        renderTo: 'container',
        defaultSeriesType: 'column'
    },
    title: {
        text: 'Fruit Consumption'
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: 'Units'
        }
    },
    series: []
};

function initdata(){
	$.get('data.csv', function(data) {
	    // Split the lines
	    var lines = data.split('\n');
    
	    // Iterate over the lines and add categories or series
	    $.each(lines, function(lineNo, line) {
	        var items = line.split(',');
        
	        // header line containes categories
	        if (lineNo == 0) {
	            $.each(items, function(itemNo, item) {
	                if (itemNo > 0) options.xAxis.categories.push(item);
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
	                } else {
	                    series.data.push(parseFloat(item));
	                }
	            });
            
	            options.series.push(series);
    
	        }
        
	    });
    
	    // Create the chart
	    var chart = new Highcharts.Chart(options);
	});	
}

function projectchart(id){
	
	$('#' + id).highcharts({
    series: [{
        type: 'column',
        name: 'klic',
		color: '#00FF00',
		// ['Build', 'Test', 'Delivery', 'Pipeline', 'XaaS']
		data: [ 100, 74, 35, 20, 60 ]
    	},
		{
        type: 'column',
        name: 'bgt',
		color: '#9944CC',
		data: [ 93, 87, 80, 30, 100 ]
		},
		{
        type: 'column',
        name: 'lvwoz',
		color: '#2200FF',
		data: [ 75, 33, 0, 0, 50 ]
		}
	],

	chart: {
		polar: true,
		type: 'column',
		//backgroundColor:'rgba(255, 255, 255, 0.1)'
		backgroundColor:'transparent'
	},

    credits: {
        enabled: false
    },
	title: {
		text: "CDIT Maturity Scan Overview"
	},

	pane: {
		size: '85%'
	},

	legend: {
		reversed: false,
		enabled: true, 
		align: 'right',
		verticalAlign: 'top',
		y: 100,
		layout: 'vertical'
	},

	xAxis: {
		tickmarkPlacement: 'between',
		categories: ['Build', 'Test', 'Delivery', 'Pipeline', 'XaaS']
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
			formatter: function () {
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
	});	
}