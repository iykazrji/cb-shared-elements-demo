import {
	useDerivedValue,
	useSharedValue,
	SharedValue,
	Easing,
	withTiming,
} from "react-native-reanimated";
import { Path } from "@shopify/react-native-skia";
import { useAreaPath, useAnimatedPath } from "victory-native";
import { PointsArray } from "victory-native";

interface SparkAreaProps extends React.PropsWithChildren {
	points: PointsArray;
	bottom: number;
	parentVisibilityValue: SharedValue<number>;
}
export const SparkArea = ({
	points,
	parentVisibilityValue,
	bottom,
	children,
}: SparkAreaProps) => {
	const animatedArea = useSharedValue(0.5);

	// Animate the line once the parent is visible
	useDerivedValue(() => {
		if (parentVisibilityValue.value > 0.5) {
			animatedArea.value = withTiming(1, {
				duration: 500,
				easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
			});
		}
		return withTiming(0, {
			duration: 500,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
		});
	}, [parentVisibilityValue]);

	const { path } = useAreaPath(points, bottom, {
		curveType: "natural",
		connectMissingData: true,
	});

	const animatedPath = useAnimatedPath(path, {
		type: "timing",
		duration: 750,
		easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
	});

	return (
		<Path path={animatedPath} style={"fill"} opacity={animatedArea}>
			{children}
		</Path>
	);
};
