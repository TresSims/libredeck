import { FolderIcon } from "@heroicons/react/24/solid"

export default function Sidebar() {
	return (
		<div className="bg-gutter flex-grow p-5 w-96">
			<h2 className="text-2xl">Program</h2>
			<hr />
			<div className="my-4 flex flex-row w-full">
				<input type="text" className="p-1 me-2 bg-bg rounded-md" />
				<FolderIcon className="size-8 p-1 text-white bg-magenta hover:bg-magenta/80 active:bg-magenta/90 rounded-md" />
			</div>
		</div>
	)
}
