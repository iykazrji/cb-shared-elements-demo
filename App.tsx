import "react-native-gesture-handler";
import {
	createStaticNavigation,
	StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home-screen";
import CoinDetailsScreen from "./screens/coin-details-screen";
import { useFonts } from "expo-font";
import { MockCoin } from "./data/mock-coins";
import { Platform } from "react-native";

const isIOS = Platform.OS === "ios";

const RootStack = createNativeStackNavigator({
	screens: {
		Home: {
			screen: HomeScreen,
			options: {
				headerShown: false,
				animationDuration: 300,
			},
		},
		CoinDetails: {
			screen: CoinDetailsScreen,
			options: {
				headerShown: false,
				animation: isIOS ? "fade" : "slide_from_right",
				animationDuration: isIOS ? 300 : 550,
			},
		},
	},
});

type RootStackParamList = StaticParamList<typeof RootStack>;
const RootStackNavigator = createStaticNavigation(RootStack);

export default function App() {
	const [loaded] = useFonts({
		GilroyLight: require("./assets/fonts/gilroy/gilroy-light.ttf"),
		GilroyRegular: require("./assets/fonts/gilroy/gilroy-regular.ttf"),
		GilroyMedium: require("./assets/fonts/gilroy/gilroy-medium.ttf"),
		GilroySemiBold: require("./assets/fonts/gilroy/gilroy-semibold.ttf"),
		GilroyBold: require("./assets/fonts/gilroy/gilroy-bold.ttf"),
	});

	if (!loaded) {
		return null;
	}
	return <RootStackNavigator />;
}

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {
			CoinDetails: {
				coin: MockCoin;
			};
		}
	}
}
