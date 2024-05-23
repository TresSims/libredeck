import { ArrowDownCircleIcon } from "@heroicons/react/24/solid"

export default function DeviceOption() {
	return (
		<div className="group h-full bg-black/25 hover:bg-white/5 active:bg-black/15 p-2 flex flex-row justify-between w-96 border-white border-l cursor-pointer">
			<div className="flex flex-row">
				<img src="../../../resources/devices/live-s-front-small.png" className="max-h-full pr-5" />
				<div className="flex flex-col">
					<p className="text-foreground">
						Loupedeck Live S
					</p>
					<p className="text-subdued">
						/dev/ttyUSB0
					</p>
				</div>
			</div>
			<ArrowDownCircleIcon className="text-foreground group-hover:text-blue group-active:text-cyan size-9 self-center me-4" />
		</div>
	)
}
