import Header from './components/header'
import DevicePage from './components/devicePage'
import Sidebar from './components/sidebar'
import QueryRoot from './components/queryRoot'

export default function App() {

	return (
		<div className="flex flex-col w-full h-full">
			<QueryRoot>
				<Header />
				<div className="flex flex-row flex-grow w-full h-full">
					<DevicePage />
					<Sidebar />
				</div>
			</QueryRoot>
		</div>
	)
}
