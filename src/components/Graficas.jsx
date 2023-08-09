import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import obtenerEnergiaFechaAPI from '../data/obtenerEnergiaFechaAPI';

export const Graficas = ({ fechaInicio, fechaFin, fechaValida, setDatosEnergiaRenHidraulica, setDatosEnergiaRenSolar }) => {
	const [graficaBarRenHidraulica, setGraficaBarRenHidraulica] = useState([]);
	const [graficaLinealRenHidraulica, setGraficaLinealRenHidraulica] = useState([]);
	const [graficaAreaRenSolar, setGraficaAreaRenSolar] = useState([]);
	const [graficaTimeSeriesRenSolar, setGraficaTimeSeriesRenSolar] = useState([]);


	useEffect(() => {
		const fetchData = async () => {
			if (fechaValida) {
				try {
					const resultado = await obtenerEnergiaFechaAPI(fechaInicio, fechaFin);
					const datosRenovableHidraulica = resultado.included[0].attributes.content[0].attributes.values;
					const datosRenovableSolar = resultado.included[0].attributes.content[2].attributes.values;
					setDatosEnergiaRenHidraulica(datosRenovableHidraulica);
					setDatosEnergiaRenSolar(datosRenovableSolar);

					// Datos gráfica barra Renovable hidraulica
					const barDataHidraulica = datosRenovableHidraulica.map((item) => ({
						x: new Date(item.datetime).getTime(),
						y: item.value,
					}));
					setGraficaBarRenHidraulica(barDataHidraulica);

					// Datos gráfica lineal Renovable hidraulica
					const lineDataHidraulica = datosRenovableHidraulica.map((item) => ({
						x: new Date(item.datetime).getTime(),
						y: item.value,
					}));
					setGraficaLinealRenHidraulica(lineDataHidraulica);

					// Datos gráfica barra Renovable hidraulica
					const areaDataSolar = datosRenovableSolar.map((item) => ({
						x: new Date(item.datetime).getTime(),
						y: item.value,
					}));
					setGraficaAreaRenSolar(areaDataSolar);

					// Datos gráfica colum and pie
					const timeSeriesDataSolar = datosRenovableSolar.map((item) => ({
						name: new Date(item.datetime).toLocaleDateString(),
						y: item.value,
					}));
					setGraficaTimeSeriesRenSolar(timeSeriesDataSolar);

				} catch (error) {
					console.error("Error al obtener los datos de la API:", error);
				}
			}
		};

		fetchData();
	}, [fechaInicio, fechaFin, fechaValida]);

	//GRÁFICAS HIDRAULICA
	const graficaBarrasRenovableHidraulica = {
		chart: {
			type: 'column',
		},
		title: {
			text: 'Gráfica de Consumo Energético (Barras)',
		},
		xAxis: {
			type: 'datetime',
			labels: {
				format: '{value:%Y-%m-%d}',
			},
		},
		yAxis: {
			title: {
				text: 'Consumo Energético',
			},
		},
		series: [
			{
				name: 'Energía',
				data: graficaBarRenHidraulica,
			},
		],
	};

	const graficaLineasRenovableHidraulica = {
		chart: {
			type: 'line',
		},
		title: {
			text: 'Gráfica de Consumo Energético (Líneas)',
		},
		xAxis: {
			type: 'datetime',
			labels: {
				format: '{value:%Y-%m-%d}',
			},
		},
		yAxis: {
			title: {
				text: 'Consumo Energético',
			},
		},
		plotOptions: {
			series: {
				cursor: 'pointer',
				className: 'popup-on-click',
				marker: {
					lineWidth: 1
				},
				point: {
					events: {
						click: function () {
							const chart = this.series.chart;
							const date = Highcharts.dateFormat('%A, %b %e, %Y', this.x);
							const text = `<b>${date}</b><br/>${this.y} ${this.series.name}`;

							const anchorX = this.plotX + this.series.xAxis.pos;
							const anchorY = this.plotY + this.series.yAxis.pos;
							const align = anchorX < chart.chartWidth - 200 ? 'left' : 'right';
							const x = align === 'left' ? anchorX + 10 : anchorX - 10;
							const y = anchorY - 30;

							if (!chart.sticky) {
								chart.sticky = chart.renderer
									.label(text, x, y, 'callout', anchorX, anchorY)
									.attr({
										align,
										fill: 'rgba(0, 0, 0, 0.75)',
										padding: 10,
										zIndex: 7 // Above series, below tooltip
									})
									.css({
										color: 'white'
									})
									.on('click', function () {
										chart.sticky = chart.sticky.destroy();
									})
									.add();
							} else {
								chart.sticky
									.attr({ align, text })
									.animate({ anchorX, anchorY, x, y }, { duration: 250 });
							}
						}
					}
				}
			}
		},
		series: [
			{
				name: 'Energía',
				data: graficaLinealRenHidraulica,
				lineWidth: 4,
				marker: {
					radius: 4
				}
			}
		],
	};

	//GRÁFICAS Solar
	const graficaAreaRenovableSolar = {
		chart: {
			type: 'area', // Cambiado a 'area' en lugar de 'column'
		},
		title: {
			text: 'Gráfica de Consumo Energético (Área)',
		},
		xAxis: {
			type: 'datetime',
			labels: {
				format: '{value:%Y-%m-%d}',
			},
		},
		yAxis: {
			title: {
				text: 'Consumo Energético',
			},
		},
		series: [
			{
				name: 'Energía',
				data: graficaAreaRenSolar,
			},
		],
	};

	const graficaTimeSeriesRenovableSolar = {
		chart: {
			type: 'spline',
			zoomType: 'x',
		},
		title: {
			text: 'Gráfica Time Series Zoomable',
		},
		xAxis: {
			type: 'datetime',
		},
		yAxis: {
			title: {
				text: 'Consumo Energético',
			},
		},
		tooltip: {
			valueSuffix: ' kWh',
		},
		series: [
			{
				name: 'Energía',
				data: graficaTimeSeriesRenSolar,
			},
		],
	};

	return (
		<div className="container mx-auto">
			<h2 className="text-3xl text-center my-4">Gráficas Renovables energía hidráulica</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="p-4 bg-white rounded shadow">
					<HighchartsReact highcharts={Highcharts} options={graficaBarrasRenovableHidraulica} />
				</div>
				<div className="p-4 bg-white rounded shadow">
					<HighchartsReact highcharts={Highcharts} options={graficaLineasRenovableHidraulica} />
				</div>
			</div>

			<h2 className="text-3xl text-center my-4">Gráficas Renovables energía Solar</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="p-4 bg-white rounded shadow">
					<HighchartsReact highcharts={Highcharts} options={graficaAreaRenovableSolar} />
				</div>
				<div className="p-4 bg-white rounded shadow">
					<HighchartsReact highcharts={Highcharts} options={graficaTimeSeriesRenovableSolar} />
				</div>
			</div>
		</div>
	);
};
