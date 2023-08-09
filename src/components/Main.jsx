import { ObtenerFechas } from "./ObtenerFechas.jsx";
import { useState } from "react";
import { Section } from "./Section.jsx";
import { Graficas } from "./Graficas.jsx";
import { Tablas } from "./Tablas.jsx";

export const Main = () => {
	//TODO: aquí hacer una validación para que si se ha indotrucido 2 fechas, cuando haga submit mandar llamar a la API.
	const [fechaInicio, setFechaInicio] = useState('');
	const [fechaFin, setFechaFin] = useState('');
	const [fechaValida, setFechaValida] = useState(false);
	const [datosEnergiaRenHidraulica, setDatosEnergiaRenHidraulica] = useState([]);
	const [datosEnergiaRenSolar, setDatosEnergiaRenSolar] = useState([]);
	return (
		<main className="md:max-w-[90%] my-0 mx-auto">
			<ObtenerFechas
				fechaInicio={fechaInicio}
				fechaFin={fechaFin}
				setFechaInicio={setFechaInicio}
				setFechaFin={setFechaFin}
				setFechaValida={setFechaValida}
			/>
			{fechaValida &&
				(
					<>
						<Section title="Gráficas" content={
							<Graficas
								fechaInicio={fechaInicio}
								fechaFin={fechaFin}
								fechaValida={fechaValida}
								setDatosEnergiaRenHidraulica={setDatosEnergiaRenHidraulica}
								setDatosEnergiaRenSolar={setDatosEnergiaRenSolar}
							/>
						} />
						<Section title="Tablas" content={
							<Tablas
								fechaInicio={fechaInicio}
								fechaFin={fechaFin}
								fechaValida={fechaValida}
								datosEnergiaRenHidraulica={datosEnergiaRenHidraulica}
								datosEnergiaRenSolar={datosEnergiaRenSolar}
							/>
						} />
					</>

				)
			}

		</main>
	)
}