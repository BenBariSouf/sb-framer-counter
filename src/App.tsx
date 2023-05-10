// import { useState } from "react";
import "./App.css";
import { FramerCounter } from "./components";

function App() {
	//   const [count, setCount] = useState(0)

	return (
		<>
			<div></div>
			<h1>Vite + React</h1>
			<div className="card"></div>
			<div className="card" style={{ display: "flex" }}>
				<FramerCounter size="md" minimumValue={10} maximumValue={25} focusRingColor="#58d" />
				<FramerCounter
					minimumValue={10}
					maximumValue={100}
					stepValue={3}
					initialValue={0}
					size="lg"
					inactiveTrackColor="#fed7aa"
					activeTrackColor="#fddec0"
					activeButtonColor="#ffedd5"
					inactiveIconColor="#fb923c"
					hoverIconColor="#ea580c"
					activeIconColor="#9a3412"
					disabledIconColor="#fdba74"
					thumbColor="#f97316"
					thumbShadowAnimationOnTrackHoverEnabled={false}
					focusRingColor="#fff7ed"
					onChange={(value: any) => {
						console.log(value);
					}}
				/>
			</div>
		</>
	);
}

export default App;
