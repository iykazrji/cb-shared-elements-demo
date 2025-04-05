import { useEffect } from "react";
import Animated, {
	useSharedValue,
	withDelay,
	withTiming,
	withSpring,
	useAnimatedStyle,
	SharedValue,
	useDerivedValue,
} from "react-native-reanimated";

const AnimatedTitle = ({
	children,
	delay,
	damping,
	style,
	wait,
}: {
	children: any;
	delay: number;
	damping: number;
	style: any;
	wait?: SharedValue<boolean>;
}) => {
	const opacity = useSharedValue(0);
	const translateY = useSharedValue(20);

	useEffect(() => {
		if (wait === undefined || wait?.value === false) {
			opacity.value = withDelay(delay, withTiming(1, { duration: 350 }));
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
		<Animated.Text style={[style, animatedStyle]}>{children}</Animated.Text>
	);
};

export default AnimatedTitle;
