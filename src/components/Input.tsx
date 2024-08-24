import React from "react";
import { ActivityIndicator, Keyboard, TextInput, View } from "react-native";

// store
import useAppStore from "@/src/store/store";

// hooks
import useDebounce from "@/src/hooks/useDebounce";

// utils
import { getRicks } from "@/src/utils/fetchers";

// types
import { ErrorResponse, RicksResponse } from "@/src/types/types";

export default function Input() {
  const search = useAppStore((store) => store.search);
  const loading = useAppStore((store) => store.loading);
  const setSearch = useAppStore((store) => store.setSearch);
  const setLoading = useAppStore((store) => store.setLoading);
  const setError = useAppStore((store) => store.setError);
  const setRicks = useAppStore((store) => store.setRicks);
  const clearRicks = useAppStore((store) => store.clearRicks);
  const setContinuation = useAppStore((store) => store.setContinuation);

  const debounce = useDebounce(search, 1000);

  React.useEffect(() => {
    if (search) return;

    clearRicks();
  }, [search]);

  // fetch ricks on change search text (with debounce)
  const getSearchedRicks = async () => {
    if (!search) return;

    setLoading(true);

    const response = await getRicks(search);

    if ((response as ErrorResponse).error) {
      clearRicks();
      setError((response as ErrorResponse).error);
      setLoading(false);
      return;
    }

    setRicks((response as RicksResponse).results);
    setContinuation((response as RicksResponse).info.next as string);
    Keyboard.dismiss();

    setLoading(false);
  };

  React.useEffect(() => {
    getSearchedRicks();
  }, [debounce]);

  return (
    <View className="relative border-solid border-[1px] border-white/30 focus:border-white/80 my-4 rounded-lg transition-colors p-2">
      <TextInput
        placeholder="John Doe Rick"
        placeholderTextColor="#ffffff80"
        className="w-full h-[50px] text-lg text-white/80"
        defaultValue={search}
        onChangeText={(text) => {
          setError("");
          setSearch(text);
        }}
      />

      {loading ? (
        <ActivityIndicator className="absolute right-2 top-1/2 -translate-y-1/2" />
      ) : null}
    </View>
  );
}
