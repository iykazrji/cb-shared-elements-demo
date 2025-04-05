import {
	useDerivedValue,
	useSharedValue,
	SharedValue,
	Easing,
	withTiming,
} from "react-native-reanimated";
import { useLinePath, useAnimatedPath, PointsArray } from "victory-native";
import { Path } from "@shopify/react-native-skia";

interface SparklineProps {
	points: PointsArray;
	color: string;
	parentVisibilityValue: SharedValue<number>;
}

export const Sparkline = ({
	points,
	color,
	parentVisibilityValue,
}: SparklineProps) => {
	const animatedLine = useSharedValue(0);

	// Animate the line once the parent is visible
	useDerivedValue(() => {
		if (parentVisibilityValue.value > 0.5) {
			animatedLine.value = withTiming(1, {
				duration: 500,
				easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
			});
		}
		return withTiming(0, {
			duration: 500,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
		});
	}, [parentVisibilityValue]);

	const { path } = useLinePath(points, {
		curveType: "natural",
		connectMissingData: true,
	});

	const animatedPath = useAnimatedPath(path, {
		type: "timing",
		duration: 400,
		easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
	});

	return (
		<Path
			path={animatedPath}
			color={color}
			strokeWidth={2}
			style={"stroke"}
			start={0}
			strokeJoin={"round"}
			strokeCap={"round"}
			end={animatedLine}
		/>
	);
};
