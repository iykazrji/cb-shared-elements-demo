import { useCallback } from "react";
import {
	useFocusEffect,
	useIsFocused,
	useNavigation,
} from "@react-navigation/native";
import {
	View,
	StyleSheet,
	Dimensions,
	ScrollView,
	Platform,
} from "react-native";
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	FadeOutDown,
	useAnimatedProps,
	runOnJS,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { StaticScreenProps } from "@react-navigation/native";
import { MockCoin } from "../data/mock-coins";
import { nfs, wn } from "../utils/normalizeDimensions";
import * as Haptics from "expo-haptics";
import AnimatedTitle from "../components/shared/AnimatedTitle";
import BalanceList from "../components/coin-details/BalanceList";
import CoinChart from "../components/coin-details/CoinChart";
import HeaderControls from "../components/coin-details/HeaderControls";
import { StatusBar } from "expo-status-bar";
import { hexToRgba } from "../utils/hexToRgba";
const SCREEN_WIDTH = Dimensions.get("window").width;
// const isIOS = Platform.OS === "ios" ;

export default function CoinDetailsScreen({
	route,
}: StaticScreenProps<{
	coin: MockCoin;
}>) {
	const { top } = useSafeAreaInsets();
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const coin = route.params.coin;
	const headerDetailsOpacity = useSharedValue(0); // Starts Invisible
	const statusBarBackgroundProps = useAnimatedProps(() => ({
		backgroundColor:
			withTiming(
				runOnJS(hexToRgba)(
					coin.background_color,
					headerDetailsOpacity.value
				) ?? "transparent",
				{ duration: 350 }
			) ?? "transparent",
	}));

	useFocusEffect(
		useCallback(() => {
			headerDetailsOpacity.value = withTiming(1, { duration: 1300 }); // Fade in
		}, [])
	);

	const handleBack = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		headerDetailsOpacity.value = withTiming(0, { duration: 100 });
		navigation.goBack();
	};

	if (!isFocused) {
		return null;
	}

	return (
		<View style={{ flex: 1, backgroundColor: coin.background_color }}>
			<StatusBar style={"auto"} {...statusBarBackgroundProps} />
			<ScrollView
				contentContainerStyle={{
					flex: 1,
					backgroundColor: "#FFF",
					position: "relative",
				}}
			>
				{/* Header Content */}
				<Animated.View style={[styles.container]}>
					<Animated.View
						exiting={FadeOutDown}
						style={[
							styles.tileContainer,
							{
								paddingTop: top,
								position: "relative",
							},
						]}
					>
						<BackgroundTile coin={coin} />
						<ItemEmojiSharedElement coin={coin} />
						<SharedTransitionContainer
							headerDetailsOpacity={headerDetailsOpacity}
							coin={coin}
						>
							<HeaderControls
								coin={coin}
								handleBack={handleBack}
								parentVisibilityValue={headerDetailsOpacity}
							/>
							<CoinChart
								coin={coin}
								parentVisibilityValue={headerDetailsOpacity}
							/>
						</SharedTransitionContainer>
					</Animated.View>
					<Animated.View
						style={{
							backgroundColor: "#FFF",
							paddingHorizontal: wn(15),
							paddingVertical: wn(10),
						}}
					>
						<View
							style={{
								flexDirection: "column",
								marginTop: wn(20),
							}}
						>
							<AnimatedTitle
								delay={300}
								damping={15}
								style={{
									fontSize: nfs(21),
									fontFamily: "GilroyBold",
									color: "#000",
								}}
							>
								My Balance
							</AnimatedTitle>

							<BalanceList coin={coin} />
						</View>
					</Animated.View>
				</Animated.View>
			</ScrollView>
		</View>
	);
}

interface BackgroundTileProps {
	coin: MockCoin;
}
const BackgroundTile = ({ coin }: BackgroundTileProps) => {
	const { top } = useSafeAreaInsets();
	const backgroundColor = coin.background_color;
	return (
		<Animated.View
			sharedTransitionTag={`main-tile-${coin.id}`}
			style={[
				styles.tile,
				{
					backgroundColor,
					paddingTop: top,
				},
			]}
		/>
	);
};

const ItemEmojiSharedElement = ({ coin }: { coin: MockCoin }) => {
	return (
		<Animated.Text
			sharedTransitionTag={`main-tile-emoji-${coin.id}`}
			style={{
				fontSize: 0,
				position: "absolute",
				top: 0,
				left: 0,
				opacity: 0,
			}}
		/>
	);
};

interface SharedTransitionContainerProps
	extends React.ComponentProps<typeof Animated.View> {
	headerDetailsOpacity: SharedValue<number>;
	coin: MockCoin;
}
const SharedTransitionContainer = ({
	children,
	headerDetailsOpacity,
	coin,
}: SharedTransitionContainerProps) => {
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: headerDetailsOpacity.value,
	}));
	return (
		<Animated.View
			sharedTransitionTag={`main-shared-transition-container-${coin.id}`}
			style={[styles.headerInfoContainer, animatedStyle]}
		>
			{children}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		position: "relative",
	},
	tile: {
		position: "absolute",
		width: "100%",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: 0,
	},
	headerInfoContainer: {
		width: SCREEN_WIDTH,
		overflow: "hidden",
	},
	tileContainer: {
		position: "relative",
		width: Dimensions.get("window").width,
		alignItems: "center",
		alignSelf: "flex-start",
		flexShrink: 0,
		justifyContent: "center",
		overflow: "hidden",
	},
});
