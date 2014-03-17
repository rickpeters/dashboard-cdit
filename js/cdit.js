function polarchart(id, series_data, series_color) {

	$('#' + id).highcharts({
		series: [{
			type: 'column',
			name: id,
			color: series_color,
			data: series_data
		}],

		chart: {
			polar: true,
			type: 'column'
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
		type: 'column'
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