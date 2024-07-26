import DeviceManager from './deviceManager'

export default function Header() {
	return (
		<div className="bg-storm w-full h-16 flex flex-row justify-between pr-2">
			<p className="text-5xl m-4 self-bottom">LibreDeck</p>
			<DeviceManager />
		</div>
	)
}
