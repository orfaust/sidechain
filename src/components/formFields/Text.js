import { useState, useEffect } from "react";

export default function FormFieldText({
	type,
	name,
	required,
	placeholder,
	defaultValue,
	onUpdate,
}) {
	defaultValue = defaultValue || "";

	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		onUpdate(value, setValue);
	}, [value]);

	const inputProps = {
		type,
		name,
		required,
		placeholder,
		onChange: (e) => setValue(e.target.value),
		value,
	};

	return <input {...inputProps} />;
}
