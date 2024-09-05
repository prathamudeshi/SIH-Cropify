import { Image, Platform, Text, View } from "react-native";
import tailwind from "tailwind-rn";

export default function HomeScreen() {
  return (
    <View style={tailwind("bg-red-500 justify-center")}>
      <Text style={tailwind("text-white")}>Hello World</Text>
    </View>
  );
}
