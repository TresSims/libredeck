import {useState} from 'react';

function App() {
	const [devices, setDevices] = useState("No device.")

const pollDevices = async () => {
	console.log("Trying to poll device!")
	setDevices("Looking for device...")
	const device = await window.deviceAPI.getDevices()
	setDevices(device)
}


	return(
	<div>
			<h1>Welcome to Linuxdeck!</h1>
			<button onClick={() => pollDevices()}>Click me to find your device!</button>
			<p>{devices}</p>
		</div>
	)
}

export default App
