import { _iosVerticalOffset, _screenPadding } from "@/constants/Metrics";
import { PropsWithChildren } from "react";
import { Platform } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const BaseScreen = ({ children }: PropsWithChildren) => {
    const { top, bottom, left, right } = useSafeAreaInsets();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? _iosVerticalOffset : 0}
            style={{
                paddingTop: top || _screenPadding,
                paddingBottom: bottom || _screenPadding,
                paddingLeft: left || _screenPadding,
                paddingRight: right || _screenPadding,
                flex: 1,
            }}
        >
            {children}
        </KeyboardAvoidingView>
    );
};
