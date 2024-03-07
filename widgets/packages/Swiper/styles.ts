import { StyleSheet, Dimensions } from "react-native"


const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

export const styles = StyleSheet.create({
  wrap: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 350,
  },

  card: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 250,
    borderRadius: 12,
  },

  cardContent: {
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: "100%",
    height: "100%"
  },

  cardGrab: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    height: "100%",
  },

  cardText: {
    color: "#ffffff",
    fontSize: 21,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  overlaySecond: {
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  overlayThird: {
    backgroundColor: "rgba(255,255,255,0.6)",
  },

  points: {
    position: "absolute",
    zIndex: 10,
    top: 25,
    right: 8,
    flexDirection: "column",
    alignItems: "center",
  },

  point: {
    width: 4,
    height: 4,
    marginBottom: 4,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255, 0.5)",
  },

  activePoint: {
    width: 6,
    height: 6,
    backgroundColor: "rgba(255,255,255, 1)",
  },
})
