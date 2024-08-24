import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

// types
import { ErrorResponse, RickObject, RicksResponse } from "@/src/types/types";

// store
import useAppStore from "@/src/store/store";

// utils
import { cn } from "@/src/utils/cn";
import { getNextRicks } from "@/src/utils/fetchers";

export default function ResultList() {
  const ricks = useAppStore((store) => store.ricks);
  const error = useAppStore((store) => store.error);
  const continuation = useAppStore((store) => store.continuation);
  const setLoading = useAppStore((store) => store.setLoading);
  const setError = useAppStore((store) => store.setError);
  const addRicks = useAppStore((store) => store.addRicks);
  const clearRicks = useAppStore((store) => store.clearRicks);
  const setContinuation = useAppStore((store) => store.setContinuation);

  // if continuation is exist fetch for the next page when reach end of the list
  const reFetch = async () => {
    if (!continuation) return;

    setLoading(true);

    const response = await getNextRicks(continuation);

    if ((response as ErrorResponse).error) {
      clearRicks();
      setError((response as ErrorResponse).error);
      setLoading(false);
      return;
    }

    addRicks((response as RicksResponse).results);
    setContinuation((response as RicksResponse).info.next as string);

    setLoading(false);
  };

  return (
    <View className="flex-1 border-solid border-[1px] rounded-lg border-white/30 py-2 px-1">
      <Text
        className={cn("hidden text-white/50 mt-4 text-center", {
          block: error || ricks.length === 0,
        })}
      >
        {error ? error : "Search for Ricks..."}
      </Text>

      <FlatList
        data={ricks}
        onEndReached={reFetch}
        ItemSeparatorComponent={() => (
          <View className="w-full h-[1px] bg-white/30" />
        )}
        renderItem={(data) => <ListItem rick={data.item} />}
      />
    </View>
  );
}

const ListItem = React.memo(({ rick }: { rick: RickObject }) => {
  const search = useAppStore((store) => store.search);
  const selectedRicks = useAppStore((store) => store.selectedRicks);
  const selectRick = useAppStore((store) => store.selectRick);

  const selected = !!selectedRicks.find((sr) => sr.id === rick.id);

  // Highlight searched text part of names
  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <Text className="flex items-end text-white/50 flex-1 text-base">
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={i} className="text-white text-base font-bold">
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => selectRick(rick)}
      className={cn("flex-row items-center gap-2 p-3 my-1 mx-1 rounded-xl", {
        "bg-white/10": selected,
      })}
    >
      <Image className="w-10 h-10 rounded-md" src={rick.image} />
      {getHighlightedText(rick.name, search)}
      <Text className="text-white/50 text-xs">{`${rick.episode.length} episodes`}</Text>
    </TouchableOpacity>
  );
});
