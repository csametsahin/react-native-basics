import AsyncStorage from "@react-native-async-storage/async-storage";

// this is similar to local storage on web allows us to save data on mobile i pictured this as asking users name on first
// and maybe we could use AsyncStorage for input on games.

export const setSelfUser = async (value: string) => {
  try {
    await AsyncStorage.setItem("self", value);
  } catch (e) {
    console.log("error occured while setting self");
  }
};

export const getSelf = async () => {
  try {
    const self = await AsyncStorage.getItem("self");
    return self;
  } catch (e) {
    console.log("error occured while getting self");
  }
};
