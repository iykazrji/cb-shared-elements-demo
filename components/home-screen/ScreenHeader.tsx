import { View, Text, StyleSheet, Dimensions } from "react-native";
import { nfs, wn } from "../../utils/normalizeDimensions";
import { Octicons } from "@expo/vector-icons";
import AnimatedButton from "../shared/AnimatedButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ScreenHeader() {
	const { top } = useSafeAreaInsets();
	return (
		<View>
			<View
				style={[styles.headerContainer, { paddingTop: top + wn(10) }]}
			>
				{/* Wallet details */}
				<View style={styles.walletDetailsContainer}>
					<View style={styles.walletUserProfileContainer}>
						<View
							style={{
								backgroundColor: "rgba(255,255,255,0.8)",
								width: wn(25),
								height: wn(25),
								borderRadius: wn(5),
							}}
						/>
						<Text style={styles.walletHeaderText}>Wallet</Text>
					</View>
					<View style={styles.walletUserControlsContainer}>
						<Octicons
							name="screen-full"
							size={wn(20)}
							color="white"
						/>
						<Octicons name="bell" size={wn(20)} color="white" />
					</View>
				</View>

				{/* Balance Info */}
				<View style={styles.balanceInfoContainer}>
					<Text style={styles.balanceTitleText}>Total Balance</Text>
					<Text style={styles.balanceInfoValueText}>$94,197.65</Text>
					<View style={styles.balanceChangeWrapper}>
						<Octicons name="arrow-up" size={wn(15)} color="white" />
						<Text style={styles.balanceChangeText}>1.38%</Text>
					</View>
				</View>

				{/* Header Controls */}
				<View style={[styles.headerControlsContainer]}>
					<View style={{ flex: 1 / 2 }}>
						<AnimatedButton
							style={styles.headerControlButtonContainer}
						>
							<Text style={styles.headerControlButtonText}>
								Transfer
							</Text>
						</AnimatedButton>
					</View>
					<View style={{ flex: 1 / 2 }}>
						<AnimatedButton
							style={styles.headerControlButtonContainer}
						>
							<Text style={styles.headerControlButtonText}>
								Buy & Sell
							</Text>
						</AnimatedButton>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: "#1100FD",
		width: SCREEN_WIDTH,
		paddingBottom: wn(20),
		paddingHorizontal: wn(20),
	},
	walletDetailsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	walletHeaderText: {
		fontFamily: "GilroyBold",
		fontSize: nfs(16),
		color: "#fff",
	},
	walletUserProfileContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: wn(5),
	},
	walletUserControlsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: wn(15),
	},
	balanceInfoContainer: {
		paddingVertical: wn(35),
		gap: wn(15),
	},
	balanceTitleText: {
		fontFamily: "GilroyMedium",
		fontSize: nfs(14),
		color: "#fff",
	},
	balanceInfoValueText: {
		fontFamily: "GilroyBold",
		fontSize: nfs(52),
		color: "#fff",
	},
	balanceChangeWrapper: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: -wn(10),
		gap: wn(2),
	},
	balanceChangeText: {
		fontFamily: "GilroySemiBold",
		fontSize: nfs(14),
		color: "#fff",
	},
	headerControlsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: wn(10),
	},
	headerControlButtonContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.25)",
		borderRadius: wn(6),
		paddingVertical: wn(15),
	},
	headerControlButtonText: {
		fontFamily: "GilroySemiBold",
		fontSize: nfs(14),
		color: "#fff",
	},
	coinsHeaderContainer: {
		paddingHorizontal: wn(20),
		paddingVertical: wn(10),
	},
	coinsHeaderText: {
		fontFamily: "GilroyBold",
		fontSize: nfs(20),
		color: "#000",
	},
});
