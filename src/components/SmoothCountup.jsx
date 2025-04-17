import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const SmoothCountUp = ({ end, suffix }) => {
	const { ref, inView } = useInView({
		triggerOnce: true, // Only trigger once
		threshold: 0.5, // 50% of the component must be visible
	});

	return (
		<div ref={ref}>
			{inView && <CountUp end={end} duration={2} suffix={suffix} />}
		</div>
	);
};

export default SmoothCountUp;
