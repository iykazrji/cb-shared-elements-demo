import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import { StyleProp, ViewStyle, Pressable, StyleSheet } from "react-native";
import { wn } from "../../utils/normalizeDimensions";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedButton = ({
	children,
	style,
	onPress,
}: {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	onPress?: (args: any) => void;
}) => {
	const buttonOpacity = useSharedValue(1);
	const buttonScale = useSharedValue(1);
	const buttonAnimatedStyle = useAnimatedStyle(() => ({
		opacity: buttonOpacity.value,
		transform: [
			{
				scale: buttonScale.value,
			},
		],
	}));

	const handlePressIn = () => {
		buttonOpacity.value = withSpring(0.5, {
			mass: 2,
			stiffness: 100,
			damping: 50,
		});
		buttonScale.value = withSpring(0.98, {
			mass: 2,
			stiffness: 100,
			damping: 50,
		});
	};

	const handlePressOut = () => {
		buttonOpacity.value = withSpring(1, {
			mass: 2,
			stiffness: 100,
			damping: 50,
		});
		buttonScale.value = withSpring(1, {
			mass: 2,
			stiffness: 100,
			damping: 50,
		});
	};

	return (
		<AnimatedPressable
			style={[buttonAnimatedStyle]}
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
		>
			<Animated.View style={style}>{children}</Animated.View>
		</AnimatedPressable>
	);
};

const styles = StyleSheet.create({});

export default AnimatedButton;
