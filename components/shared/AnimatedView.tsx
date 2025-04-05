import Animated, {
	useSharedValue,
	withDelay,
	withSpring,
	useAnimatedStyle,
	withTiming,
	SharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedView = ({
	children,
	style,
	delay,
	damping,
	wait,
}: {
	children: any;
	style: any;
	delay: number;
	damping: number;
	wait?: SharedValue<boolean>;
}) => {
	const opacity = useSharedValue(0);
	const translateY = useSharedValue(20);

	useEffect(() => {
		if (wait === undefined || wait?.value === false) {
			opacity.value = withDelay(delay, withSpring(1, { damping }));
			translateY.value = withDelay(delay, withSpring(0, { damping }));
		} else {
			opacity.value = 0;
			translateY.value = 0;
		}
	}, [wait]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			transform: [{ translateY: translateY.value }],
		};
	});

	return (
		<Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
	);
};

export default AnimatedView;
