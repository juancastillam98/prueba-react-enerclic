import React, { useState } from 'react';
import 'boxicons'
import { CSVLink } from 'react-csv';


export const Tablas = ({ datosEnergiaRenHidraulica, datosEnergiaRenSolar }) => {
	const [ordenarPorCampo, setOrdenarPorCampo] = useState("Fecha")
	const [ordenarPorDireccion, setOrdenarPorDireccion] = useState("asc")
	//const exportarDatos = listaOrdenada.map((datos) => [datos.datetime, datos.value, listaOrdenada[posicion]?.value]);

	//console.log(ordenarPorCampo + " - " + ordenarPorDireccion)


	const listaOrdenada = datosEnergiaRenHidraulica.concat(datosEnergiaRenSolar).sort((a, b) => {
		if (ordenarPorCampo === "Fecha") {
			if (ordenarPorDireccion === "asc") {
				if (a.datetime < b.datetime) return -1;
				if (a.datetime > b.datetime) return 1;
				else return 0;
			} else {
				if (a.datetime < b.datetime) return 1;
				if (a.datetime > b.datetime) return -1;
				else return 0;
			}
		} else if (ordenarPorCampo === "Energía Hidráulica") {
			if (ordenarPorDireccion === "asc") {
				if (a.value < b.value) return -1;
				if (a.value > b.value) return 1;
				else return 0;
			} else {
				if (a.value < b.value) return 1;
				if (a.value > b.value) return -1;
				else return 0;
			}
		} else if (ordenarPorCampo === "Energía Solar") {
			if (ordenarPorDireccion === "asc") {
				if (a.value < b.value) return -1;
				if (a.value > b.value) return 1;
				else return 0;
			} else {
				if (a.value < b.value) return 1;
				if (a.value > b.value) return -1;
				else return 0;
			}
		}
		return 0;

	})

	const exportarDatos = listaOrdenada.map((datos) => [
		datos.datetime,
		datos.value,
		datosEnergiaRenSolar.find((solar) => solar.datetime === datos.datetime)?.value || '',
	]);

	console.log(listaOrdenada)

	return (
		<div className="mt-8">
			<h2 className="text-xl font-semibold mb-4">Tabla de Energía Renovable</h2>
			<CSVLink data={exportarDatos} filename={"datos_energia_renovable.csv"} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
				Descargar CSV
			</CSVLink>
			<div className="flex justify-center relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-4 py-3 border border-gray-500"
							>
								Fecha
								<box-icon class="cursor-pointer" name='chevron-up' onClick={(e) => {
									setOrdenarPorDireccion("asc")
									setOrdenarPorCampo("Fecha")
								}}></box-icon>
								<box-icon class="cursor-pointer" name='chevron-down' onClick={(e) => {
									setOrdenarPorDireccion("desc")
									setOrdenarPorCampo("Fecha")
								}}></box-icon>
							</th>
							<th scope="col" className="px-4 py-3 border border-gray-500"
							>
								Energía Hidráulica
								<box-icon class="cursor-pointer" name='chevron-up' onClick={(e) => {
									setOrdenarPorDireccion("asc")
									setOrdenarPorCampo("Energía Hidráulica")
								}}></box-icon>
								<box-icon class="cursor-pointer" name='chevron-down' onClick={(e) => {
									setOrdenarPorDireccion("desc")
									setOrdenarPorCampo("Energía Hidráulica")
								}}></box-icon>
							</th>
							<th scope="col" className="px-4 py-3 border border-gray-500"

							>
								Energía Solar
								<box-icon class="cursor-pointer" name='chevron-up' onClick={(e) => {
									setOrdenarPorDireccion("asc")
									setOrdenarPorCampo("Energía Solar")
								}}></box-icon>
								<box-icon class="cursor-pointer" name='chevron-down' onClick={(e) => {
									setOrdenarPorDireccion("desc")
									setOrdenarPorCampo("Energía Solar")
								}}></box-icon>
							</th>
						</tr>
					</thead>
					<tbody>
						{listaOrdenada.map((datos, posicion) => (
							<tr key={posicion} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
								<td className="px-4 py-2 border border-gray-500">{datos.datetime}</td>
								<td className="px-4 py-2 border border-gray-500">{datos.value}</td>
								<td className="px-4 py-2 border border-gray-500">{listaOrdenada[posicion]?.value}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
