import React from "react";
import { Text, TouchableOpacity, View, Image, FlatList } from "react-native";

// store
import useAppStore from "@/src/store/store";

// types
import { RickObject } from "@/src/types/types";

export default function SelectCards() {
  const selectedRicks = useAppStore((store) => store.selectedRicks);

  return (
    <View className="h-16 mt-10">
      <FlatList
        data={selectedRicks}
        horizontal
        className="flex-1"
        renderItem={(data) => <SelectCardItem rick={data.item} />}
      />
    </View>
  );
}

interface Props {
  rick: RickObject;
}

function SelectCardItem({ rick }: Props) {
  const selectRick = useAppStore((store) => store.selectRick);

  return (
    <View className="w-fit bg-grey/20 rounded-md mr-2">
      <View className="flex-1 flex-row items-center justify-between p-2 gap-2 bg-card rounded-md">
        <Image
          source={{ uri: rick.image }}
          width={40}
          height={40}
          className="rounded-sm"
        />
        <Text className="!text-white whitespace-nowrap mr-4">{rick.name}</Text>

        <TouchableOpacity
          className="bg-button rounded-md"
          onPress={() => selectRick(rick)}
        >
          <View className="bg-black/60 w-6 h-6 flex items-center justify-center rounded-md">
            <Text className="text-white">X</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
