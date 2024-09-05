import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
// Import other screens as needed
import SignupScreen from "./components/signup";
import LoginScreen from "./components/login";
import AboutScreen from "./components/about";
import ContactUsScreen from "./components/contact_us";

// Context API
import { AuthProvider } from "./context/AuthContext"; // Import your AuthProvider

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          {/* Uncomment and add other screens as needed */}
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ContactUs"
            component={ContactUsScreen}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="FarmerDashboard" component={FarmerDashboardScreen} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="BuyerDashboard" component={BuyerDashboardScreen} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="AddReview" component={AddReviewScreen} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
