import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Robot } from "./Robot";
import { useState, useRef } from "react";

const SwayingModel = ({ modelScale, modelYPosition, isAnimating }) => {
	const groupRef = useRef();
	const swaySpeed = 30; // Increase for slower swaying
	const swayAmount = 1.3; // Max rotation in radians

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (groupRef.current && isAnimating) {
			// groupRef.current.rotation.y = Math.sin(t / 2) * 0.4; // Smooth sway back and forth
			groupRef.current.rotation.y = Math.sin(t / swaySpeed) * swayAmount;
		}
	});

	return (
		<group ref={groupRef} scale={modelScale} position={[0, modelYPosition, 0]}>
			<Robot />
		</group>
	);
};

const RobotRender = () => {
	const [animate, setAnimate] = useState(true);

	// Responsive breakpoints
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
	const isXLScreen = useMediaQuery({ query: "(min-width: 1280px)" });

	const modelScale = isMobile ? 0.7 : isXLScreen ? 1.2 : 1;
	const cameraPosition = isMobile
		? [0, 2, 8]
		: isXLScreen
		? [0, 2.5, 6]
		: [0, 1.8, 10];
	const modelYPosition = isMobile ? -1 : isXLScreen ? -1.2 : -1.8;

	return (
		<Canvas camera={{ position: cameraPosition, fov: 45 }}>
			{/* Lighting */}
			<ambientLight intensity={0.2} color="#1a1a40" />
			<directionalLight position={[5, 5, 5]} intensity={2} />

			{/* Orbit Controls */}
			<OrbitControls
				enablePan={false}
				enableZoom={!(isTablet || isMobile)}
				maxDistance={20}
				minDistance={5}
				minPolarAngle={Math.PI / 5}
				maxPolarAngle={Math.PI / 2}
				onStart={() => setAnimate(false)} // Stop sway only on user interaction
			/>

			{/* Animated 3D Model */}
			<SwayingModel
				modelScale={modelScale}
				modelYPosition={modelYPosition}
				isAnimating={animate}
			/>
		</Canvas>
	);
};

export default RobotRender;

// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { useMediaQuery } from "react-responsive";
// import { useEffect, useRef, useState } from "react";
// import { Robot } from "./Robot";

// const SwayingModel = ({ modelScale, modelYPosition, shouldSway }) => {
// 	const groupRef = useRef();
// 	const swaySpeed = 50; // Increase for slower swaying
// 	const swayAmount = 1.5; // Max rotation in radians

// 	useFrame((state) => {
// 		if (groupRef.current && shouldSway) {
// 			const t = state.clock.getElapsedTime();
// 			// Starts from center and moves smoothly
// 			// groupRef.current.rotation.y =
// 			// 	Math.sin(t / swaySpeed + Math.PI / 2) * swayAmount;
// 			// groupRef.current.rotation.y =
// 			// 	Math.sin(t / swaySpeed - Math.PI / 2) * swayAmount;
//groupRef.current.rotation.y = Math.sin(t / swaySpeed) * swayAmount;
// 		}
// 	});

// 	return (
// 		<group ref={groupRef} scale={modelScale} position={[0, modelYPosition, 0]}>
// 			<Robot />
// 		</group>
// 	);
// };

// const HeroExperience = () => {
// 	const [userInteracted, setUserInteracted] = useState(false);

// 	useEffect(() => {
// 		const handleAnyInteraction = () => {
// 			if (!userInteracted) setUserInteracted(true);
// 		};

// 		// Listen for various user interactions
// 		window.addEventListener("pointerdown", handleAnyInteraction);
// 		window.addEventListener("touchstart", handleAnyInteraction);
// 		window.addEventListener("keydown", handleAnyInteraction); // Optional

// 		return () => {
// 			window.removeEventListener("pointerdown", handleAnyInteraction);
// 			window.removeEventListener("touchstart", handleAnyInteraction);
// 			window.removeEventListener("keydown", handleAnyInteraction);
// 		};
// 	}, [userInteracted]);

// 	// Handle user interaction to stop auto-sway
// 	// const handleInteraction = () => {
// 	// 	if (!userInteracted) setUserInteracted(true);
// 	// };

// 	// Responsive breakpoints
// 	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
// 	const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
// 	const isXLScreen = useMediaQuery({ query: "(min-width: 1280px)" });

// 	// Scale & positioning
// 	const modelScale = isMobile ? 0.7 : isXLScreen ? 1.2 : 1;
// 	const cameraPosition = isMobile
// 		? [0, 1.5, 8]
// 		: isXLScreen
// 		? [0, 2, 6]
// 		: [0, 1.8, 15];
// 	const modelYPosition = isMobile ? -1 : isXLScreen ? -1.2 : -1.8;

// 	return (
// 		<Canvas camera={{ position: cameraPosition, fov: 45 }}>
// 			{/* Lighting */}
// 			<ambientLight intensity={0.2} color="#1a1a40" />
// 			<directionalLight position={[5, 5, 5]} intensity={2} />

// 			{/* Orbit Controls */}
// 			<OrbitControls
// 				enablePan={false}
// 				enableZoom={!(isTablet || isMobile)}
// 				maxDistance={20}
// 				minDistance={5}
// 				minPolarAngle={Math.PI / 5}
// 				maxPolarAngle={Math.PI / 2}
// 				enableRotate={userInteracted}
// 			/>

// 			{/* Animated 3D Model */}
// 			<SwayingModel
// 				modelScale={modelScale}
// 				modelYPosition={modelYPosition}
// 				shouldSway={!userInteracted}
// 			/>
// 		</Canvas>
// 	);
// };

