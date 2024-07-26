
export default function DeviceOption({ children, deviceName, devicePort }) {
	return (
		<div className="group h-full bg-black/25 hover:bg-white/5 active:bg-black/15 p-2 flex flex-row justify-between w-96 cursor-pointer">
			<div className="flex flex-row">
				<img src="../../../resources/devices/live-s-front-small.png" className="max-h-full pr-5" />
				<div className="flex flex-col">
					<p className="text-foreground">
						{deviceName}
					</p>
					<p className="text-subdued">
						{devicePort}
					</p>
				</div>
			</div>
			{children}
		</div>
	)
}
