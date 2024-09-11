import storage from "@react-native-async-storage/async-storage";

// const storage = new MMKV();

export const StorageKeys = {
  token: "fitflow-app-token",
  user: "user",
} as const;

// mmkv
// export class Storage {
//   static set(key: keyof typeof StorageKeys, value: any): boolean {
//     try {
//       storage.set(key, JSON.stringify(value));
//       return true;
//     } catch {
//       return false;
//     }
//   }

//   static get(key: keyof typeof StorageKeys): any | null {
//     try {
//       const data = storage.getString(key);
//       return data ? JSON.parse(data) : null;
//     } catch {
//       return null;
//     }
//   }

//   /**
//    * Removes something from storage.
//    *
//    * @param key The key to kill.
//    */
//   static async remove(key: keyof typeof StorageKeys): Promise<void> {
//     try {
//       await AsyncStorage.removeItem(key);
//     } catch {}
//   }

//   /**
//    * Burn it all to the ground.
//    */
//   static async clear(): Promise<void> {
//     try {
//       await AsyncStorage.clear();
//     } catch {}
//   }

//   static async currentUser(): Promise<any | null> {
//     return this.get("user");
//   }
// }

//async storage
export class Storage {
  static async set(key: keyof typeof StorageKeys, value: any): Promise<any> {
    try {
      await storage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  static async get(key: keyof typeof StorageKeys): Promise<any> {
    try {
      const data = await storage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  /**
   * Removes something from storage.
   *
   * @param key The key to kill.
   */
  static async remove(key: keyof typeof StorageKeys): Promise<void> {
    try {
      await storage.removeItem(key);
    } catch {}
  }

  /**
   * Burn it all to the ground.
   */
  static async clear(): Promise<void> {
    try {
      await storage.clear();
    } catch {}
  }

  static async currentUser(): Promise<any | null> {
    return this.get("user");
  }
}
// /**
//  * Loads a string from storage.
//  *
//  * @param key The key to fetch.
//  */
// export async function loadString(key: string): Promise<string | null> {
//   try {
//     return await AsyncStorage.getItem(key);
//   } catch {
//     // not sure why this would fail... even reading the RN docs I'm unclear
//     return null;
//   }
// }

// /**
//  * Saves a string to storage.
//  *
//  * @param key The key to fetch.
//  * @param value The value to store.
//  */
// export async function saveString(key: string, value: string): Promise<boolean> {
//   try {
//     await AsyncStorage.setItem(key, value);
//     return true;
//   } catch {
//     return false;
//   }
// }

// /**
//  * Removes something from storage.
//  *
//  * @param key The key to kill.
//  */
// export async function remove(key: string): Promise<void> {
//   try {
//     await AsyncStorage.removeItem(key);
//   } catch {}
// }

// /**
//  * Burn it all to the ground.
//  */
// export async function clear(): Promise<void> {
//   try {
//     await AsyncStorage.clear();
//   } catch {}
// }
