import Animated, { useSharedValue } from "react-native-reanimated";

import { SharedValue } from "react-native-reanimated";
import { MockCoin } from "../../data/mock-coins";
import { getPriceCoordinates } from "../../utils/formatCharData";
import { useEffect, useMemo, useState } from "react";
import {
	ChartDataSelector,
	ChartType,
} from "../shared/charts/ChartDataSelector";
import { hexToRgba } from "../../utils/hexToRgba";
import * as Haptics from "expo-haptics";
import { View, Text, Dimensions } from "react-native";
import { nfs, wn } from "../../utils/normalizeDimensions";
import { Octicons } from "@expo/vector-icons";
import { SparkChart } from "../shared/charts/SparkChart";
import AnimatedView from "../shared/AnimatedView";
import AnimatedTitle from "../shared/AnimatedTitle";
import ChartControlsWrapper from "./ChartControlsWrapper";
import { throttle } from "../../utils/throttle";
import { getForegroundColor } from "../../utils/getForegroundColor";
interface CoinChartProps {
	coin: MockCoin;
	parentVisibilityValue: SharedValue<number>;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const CoinChart = ({ coin, parentVisibilityValue }: CoinChartProps) => {
	const { daily, weekly, monthly, yearly, all_time } = getPriceCoordinates(
		coin.price_data
	);

	const waitForHeader = useSharedValue(false);
	const [selectedChart, setSelectedChart] = useState<ChartType>("daily");

	const isUp = coin.price_change_percentage_24h > 0;

	const [chartHoverValue, setChartHoverValue] = useState<string>("");
	const chartData = useMemo(() => {
		switch (selectedChart) {
			case "daily":
				return daily;
			case "weekly":
				return weekly;
			case "monthly":
				return monthly;
			case "yearly":
				return yearly;
			case "all_time":
				return all_time;
			default:
				return daily;
		}
	}, [selectedChart]);

	useEffect(() => {
		waitForHeader.value = parentVisibilityValue.value > 0.75;
	}, [parentVisibilityValue]);

	const foregroundColor = useMemo(() => {
		return (
			coin.foreground_color ?? getForegroundColor(coin.background_color)
		);
	}, [coin.background_color, coin.foreground_color]);

	const gradientColors = useMemo(() => {
		return {
			gradientStart: hexToRgba(foregroundColor, 0.105),
			gradientEnd: hexToRgba(foregroundColor, 0.005),
		};
	}, [foregroundColor]);

	const handleChartHoverValueChange = throttle((value: string) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		setChartHoverValue(value);
	}, 250);

	const actionButtonBackgroundColor = useMemo(() => {
		return hexToRgba(foregroundColor, 0.09);
	}, [foregroundColor]);

	return (
		<Animated.View
			style={[
				{
					width: SCREEN_WIDTH,
					paddingBottom: wn(20),
				},
			]}
		>
			<View
				style={{ paddingVertical: wn(20), paddingHorizontal: wn(15) }}
			>
				<AnimatedTitle
					delay={400}
					damping={15}
					wait={waitForHeader}
					style={{
						fontSize: nfs(16),
						fontFamily: "GilroyMedium",
						textAlign: "left",
						color: foregroundColor,
					}}
				>
					{`${coin.name}`}
				</AnimatedTitle>

				<AnimatedTitle
					delay={700}
					damping={15}
					wait={waitForHeader}
					style={{
						fontSize: nfs(44),
						fontFamily: "GilroyBold",
						textAlign: "left",
						marginTop: wn(10),
						color: foregroundColor,
					}}
				>
					{`$${chartHoverValue}`}
				</AnimatedTitle>
				<AnimatedView
					delay={1000}
					damping={15}
					wait={waitForHeader}
					style={{
						marginTop: wn(10),
						flexDirection: "row",
						alignItems: "center",
						gap: wn(5),
					}}
				>
					<Octicons
						name={isUp ? "arrow-up" : "arrow-down"}
						size={nfs(12)}
						color={foregroundColor}
					/>
					<Text
						style={{
							fontSize: nfs(15),
							marginLeft: wn(2),
							fontFamily: "GilroyMedium",
							color: foregroundColor,
						}}
					>
						{`${coin.price_change_percentage_24h}%`}
					</Text>
				</AnimatedView>
			</View>

			<View
				style={{
					width: "100%",
					height: wn(180),
				}}
			>
				<SparkChart
					chartData={chartData}
					colors={{
						solid: foregroundColor,
						gradientStart: gradientColors.gradientStart,
						gradientEnd: gradientColors.gradientEnd,
					}}
					parentVisibilityValue={parentVisibilityValue}
					onChartHoverValueChange={handleChartHoverValueChange}
				/>
			</View>

			{/* Duration Selector */}
			<ChartDataSelector
				selectedChart={selectedChart}
				setSelectedChart={(chart) => {
					setChartHoverValue(
						chartData[chartData.length - 1].y.toFixed(2)
					);

					setSelectedChart(chart);
				}}
				coin={coin}
			/>

			<AnimatedView
				delay={1150}
				damping={15}
				wait={waitForHeader}
				style={{
					paddingHorizontal: wn(15),
					paddingVertical: wn(10),
					marginTop: wn(10),
				}}
			>
				<Text
					style={{
						fontSize: nfs(14),
						fontFamily: "GilroyRegular",
						color: foregroundColor,
					}}
				>
					Owned by aneri.eth and 159k others
				</Text>
			</AnimatedView>
			<ChartControlsWrapper
				coin={coin}
				actionButtonBackgroundColor={actionButtonBackgroundColor}
				waitForHeader={waitForHeader}
			/>
		</Animated.View>
	);
};

export default CoinChart;
