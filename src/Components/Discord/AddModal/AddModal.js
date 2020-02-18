import React, { useState } from "react";
import "./AddModal.scss";

const AddModal = props => {
	const [name, setName] = useState("");
	const [file, setFile] = useState("");
	const [option, setOption] = useState(props.defaultValue || "");
	const [errors, setErrors] = useState([]);

	const handleSubmit = e => {
		e.preventDefault();
		if (isFormVaild()) {
			if (props.create === "Server") props.onClick(name, file);
			if (props.create === "Channel") props.onClick(name, option);
			if (props.create === "Category") props.onClick(name, option);
		}
	};

	const isFormVaild = () => {
		const errors = [];
		if (name.length < 3) errors.push("Name Must be Greater then 2");
		if (props.create === "Channel" && option === "")
			errors.push("Select a category");
		if (!file && props.create === "Server") errors.push("Please Upload a pic");
		setErrors(errors);
		return errors.length === 0;
	};

	const handleFileChange = e => {
		const file = e.target.files[0];
		if (file) {
			setFile(file);
		}
	};
	const handleNameChange = e => {
		const name = e.target.value;
		if (name.length < 15) setName(name);
	};

	const closeModalOnBgClick = e => {
		if (e.target.classList[0] === "bg") props.handleClose(false);
	};

	const fileInput = (
		<div>
			<label
				htmlFor="file"
				style={{
					backgroundImage: `url(${
						file
							? URL.createObjectURL(file)
							: "https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png"
					})`
				}}
			></label>
			<input
				id="file"
				type="file"
				onChange={handleFileChange}
				style={{ display: "none" }}
			/>
		</div>
	);
	const selectInput = () => {
		return (
			<select value={option} onChange={e => setOption(e.target.value)}>
				<option value="">
					Choose {props.create === "Channel" ? "category" : "type"}
				</option>
				{props.options
					? props.options.map(option => (
							<option key={option.key} value={option.key}>
								{option.name}
							</option>
					  ))
					: null}
			</select>
		);
	};

	return (
		<div className="bg" onClick={closeModalOnBgClick}>
			<div className="addmodal">
				<h2>{`Create Another ${props.create}`}</h2>
				<div className="errors">
					{errors
						? errors.map((err, i) => <span key={i + Math.random()}>{err}</span>)
						: null}
				</div>
				<form>
					{props.create === "Server" ? fileInput : ""}
					{props.options ? selectInput() : ""}
					<input
						type="text"
						placeholder={`${props.create} name`}
						value={name}
						onChange={handleNameChange}
						style={{ marginBottom: "15rem" }}
					/>
					{/* check wether we're uploading or not */}
					{!props.status ? (
						<div className="button-group">
							<button type="button" onClick={() => props.handleClose(false)}>
								Cancel
							</button>
							<button type="submit" onClick={handleSubmit}>
								Create
							</button>
						</div>
					) : (
						<div className="status-bar">
							<div className="status">{props.status}</div>
							{/* <div className="bar">
                {props.status === "uploading icon..." ? props.percentage : ""}
              </div> */}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default AddModal;
