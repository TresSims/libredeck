import { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ArrowPathIcon, ArrowDownCircleIcon, CheckIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'


import DeviceOption from './deviceOption'

export default function DeviceManager() {
	let [currentDevice, setCurrentDeviceValue] = useState(0);
	let [devices, setDevices] = useState([["loading...", "loading..."]])
	let [fetchingDevices, setFetchingDevices] = useState(false)

	const setCurrentDevice = (index) => {
		setCurrentDeviceValue(index)
	}


	useEffect(() => {
		async function getConnectedDevices() {
			let new_devices = await window.deviceAPI.getDevices()
			console.log("useing effect")
			setTimeout(() => setFetchingDevices(false), 500)
			setDevices(new_devices)
		}
		getConnectedDevices();
	}, [fetchingDevices])


	return (
		<Menu as="div" className="w-96">
			<MenuButton className={
				clsx(
					"group h-full  overflow-hidden",
					"transition-all ease-in duration-300",
					"data-[active]:border-x data-[active]:border-t data-[active]:rounded-t-lg"
				)
			}>
				<DeviceOption
					deviceName={devices[currentDevice][0]}
					devicePort={devices[currentDevice][1]}
				>
					<ArrowDownCircleIcon className={
						clsx(
							"transition duration-300 group-hover:text-blue group-active:text-cyan",
							"group-data-[active]:rotate-180",
							"text-foreground size-9 self-center me-4"
						)}
					/>
				</DeviceOption>
			</MenuButton>
			<MenuItems
				transition
				className={
					clsx(
						"flex flex-col pt-2 justify-between bg-storm h-64 absolute z-10",
						"rounded-b-lg border-solid border-b border-x border-white overflow-hidden",
						"origin-top transition-all duration-200 ease-out data-[closed]:h-0"
					)}>
				<div className="flex flex-col gap-2 overflow-y-auto" >
					{devices.map((device, i) => {
						return (
							<MenuItem onClick={() => { setCurrentDevice(i) }}>
								<div className="h-16">
									<DeviceOption deviceName={device[0]} devicePort={device[1]} >
										{i == currentDevice && <CheckIcon className="text-green" />}
									</DeviceOption>
								</div>
							</MenuItem>
						)
					})}
				</div>
				<button
					onClick={() => setFetchingDevices(true)}
					className={
						clsx(
							"p-4 h-16 flex items-center gap-2 flex-row bg-gutter",
							"hover:bg-subdued",
							"active:bg-storm",
							"group"
						)}>
					<ArrowPathIcon
						className={
							clsx(
								"size-10",
								"group-hover:text-blue",
								fetchingDevices && "animate-spin text-cyan"
							)}
					/>
					Refresh
				</button>
			</MenuItems>
		</Menu>
	)
}
