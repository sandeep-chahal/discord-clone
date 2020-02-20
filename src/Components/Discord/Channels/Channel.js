import React from "react";

const Channel = ({
	channel,
	id,
	onClick,
	active,
	isAdmin,
	handleDeleteChannel
}) => {
	return (
		<div
			className={active ? "active channel" : "channel"}
			onClick={e => {
				if (!e.target.classList.contains("delete")) {
					onClick(id);
				}
			}}
		>
			<span>
				{channel.type === "text" ? <span className="hash">#</span> : null}{" "}
				{channel.name}
			</span>
			{isAdmin && id !== "0" ? (
				<span className="delete" onClick={() => handleDeleteChannel()}>
					&#x2715;
				</span>
			) : null}
		</div>
	);
};

export default Channel;
