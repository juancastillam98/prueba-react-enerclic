
import obtenerEnergiaFechaAPI from "../data/obtenerEnergiaFechaAPI.js";
import {Mensaje} from "./Mensaje.jsx";
import {useState} from "react";
export const ObtenerFechas = ({fechaInicio, fechaFin, setFechaInicio, setFechaFin, setFechaValida}) => {
	const [mensaje, setMensaje] =useState("")

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (fechaInicio === "" || fechaFin === "") {//si lo enviamos vacío no hace nada
			setMensaje("Las fechas introducidas  no son correcta")
			return;
		}else if (fechaInicio > fechaFin){
			setMensaje("La fecha de fin no puede ser mayor que la fecha de inicio")
			return;
		}
		setFechaValida(true);
		//const conexionAPI = await obtenerEnergiaFechaAPI(fechaIncio, fechaFin)

		console.log('Has hecho submit' + "fecha Inicio: " + fechaInicio + "Fecha Fin: " + fechaFin);
	}
	return (
		<div className="container ml-auto mr-auto flex items-center justify-center flex-col">
			<div className="w-full md:max-w-[90%]">
				<form className="bg-white px-8 pt-6 pb-8 mb-4 flex flex-col md:max-w-2xl md:mt-0 md:mb-0 md:mr-auto md:ml-auto" onSubmit={handleSubmit}>
					<div className="mb-4">
						<div className="grid grid-flow-row sm:grid-flow-col gap-3">
							<div className="sm:col-span-4 justify-center">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaIncio"> Fecha Inicio </label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="fechaIncio" type="date" placeholder="Carlos Torres" required
									onChange={(e)=>setFechaInicio(e.target.value)}
								/>
							</div>
							<div className="sm:col-span-4 justify-center">
								<label className="block text-gray-700 text-sm font-bold mb-2"
									   htmlFor="fechaFin">Fecha Fin
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="fechaFin" type="date" placeholder="ctorres@mail.com" required
									onChange={(e)=>setFechaFin(e.target.value)}
								/>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
							type="submit" value="Consultar">
							Consultar
						</button>
					</div>
				</form>


			</div>

			{mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
		</div>
	)
}