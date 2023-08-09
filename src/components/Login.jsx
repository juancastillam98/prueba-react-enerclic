import {useState} from "react";
export const Login = ({token, setToken, existeToken, setExisteToken}) => {
	const handleLogin = async (e) => {
		e.preventDefault();
		const url ="https://fakestoreapi.com/auth/login";
		const respuesta = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				username: "mor_2314",
				password: "83r5^_"
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const resultado = await respuesta.json();
		if (resultado.token) {
			setToken(resultado.token); // Guarda el token en el estado
			//localStorage.setItem('authToken', resultado.token);
			console.log("Token muy largo " +resultado.token);
			setExisteToken(true);
		}else{
			setExisteToken(false);
		}
	};


	return (
	<div className="container ml-auto mr-auto flex items-center justify-center">
		<div className="w-full md:w-1/2">
			<form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit" value="Entrar">
						Entrar
					</button>
				</div>
			</form>
		</div>
	</div>
	)
}