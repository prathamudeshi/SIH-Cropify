// navigationTypes.ts
export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Contact: undefined;
  Detail: { id: string }; // Route with required parameters
  FarmerProfile: undefined;
  BuyerProfile: undefined;
  Cart: undefined;
  Login: undefined;
  Signup: undefined;
  // Add more routes as needed
};
