import { Platform } from "react-native";

export function useDevice() {
  return Platform.OS;
}
