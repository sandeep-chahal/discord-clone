import React, { useState } from "react";
import DMCard from "../DMCard/DMCard";

const User = ({ user, color }) => {
	const [showDMCard, setShowDMCard] = useState(false);
	return (
		<div
			className="user"
			// style={{ color: user.presence ? "1" : "0.7" }}
			onClick={() => setShowDMCard(true)}
		>
			{showDMCard ? (
				<DMCard
					roleColor={color}
					role={user.role}
					name={user.name}
					uid={user.uid}
					photo={user.photo}
					close={() => setShowDMCard(false)}
				/>
			) : null}
			<div
				className="user-icon"
				style={{ backgroundImage: `url(${user.photo})` }}
			>
				<div
					className="presence"
					style={{
						backgroundColor: user.presence ? "var(--green-2)" : "",
						display: user.presence ? "block" : "none"
					}}
				></div>
			</div>
			<div className="name" style={{ color: color }}>
				{user.name}
			</div>
		</div>
	);
};

export default User;
