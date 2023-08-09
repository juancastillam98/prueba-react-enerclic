import {Login} from "./Login.jsx";
import {Main} from "./Main.jsx";

export const Header = ({token, setToken, existeToken, setExisteToken}) => {
	return (
		<header>
			<h1 className="text-4xl text-center">Consular la energía</h1>
			{!existeToken &&
				<Login
				token={token}
				setToken={setToken}
				existeToken={existeToken}
				setExisteToken={setExisteToken}
			/>
			}

		</header>

	)
}