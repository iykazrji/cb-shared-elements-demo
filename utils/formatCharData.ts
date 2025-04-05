interface DailyPrice {
	date: string;
	price: number;
}

interface WeeklyPrice {
	week_ending: string;
	avg_price: number;
}

interface MonthlyPrice {
	month: string;
	avg_price: number;
}

interface YearlyPrice {
	year: string;
	start_price: number;
	end_price: number;
	high: number;
	low: number;
	current_price?: number;
}

interface AllTimeData {
	inception_date: string;
	inception_price: number;
	price_timeline: {
		date: string;
		price: number;
	}[];
}

interface PriceData {
	daily: DailyPrice[];
	weekly: WeeklyPrice[];
	monthly: MonthlyPrice[];
	yearly: YearlyPrice[];
	all_time: AllTimeData;
}

export interface Coordinate {
	x: string | number; // Date string or timestamp
	y: number;
}

interface GraphData {
	daily: Coordinate[];
	weekly: Coordinate[];
	monthly: Coordinate[];
	yearly: Coordinate[];
	all_time: Coordinate[];
	zero: Coordinate[];
}

/**
 * Converts price data object into coordinate data for graphing
 * @param priceData The price data object
 * @param useTimestamps Whether to return dates as timestamps (if true) or formatted strings (if false)
 * @returns Object containing daily, weekly, monthly, yearly and all-time coordinate data for visualization
 */

function getRandomDate(startDate: Date, endDate: Date) {
	const randomDate = new Date(endDate.getTime() - startDate.getTime());
	return randomDate.toISOString().split("T")[0];
}

export function generateRandomPrice(
	start: number,
	end: number,
	steps: number,
	volatility: number = 0.02
): number[] {
	const values: number[] = [start];
	const totalGrowth = end - start;
	const averageStepGrowth = totalGrowth / (steps - 1);

	for (let i = 1; i < steps; i++) {
		const previous = values[i - 1];

		// Add randomness within a range of volatility
		const randomFactor = 1 + (Math.random() * 2 - 1) * volatility;

		// Apply a random factor to the average step growth
		const nextValue = previous + averageStepGrowth * randomFactor;

		// Ensure we don’t overshoot the end value
		values.push(Math.min(nextValue, end));
	}

	// Final value should be exactly the end
	values[values.length - 1] = end;

	return values;
}

const STEPS = 20;

const dailyValues = generateRandomPrice(2, 5.3, STEPS, 11);
const weeklyValues = generateRandomPrice(0.3, 50, STEPS, 8.3);
const monthlyValues = generateRandomPrice(4, 80.5, STEPS, 14.2);
const yearlyValues = generateRandomPrice(1.4, 40.5, STEPS, 20);
const allTimeValues = generateRandomPrice(0.3, 49.5, STEPS, 14.5);

export function getRandomCoords() {
	return Array.from({ length: STEPS }, (_, i) => ({
		x: getRandomDate(new Date("2024-01-01"), new Date("2025-3-31")),
		y: generateRandomPrice(0.3, 49.5, STEPS, 14.5)[i],
	}));
}

export function getPriceCoordinates(
	priceData: PriceData,
	useTimestamps: boolean = false
): GraphData {
	// Daily coordinates
	// Generate 15 values for each day
	// Prepare random values, simulating stock growth

	// Fill up with random values
	const dailyCoords = Array.from({ length: STEPS }, (_, i) => ({
		x: getRandomDate(
			new Date(priceData.daily[0].date),
			new Date(priceData.daily[priceData.daily.length - 1].date)
		),
		y: dailyValues[i],
	}));

	// Weekly coordinates
	const weeklyCoords = Array.from({ length: STEPS }, (_, i) => ({
		x: getRandomDate(
			new Date(priceData.weekly[0].week_ending),
			new Date(priceData.weekly[priceData.weekly.length - 1].week_ending)
		),
		y: weeklyValues[i],
	}));

	// Monthly coordinates - parse the YYYY-MM format into a proper date
	const monthlyCoords = Array.from({ length: STEPS }, (_, i) => ({
		x: getRandomDate(
			new Date(priceData.monthly[0].month),
			new Date(priceData.monthly[priceData.monthly.length - 1].month)
		),
		y: monthlyValues[i],
	}));

	// Yearly coordinates
	const yearlyCoords = Array.from({ length: STEPS }, (_, i) => ({
		x: getRandomDate(
			new Date(priceData.yearly[0].year),
			new Date(priceData.yearly[priceData.yearly.length - 1].year)
		),
		y: yearlyValues[i],
	}));

	// All time coordinates
	const allTimeCoords = Array.from({ length: STEPS }, (_, i) => ({
		x: getRandomDate(
			new Date(priceData.all_time.inception_date),
			new Date(
				priceData.all_time.price_timeline[
					priceData.all_time.price_timeline.length - 1
				].date
			)
		),
		y: allTimeValues[i],
	}));

	const zeroCoords = Array.from({ length: STEPS }, (_, i) => ({
		x: getRandomDate(new Date("2024-01-01"), new Date("2025-3-31")),
		y: 0,
	}));

	return {
		daily: dailyCoords,
		weekly: weeklyCoords,
		monthly: monthlyCoords,
		yearly: yearlyCoords,
		all_time: allTimeCoords,
		zero: zeroCoords,
	};
}

// Example usage:
// const graphData = getPriceCoordinates(price_data);
// const graphDataWithTimestamps = getPriceCoordinates(price_data, true);

// For charting libraries requiring a specific format, you can add format conversions:
export function formatForChartData(priceData: PriceData) {
	const graphData = getPriceCoordinates(priceData);

	return {
		daily: {
			labels: graphData.daily.map((point) => point.x),
			datasets: [
				{
					data: graphData.daily.map((point) => point.y),
				},
			],
		},
		weekly: {
			labels: graphData.weekly.map((point) => point.x),
			datasets: [
				{
					data: graphData.weekly.map((point) => point.y),
				},
			],
		},
		monthly: {
			labels: graphData.monthly.map((point) => point.x),
			datasets: [
				{
					data: graphData.monthly.map((point) => point.y),
				},
			],
		},
		yearly: {
			labels: graphData.yearly.map((point) => point.x),
			datasets: [
				{
					data: graphData.yearly.map((point) => point.y),
				},
			],
		},
		all_time: {
			labels: graphData.all_time.map((point) => point.x),
			datasets: [
				{
					data: graphData.all_time.map((point) => point.y),
				},
			],
		},
	};
}
