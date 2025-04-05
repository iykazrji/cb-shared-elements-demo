import { MockCoin } from "../../../data/mock-coins";
import { nfs, wn } from "../../../utils/normalizeDimensions";
import { useMemo } from "react";
import AnimatedButton from "../AnimatedButton";
import { View, Text } from "react-native";
import * as Haptics from "expo-haptics";

export type ChartType = "daily" | "weekly" | "monthly" | "yearly" | "all_time";

export const chartTypes: ChartType[] = [
	"daily",
	"weekly",
	"monthly",
	"yearly",
	"all_time",
];

interface ChartSelectorButtonProps {
	selecting: ChartType;
	selectedChart: ChartType;
	onPress: () => void;
	coin: MockCoin;
}

export const ChartSelectorButton = ({
	selecting,
	selectedChart,
	onPress,
	coin,
}: ChartSelectorButtonProps) => {
	const isSelected = useMemo(
		() => selectedChart === selecting,
		[selectedChart, selecting]
	);

	const text = useMemo(() => {
		switch (selecting) {
			case "daily":
				return "1D";
			case "weekly":
				return "1W";
			case "monthly":
				return "1M";
			case "yearly":
				return "1Y";
			case "all_time":
				return "All";
		}
	}, [selecting]);

	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		onPress();
	};

	return (
		<AnimatedButton
			onPress={handlePress}
			style={{
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
			}}
		>
			<View
				style={{
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
					paddingHorizontal: wn(20),
				}}
			>
				<Text
					style={[
						{
							color: coin.foreground_color,
							fontSize: nfs(12),
							opacity: isSelected ? 1 : 0.85,
							fontFamily: isSelected
								? "GilroyBold"
								: "GilroyMedium",
						},
					]}
				>
					{text}
				</Text>
			</View>
		</AnimatedButton>
	);
};

interface ChartDataSelectorProps {
	selectedChart: ChartType;
	setSelectedChart: (chartType: ChartType) => void;
	coin: MockCoin;
}
export const ChartDataSelector = ({
	selectedChart,
	setSelectedChart,
	coin,
}: ChartDataSelectorProps) => {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				marginTop: wn(10),
				paddingBottom: wn(10),
				height: wn(40),
			}}
		>
			{chartTypes.map((chartType) => (
				<View
					key={chartType}
					style={{
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ChartSelectorButton
						selecting={chartType}
						selectedChart={selectedChart}
						onPress={() => setSelectedChart(chartType)}
						coin={coin}
					/>
				</View>
			))}
		</View>
	);
};
