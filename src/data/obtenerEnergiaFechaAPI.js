 const obtenerEnergiaFechaAPI = async (fechaInicio, fechaFin)=>{
     const fechaInicioFormateada = fechaInicio+"T00:00";
     const fechaFinFormateada = fechaFin+"T23:59";

    try {
        const url = `https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=${fechaInicioFormateada}&end_date=${fechaFinFormateada}&time_trunc=day`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        return resultado;
    }catch (error){
        throw new Error("Error de conexión con la API");
    }

}
 export default obtenerEnergiaFechaAPI;

