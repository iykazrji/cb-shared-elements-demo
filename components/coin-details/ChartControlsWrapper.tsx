import { SharedValue } from "react-native-reanimated";
import { MockCoin } from "../../data/mock-coins";
import AnimatedView from "../shared/AnimatedView";
import AnimatedButton from "../shared/AnimatedButton";
import { nfs, wn } from "../../utils/normalizeDimensions";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getForegroundColor } from "../../utils/getForegroundColor";
interface ControlsWrapperProps {
	coin: MockCoin;
	actionButtonBackgroundColor: string;
	waitForHeader: SharedValue<boolean>;
}
const ChartControlsWrapper = ({
	coin,
	actionButtonBackgroundColor,
	waitForHeader,
}: ControlsWrapperProps) => {
	const foregroundColor =
		coin.foreground_color ?? getForegroundColor(coin.background_color);

	return (
		<AnimatedView
			delay={1150}
			damping={15}
			wait={waitForHeader}
			style={[styles.headerActionsContainer]}
		>
			<View style={{ flex: 1 / 2 }}>
				<AnimatedButton>
					<View
						style={[
							styles.headerActionButtonContainer,
							{
								backgroundColor: actionButtonBackgroundColor,
							},
						]}
					>
						<Text
							style={[
								styles.headerActionButtonText,
								{
									color: foregroundColor,
								},
							]}
						>
							Buy & Sell
						</Text>
					</View>
				</AnimatedButton>
			</View>
			<View style={{ flex: 1 / 2 }}>
				<AnimatedButton>
					<View
						style={[
							styles.headerActionButtonContainer,
							{
								backgroundColor: actionButtonBackgroundColor,
							},
						]}
					>
						<Text
							style={[
								styles.headerActionButtonText,
								{
									color: foregroundColor,
								},
							]}
						>
							Transfer
						</Text>
					</View>
				</AnimatedButton>
			</View>
			<View>
				<AnimatedButton>
					<View
						style={[
							styles.headerActionButtonContainer,
							{
								paddingHorizontal: wn(16),
								backgroundColor: actionButtonBackgroundColor,
							},
						]}
					>
						<MaterialCommunityIcons
							name="swap-vertical"
							size={wn(24)}
							color={foregroundColor}
						/>
					</View>
				</AnimatedButton>
			</View>
		</AnimatedView>
	);
};

const styles = StyleSheet.create({
	headerActionsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: wn(10),
		paddingHorizontal: wn(15),
		width: "100%",
		height: wn(50),
	},
	headerActionButtonContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.25)",
		borderRadius: wn(6),
		paddingVertical: wn(15),
	},
	headerActionButtonText: {
		fontFamily: "GilroySemiBold",
		fontSize: nfs(14),
		color: "#fff",
	},
});

export default ChartControlsWrapper;
