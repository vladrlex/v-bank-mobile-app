import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STORAGE_KEYS = {
  FIRST_NAME: "@profile_firstName",
  LAST_NAME: "@profile_lastName",
  EMAIL: "@profile_email",
  BALANCE: "@profile_balance",
};

interface UserState {
  isLoading: boolean;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  balance: number;
}

type UserAction =
  | { type: "LOAD_SUCCESS"; payload: Omit<UserState, "isLoading"> }
  | { type: "UPDATE_USER"; payload: Partial<Omit<UserState, "isLoading">> };

const UserStateContext = createContext<UserState | undefined>(undefined);
const UserDispatchContext = createContext<
  React.Dispatch<UserAction> | undefined
>(undefined);

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "LOAD_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case "UPDATE_USER":
      return { ...state, ...action.payload };

    default:
      throw new Error("Невідома дія в UserContext");
  }
}

const initialState: UserState = {
  isLoading: true,
  firstName: null,
  lastName: null,
  email: null,
  balance: 0,
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fName, lName, mail, bal] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.FIRST_NAME),
          AsyncStorage.getItem(STORAGE_KEYS.LAST_NAME),
          AsyncStorage.getItem(STORAGE_KEYS.EMAIL),
          AsyncStorage.getItem(STORAGE_KEYS.BALANCE),
        ]);

        dispatch({
          type: "LOAD_SUCCESS",
          payload: {
            firstName: fName ?? "Владислав",
            lastName: lName ?? "Бондаренко",
            email: mail ?? "v.bondarenko.dev@gmail.com",
            balance: bal ? parseFloat(bal) : 999123,
          },
        });
      } catch (e) {
        console.error("Помилка завантаження даних у Контекст", e);
        dispatch({
          type: "LOAD_SUCCESS",
          payload: {
            firstName: "Владислав",
            lastName: "Бондаренко",
            email: "v.bondarenko.dev@gmail.com",
            balance: 0,
          },
        });
      }
    };
    loadData();
  }, []);

  if (state.isLoading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState має використовуватись в UserProvider");
  }
  return context;
};

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch має використовуватись в UserProvider");
  }
  return context;
};

export const updateUserProfile = async (
  dispatch: React.Dispatch<UserAction>,
  updates: Partial<Omit<UserState, "isLoading">>,
) => {
  try {
    const promises = [];
    if (updates.firstName !== undefined) {
      promises.push(
        AsyncStorage.setItem(STORAGE_KEYS.FIRST_NAME, updates.firstName || ""),
      );
    }
    if (updates.lastName !== undefined) {
      promises.push(
        AsyncStorage.setItem(STORAGE_KEYS.LAST_NAME, updates.lastName || ""),
      );
    }
    if (updates.email !== undefined) {
      promises.push(
        AsyncStorage.setItem(STORAGE_KEYS.EMAIL, updates.email || ""),
      );
    }

    await Promise.all(promises);

    dispatch({ type: "UPDATE_USER", payload: updates });
  } catch (e) {
    console.error("Помилка збереження даних у Контексті", e);
    throw e;
  }
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5ff",
  },
});
