import React from "react";
import { View } from "react-native";

// components
import Input from "@/src/components/Input";
import SelectCards from "@/src/components/SelectCards";
import ResultList from "@/src/components/ResultList";

export default function TabLayout() {
  return (
    <View className="flex-1 bg-background p-5">
      <SelectCards />
      <Input />
      <ResultList />
    </View>
  );
}
