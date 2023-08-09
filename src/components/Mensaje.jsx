export const Mensaje = ({children, tipo}) => {
	return (
		<div className={`alerta ${tipo} bg-red-400 text-red-800 p-3 text-xl text-center border-2 border-red-800 rounded-lg`}>
			{children}
		</div>
	)
}