// export default HeroExperience;

// import { OrbitControls } from "@react-three/drei";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useMediaQuery } from "react-responsive";
// import { Robot } from "./Robot";
// import { useState, useRef } from "react";

// const SwayingModel = ({ modelScale, modelYPosition, isAnimating }) => {
// 	const groupRef = useRef();

// 	useFrame((state) => {
// 		const t = state.clock.getElapsedTime();
// 		if (groupRef.current && isAnimating) {
// 			groupRef.current.rotation.y = Math.sin(t / 8) * 0.4; // Smooth sway back and forth
// 		}
// 	});

// 	return (
// 		<group ref={groupRef} scale={modelScale} position={[0, modelYPosition, 0]}>
// 			<Robot />
// 		</group>
// 	);
// };

// const HeroExperience = () => {
// 	const [animate, setAnimate] = useState(true);

// 	// Responsive breakpoints
// 	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
// 	const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
// 	const isXLScreen = useMediaQuery({ query: "(min-width: 1280px)" });

// 	const modelScale = isMobile ? 0.7 : isXLScreen ? 1.2 : 1;
// 	const cameraPosition = isMobile
// 		? [0, 2.1, 8]
// 		: isXLScreen
// 		? [0, 2.6, 6]
// 		: [0, 1.8, 15];
// 	const modelYPosition = isMobile ? -1 : isXLScreen ? -1.2 : -1.8;

// 	return (
// 		<Canvas camera={{ position: cameraPosition, fov: 45 }}>
// 			{/* Lighting */}
// 			<ambientLight intensity={0.2} color="#1a1a40" />
// 			<directionalLight position={[5, 5, 5]} intensity={2} />

// 			{/* Orbit Controls */}
// 			<OrbitControls
// 				enablePan={false}
// 				enableZoom={!(isTablet || isMobile)}
// 				maxDistance={20}
// 				minDistance={5}
// 				minPolarAngle={Math.PI / 5}
// 				maxPolarAngle={Math.PI / 2}
// 				onStart={() => setAnimate(false)} // Stop sway only on user interaction
// 			/>

// 			{/* Animated 3D Model */}
// 			<SwayingModel
// 				modelScale={modelScale}
// 				modelYPosition={modelYPosition}
// 				isAnimating={animate}
// 			/>
// 		</Canvas>
// 	);
// };

// export default HeroExperience;

// import { OrbitControls } from "@react-three/drei";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useMediaQuery } from "react-responsive";
// import { Robot } from "./Robot";
// import { useState, useEffect, useRef } from "react";

// const SwayingModel = ({ modelScale, modelYPosition, isAnimating }) => {
// 	const groupRef = useRef();

// 	useFrame((state) => {
// 		const t = state.clock.getElapsedTime();
// 		if (groupRef.current && isAnimating) {
// 			groupRef.current.rotation.y = Math.sin(t / 2) * 0.4; // Sways back and forth
// 		}
// 	});

// 	return (
// 		<group ref={groupRef} scale={modelScale} position={[0, modelYPosition, 0]}>
// 			<Robot />
// 		</group>
// 	);
// };

// const HeroExperience = () => {
// 	const [animate, setAnimate] = useState(true);

// 	// Stop animation after 4 seconds
// 	useEffect(() => {
// 		const timeout = setTimeout(() => setAnimate(false), 4000);
// 		return () => clearTimeout(timeout);
// 	}, []);

// 	// Responsive breakpoints
// 	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
// 	const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
// 	const isXLScreen = useMediaQuery({ query: "(min-width: 1280px)" });

// 	// Dynamically set scale based on screen size
// 	const modelScale = isMobile ? 0.7 : isXLScreen ? 1.2 : 1;

// 	// Dynamically set camera distance (zoom level)
// 	// const cameraPosition = isMobile
// 	// 	? [0, 0, 8]
// 	// 	: isXLScreen
// 	// 	? [0, 0, 6]
// 	// 	: [0, 0, 15];

// 	const cameraPosition = isMobile
// 		? [0, 1.5, 8]
// 		: isXLScreen
// 		? [0, 2, 6]
// 		: [0, 1.8, 15];

// 	// Y-axis position to vertically center the model better
// 	const modelYPosition = isMobile ? -1 : isXLScreen ? -1.2 : -1.8;

// 	return (
// 		<Canvas camera={{ position: cameraPosition, fov: 45 }}>
// 			{/* Lighting */}
// 			<ambientLight intensity={0.2} color="#1a1a40" />
// 			<directionalLight position={[5, 5, 5]} intensity={2} />

// 			{/* Controls */}
// 			<OrbitControls
// 				enablePan={false}
// 				enableZoom={!(isTablet || isMobile)}
// 				maxDistance={20}
// 				minDistance={5}
// 				minPolarAngle={Math.PI / 5}
// 				maxPolarAngle={Math.PI / 2}
// 				onStart={() => setAnimate(false)} // stop animation on user interaction
// 			/>

// 			{/* Animated 3D Model */}
// 			<SwayingModel
// 				modelScale={modelScale}
// 				modelYPosition={modelYPosition}
// 				isAnimating={animate}
// 			/>

// 			{/* 3D Model */}
// 			{/* <group
// 				scale={modelScale}
// 				position={[0, modelYPosition, 0]}
// 				rotation={[0, 0.4, 0]}
// 			>
// 				<Robot />
// 			</group> */}
// 		</Canvas>
// 	);
// };

// export default HeroExperience;
