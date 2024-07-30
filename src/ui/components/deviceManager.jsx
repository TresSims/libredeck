'use client'

import { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ArrowPathIcon, ArrowDownCircleIcon, CheckIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'


import DeviceOption from './deviceOption'

export default function DeviceManager() {
	const queryClient = useQueryClient()

	const devicesQuery = useQuery({ queryKey: ['devices'], queryFn: window.deviceAPI.getDevices })
	const [fetchingDevices, setFetchingDevices] = useState(false);

	const updateDeviceList = async () => {
		setTimeout(() => setFetchingDevices(false), 500)
		return await window.deviceAPI.findDevices();
	}

	const updateDeviceListMutation = useMutation({
		mutationFn: updateDeviceList,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["devices"] })
		}
	})

	// TODO: Fail gracefully when no devices are connected.
	if (devicesQuery.isPending) {
		return (<div>Loading...</div>)
	} else if (devicesQuery.error) {
		console.log(devicesQuery.error)
		return (<div>Error!</div>)
	} else {
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
						deviceName={devicesQuery.data.devices[devicesQuery.data.current_device][0]}
						devicePort={devicesQuery.data.devices[devicesQuery.data.current_device][1]}
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
						{devicesQuery.data.devices.map((device, i) => {
							return (
								<MenuItem key={i} onClick={() => { setCurrentDevice(i) }}>
									<div className="h-16">
										<DeviceOption deviceName={device[0]} devicePort={device[1]} >
											{i == devicesQuery.data.current_device && <CheckIcon className="text-green" />}
										</DeviceOption>
									</div>
								</MenuItem>
							)
						})}
					</div>
					<button
						onClick={() => {
							setFetchingDevices(true)
							updateDeviceListMutation.mutate()
						}}
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
}
