import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import { View } from "react-native";
import { MockCoin } from "../../data/mock-coins";
import AnimatedButton from "../shared/AnimatedButton";
import { wn } from "../../utils/normalizeDimensions";
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
	Easing,
} from "react-native-reanimated";

interface HeaderControlsProps {
	coin: MockCoin;
	handleBack: () => void;
	parentVisibilityValue: SharedValue<number>;
}
const HeaderControls = ({
	coin,
	handleBack,
	parentVisibilityValue,
}: HeaderControlsProps) => {
	const foregroundColor = coin.foreground_color;

	const headerStyle = useAnimatedStyle(() => {
		const thresholdCondition = parentVisibilityValue.value > 0.45;
		return {
			opacity: withTiming(thresholdCondition ? 1 : 0, {
				duration: 500,
				easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
			}),
			transform: [
				{
					translateY: withTiming(thresholdCondition ? 0 : -50, {
						duration: 500,
						easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
					}),
				},
			],
		};
	});
	return (
		<Animated.View
			style={[
				{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingHorizontal: wn(20),
					paddingTop: wn(10),
				},
				headerStyle,
			]}
		>
			<View>
				<AnimatedButton
					onPress={handleBack}
					style={{
						backgroundColor: "transparent",
						width: wn(40),
						height: wn(40),
						justifyContent: "center",
					}}
				>
					<Octicons
						name="arrow-left"
						size={wn(28)}
						color={foregroundColor}
					/>
				</AnimatedButton>
			</View>
			<View
				style={{
					gap: wn(15),
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<AnimatedButton
					style={{
						backgroundColor: "transparent",
						width: wn(30),
						height: wn(30),
						justifyContent: "center",
						alignItems: "flex-end",
					}}
				>
					<Octicons
						name="star"
						size={wn(24)}
						color={foregroundColor}
					/>
				</AnimatedButton>
				<AnimatedButton
					style={{
						backgroundColor: "transparent",
						width: wn(30),
						height: wn(30),
						justifyContent: "center",
						alignItems: "flex-end",
					}}
				>
					<Octicons
						name="share"
						size={wn(24)}
						color={foregroundColor}
					/>
				</AnimatedButton>
				<AnimatedButton
					style={{
						backgroundColor: "transparent",
						width: wn(30),
						height: wn(30),
						justifyContent: "center",
						alignItems: "flex-end",
					}}
				>
					<Feather
						name="more-vertical"
						size={wn(24)}
						color={foregroundColor}
					/>
				</AnimatedButton>
			</View>
		</Animated.View>
	);
};

export default HeaderControls;
