// import { useState } from "react";
// import {
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { router } from "expo-router";
// import { useAuth } from "@/context/auth-context";

// export default function LoginScreen() {
//   const { login } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setError("");

//     if (!email.trim() || !password) {
//       setError("Email and password are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       await login(email.trim().toLowerCase(), password);

//       router.replace("/(tabs)/profile");
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : "Login failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <View style={styles.content}>
//         <Text style={styles.logo}>99</Text>
//         <Text style={styles.title}>Welcome Back 👋</Text>
//         <Text style={styles.subtitle}>
//           Login to continue shopping.
//         </Text>

//         {error ? <Text style={styles.error}>{error}</Text> : null}

//         <TextInput
//           style={styles.input}
//           placeholder="Email address"
//           placeholderTextColor="#888"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           autoCorrect={false}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#888"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           autoCapitalize="none"
//         />

//         <Pressable
//           style={({ pressed }) => [
//             styles.button,
//             pressed && styles.pressed,
//             loading && styles.disabled,
//           ]}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Login</Text>
//           )}
//         </Pressable>

//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Don't have an account?</Text>

//           <Pressable onPress={() => router.push("/auth/register")}>
//             <Text style={styles.link}> Register</Text>
//           </Pressable>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   content: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 24,
//   },

//   logo: {
//     fontSize: 42,
//     fontWeight: "800",
//     textAlign: "center",
//     marginBottom: 20,
//   },

//   title: {
//     fontSize: 27,
//     fontWeight: "700",
//     textAlign: "center",
//   },

//   subtitle: {
//     fontSize: 15,
//     color: "#666",
//     textAlign: "center",
//     marginTop: 8,
//     marginBottom: 28,
//   },

//   error: {
//     color: "#dc2626",
//     fontSize: 14,
//     marginBottom: 14,
//     textAlign: "center",
//   },

//   input: {
//     height: 52,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 14,
//     color: "#111",
//   },

//   button: {
//     height: 52,
//     backgroundColor: "#111",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 8,
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   pressed: {
//     opacity: 0.8,
//   },

//   disabled: {
//     opacity: 0.6,
//   },

//   footer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 24,
//   },

//   footerText: {
//     color: "#666",
//     fontSize: 14,
//   },

//   link: {
//     color: "#111",
//     fontSize: 14,
//     fontWeight: "700",
//   },
// });

import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/auth-context";

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      await login(
        email.trim().toLowerCase(),
        password
      );

      router.replace("/(tabs)/profile");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <View style={styles.content}>
        {/* Brand */}
        <View style={styles.brandContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logo}>99</Text>
          </View>

          <Text style={styles.brandName}>99</Text>

          <Text style={styles.tagline}>
            Everything you need. Just ₹999.
          </Text>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.title}>
            Welcome back
          </Text>

          <Text style={styles.subtitle}>
            Login to continue shopping
          </Text>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          ) : null}

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Email
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Password
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Login Button */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.buttonText}>
                  Login
                </Text>

                <Text style={styles.buttonArrow}>
                  →
                </Text>
              </>
            )}
          </Pressable>
        </View>

        {/* Register */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            New to 999?
          </Text>

          <Pressable
            onPress={() =>
              router.push("/auth/register")
            }
          >
            <Text style={styles.registerLink}>
              Create an account
            </Text>
          </Pressable>
        </View>

        {/* Bottom Brand */}
        <Text style={styles.bottomText}>
          Simple shopping. Honest price.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  /* Brand */

  brandContainer: {
    alignItems: "center",
    marginBottom: 28,
  },

  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -2,
  },

  brandName: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: -1,
  },

  tagline: {
    fontSize: 13,
    color: "#777777",
    marginTop: 4,
  },

  /* Card */

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 3,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#111111",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 6,
    marginBottom: 22,
  },

  /* Error */

  errorBox: {
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  errorText: {
    color: "#DC2626",
    fontSize: 13,
    lineHeight: 18,
  },

  /* Inputs */

  inputContainer: {
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#111111",
    backgroundColor: "#FAFAFA",
  },

  /* Button */

  button: {
    height: 54,
    backgroundColor: "#111111",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
    marginTop: -2,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  /* Footer */

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  footerText: {
    color: "#777777",
    fontSize: 14,
  },

  registerLink: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 5,
  },

  bottomText: {
    textAlign: "center",
    color: "#A0A0A0",
    fontSize: 11,
    marginTop: 28,
  },
});

