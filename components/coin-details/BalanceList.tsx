import { View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { nfs, wn } from "../../utils/normalizeDimensions";
import { MockCoin } from "../../data/mock-coins";
import Octicons from "@expo/vector-icons/Octicons";

const BalanceList = ({ coin }: { coin: MockCoin }) => {
	return (
		<View>
			<Animated.View
				entering={FadeInDown.delay(800)}
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingVertical: wn(10),
					gap: wn(10),
					marginTop: wn(20),
				}}
			>
				<View
					style={{
						backgroundColor: coin.background_color,
						borderRadius: wn(10),
						padding: wn(12),
					}}
				>
					<Text
						style={{
							fontSize: nfs(18),
						}}
					>
						{coin.emoji}
					</Text>
				</View>
				<Text
					style={{
						fontSize: nfs(15),
						fontFamily: "GilroyBold",
						color: "#000",
						textTransform: "uppercase",
					}}
				>
					1000 {coin.symbol}
				</Text>
				<Text
					style={{
						fontSize: nfs(15),
						fontFamily: "GilroyRegular",
						color: "#000",
						marginLeft: "auto",
					}}
				>
					$8,484.60
				</Text>
			</Animated.View>

			<Animated.View
				entering={FadeInDown.delay(1000)}
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingVertical: wn(10),
					gap: wn(10),
					marginTop: wn(10),
				}}
			>
				<View
					style={{
						backgroundColor: "#000",
						borderRadius: wn(50),
						padding: wn(12),
					}}
				>
					<Octicons name="pulse" size={wn(24)} color={"#fff"} />
				</View>
				<Text
					style={{
						fontSize: nfs(15),
						fontFamily: "GilroyBold",
						color: "#000",
					}}
				>
					Profit and loss
				</Text>
				<Text
					style={{
						fontSize: nfs(15),
						fontFamily: "GilroyRegular",
						color: "#000",
						marginLeft: "auto",
					}}
				>
					+$3,484.60
				</Text>
			</Animated.View>
		</View>
	);
};

export default BalanceList;
