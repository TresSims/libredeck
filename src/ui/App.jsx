import { useState } from 'react';
import Header from './components/header'
import DevicePage from './components/devicePage'
import Sidebar from './components/sidebar'

export default function App() {
	const [devices, setDevices] = useState("No device.")

	return (
		<div className="flex flex-col w-full h-full">
			<Header />
			<div className="flex flex-row flex-grow w-full h-full">
				<DevicePage />
				<Sidebar />
			</div>
		</div>
	)
}
