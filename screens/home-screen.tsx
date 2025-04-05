import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Dimensions,
	ScrollView,
	Platform,
} from "react-native";
import Animated, {
	FadeInDown,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { wn, nfs } from "../utils/normalizeDimensions";
import { useCallback, useLayoutEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";

import ScreenHeader from "../components/home-screen/ScreenHeader";
import { MockCoin, mockCoins } from "../data/mock-coins";

const SCREEN_WIDTH = Dimensions.get("window").width;
const isIOS = Platform.OS === "ios";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HomeScreen() {
	const navigation = useNavigation();
	const { top, bottom } = useSafeAreaInsets();
	const mainContainerOpacity = useSharedValue(0);
	const mainContainerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: mainContainerOpacity.value,
	}));

	useLayoutEffect(() => {
		mainContainerOpacity.value = withSpring(1, {
			mass: 2,
			stiffness: 100,
			damping: 10,
		});
	}, []);

	return (
		<Animated.View style={[styles.container, mainContainerAnimatedStyle]}>
			<ScrollView>
				<View style={styles.headerContainer}>
					<ScreenHeader />
				</View>
				<FlashList
					data={mockCoins}
					contentContainerStyle={{
						backgroundColor: "#FFF",
						paddingVertical: wn(0),
						paddingHorizontal: wn(10),
					}}
					estimatedItemSize={wn(103)}
					numColumns={3}
					ListHeaderComponent={() => (
						<View style={styles.coinsHeaderContainer}>
							<Text style={styles.coinsHeaderText}>Coins</Text>
						</View>
					)}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			</ScrollView>
		</Animated.View>
	);
}
const renderItem = ({ item, index }: { item: MockCoin; index: number }) => {
	return <CoinItem coin={item} index={index} />;
};
const CoinItem = ({ coin, index }: { coin: MockCoin; index: number }) => {
	const navigation = useNavigation();
	const emojiOpacity = useSharedValue(0);

	useFocusEffect(
		useCallback(() => {
			emojiOpacity.value = withTiming(1, { duration: 1000 });
		}, [])
	);

	useLayoutEffect(() => {
		navigation.addListener("beforeRemove", () => {
			emojiOpacity.value = withTiming(0, { duration: 1000 });
		});
	}, []);

	const emojiAnimatedStyle = useAnimatedStyle(() => ({
		opacity: emojiOpacity.value,
	}));

	const isUp = coin.price_change_percentage_24h > 0;

	return (
		<Animated.View
			entering={FadeInDown.delay(index * 50)
				.springify()
				.mass(2)
				.damping(10)
				.stiffness(100)}
			style={{ marginBottom: wn(10) }}
		>
			<StatusBar style="light" backgroundColor={"#1100FD"} />
			<View style={styles.tileWrapper}>
				<AnimatedPressable
					style={styles.tileContainer}
					onPress={() =>
						navigation.navigate("CoinDetails", {
							coin,
						})
					}
				>
					<Animated.View
						sharedTransitionTag={
							isIOS ? `main-tile-${coin.id}` : undefined
						}
						style={[
							styles.tile,
							{
								backgroundColor: coin.background_color,
							},
						]}
					/>
					{/* Shared Transition Element to ensure the tile has a nice unmount transition when navigating back */}
					<Animated.View
						style={styles.sharedTransitionContainer}
						sharedTransitionTag={
							isIOS
								? `main-shared-transition-container-${coin.id}`
								: undefined
						}
					/>
					<Animated.Text
						sharedTransitionTag={
							isIOS ? `main-tile-emoji-${coin.id}` : undefined
						}
						style={[
							{
								fontSize: nfs(30),
							},
							emojiAnimatedStyle,
						]}
					>
						{coin.emoji}
					</Animated.Text>
				</AnimatedPressable>
			</View>
			<View style={{ paddingHorizontal: wn(10) }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: wn(4),
						gap: wn(5),
					}}
				>
					<Text
						style={{
							fontFamily: "GilroySemiBold",
							fontSize: nfs(15),
							textTransform: "uppercase",
						}}
					>
						{coin.symbol}
					</Text>
					<View style={{ marginLeft: "auto" }}>
						<Octicons
							name={isUp ? "arrow-up" : "arrow-down"}
							size={wn(14)}
							color={isUp ? "#41896D" : "#FF0000"}
						/>
					</View>
				</View>
				<Text
					style={{
						fontFamily: "GilroyMedium",
						fontSize: nfs(12),
						color: "rgba(0, 0, 0, 0.5)",
					}}
				>
					${coin.current_price}
				</Text>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		padding: 0,
	},
	headerContainer: {
		marginBottom: wn(20),
	},
	tileContainer: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		borderRadius: 0,
		overflow: "hidden",
	},
	sharedTransitionContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: 0,
		height: 0,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0,
		overflow: "hidden",
	},
	tileWrapper: {
		padding: wn(5),
		flex: 1,
		overflow: "hidden",
		width: SCREEN_WIDTH / 3 - wn(10),
		height: SCREEN_WIDTH / 3 - wn(10),
	},
	tile: {
		width: "100%",
		height: "100%",
		borderRadius: wn(10),
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	coinsHeaderContainer: {
		paddingVertical: wn(10),
		paddingHorizontal: wn(5),
	},
	coinsHeaderText: {
		fontFamily: "GilroyBold",
		fontSize: nfs(20),
		color: "#000",
	},
});
