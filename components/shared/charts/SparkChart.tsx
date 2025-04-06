import { useDerivedValue, SharedValue, runOnJS } from "react-native-reanimated";
import { wn } from "../../../utils/normalizeDimensions";
import { useChartPressState, CartesianChart } from "victory-native";
import { Sparkline } from "./SparkLine";
import { SparkArea } from "./SparkArea";
import { LinearGradient, Circle, vec } from "@shopify/react-native-skia";
import { hexToRgba } from "../../../utils/hexToRgba";
import { useEffect, useRef, useState } from "react";

interface SparkChartProps {
	chartData: { x: string | number; y: number }[];
	colors: { solid: string; gradientStart: string; gradientEnd: string };
	parentVisibilityValue: SharedValue<number>;
	onChartHoverValueChange: (value: string) => void;
}

export const SparkChart = ({
	chartData,
	colors,
	parentVisibilityValue,
	onChartHoverValueChange,
}: SparkChartProps) => {
	const { state, isActive } = useChartPressState<{
		x: string | number;
		y: { y: number };
	}>({
		x: chartData[chartData.length - 1].x,
		y: { y: chartData[chartData.length - 1].y },
	});

	useDerivedValue(() => {
		const newHoverValue = state.y.y.value.value?.toFixed(2);
		runOnJS(onChartHoverValueChange)(newHoverValue);
	}, [state]);

	useEffect(() => {
		onChartHoverValueChange(chartData[chartData.length - 1].y.toFixed(2));
	}, [chartData]);

	return (
		<CartesianChart
			data={chartData}
			xKey="x"
			yKeys={["y"]}
			xAxis={{
				tickCount: 0,
				lineWidth: 0,
			}}
			frame={{
				lineWidth: 0,
			}}
			yAxis={[{ tickCount: 0, lineWidth: 0 }]}
			chartPressState={state}
			domainPadding={{
				bottom: wn(10),
				top: wn(15),
				left: wn(0),
				right: wn(0),
			}}
		>
			{({ points, chartBounds }) => (
				<>
					<Sparkline
						points={points.y}
						color={colors.solid}
						parentVisibilityValue={parentVisibilityValue}
					/>

					<SparkArea
						points={points.y}
						bottom={chartBounds.bottom + wn(10)}
						parentVisibilityValue={parentVisibilityValue}
					>
						<LinearGradient
							colors={[colors.gradientStart, colors.gradientEnd]}
							start={vec(chartBounds.bottom, wn(10))}
							end={vec(
								chartBounds.bottom - wn(10),
								chartBounds.bottom - wn(10)
							)}
						/>
					</SparkArea>

					<ChartTooltip
						x={state.x.position}
						y={state.y.y.position}
						color={colors.solid}
						isActive={isActive}
						chartData={chartData}
					/>
				</>
			)}
		</CartesianChart>
	);
};

const ChartTooltip = ({
	x,
	y,
	color,
	isActive,
	chartData,
}: {
	x: SharedValue<number>;
	y: SharedValue<number>;
	color: string;
	isActive: boolean;
	chartData: { x: string | number; y: number }[];
}) => {
	const hasRendered = useRef(false);
	const lastChartData = useRef(chartData);

	useEffect(() => {
		if (
			JSON.stringify(lastChartData.current) !== JSON.stringify(chartData)
		) {
			hasRendered.current = false;
		}
	}, [chartData]);

	if (!isActive && !hasRendered.current) {
		return null;
	}

	hasRendered.current = true;
	return (
		<>
			<Circle cx={x} cy={y} r={wn(5)} color={color} />
			<Circle cx={x} cy={y} r={wn(10)} color={hexToRgba(color, 0.2)} />
		</>
	);
};
