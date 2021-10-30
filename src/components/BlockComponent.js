import styled from "styled-components"

export default function BlockComponent(props) {
	const [keys, values] = resolveValues(props)

	return (
		<StyledBlockComponent>
    	<div className="inner">
	      {keys.map((key, index) => {
	      	const value = values[index]

	      	return (value !== null) && (
		        <div className="value" key={key}>
		          <pre>{value}</pre>
		        </div>
		      )
	      })}
    	</div>
    </StyledBlockComponent>
	)
}

const StyledBlockComponent = styled.div `
	width: 100%;
	padding: 0.5em;
	color: #ccc;
	font-family: monospace;

	.inner {
		background-color: #000;
		padding: 1em;
		border-radius: 1em;
		height: 100%;

		.value {
			overflow: auto;
		}
	}
`

function resolveValues(props) {
	const resolvers = getResolvers(),
		keys = [],
		values = []

	for (const key in resolvers) {
		const resolver = resolvers[key]
		const value = resolver(props[key])

		if (value === null) continue

		keys.push(key)
		values.push(value)
	}

	return [keys, values]
}

function getResolvers() {
	return {
		index: value => "Id   #" + value,
		data: value => "Data  " + value,
		timestamp: value => "Time  " + timestampToString(value),
		parentHash: value => "Prev  " + value,
		hash: value => "Hash  " + value,
		nonce: value => "Nonce " + value,
	}
}

function timestampToString(timestamp) {
	const date = new Date(timestamp)

	return date.toDateString() + [
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds()
	].join(":")
}