import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/auth-context";
import { SafeAreaView } from "react-native-safe-area-context";

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  danger?: boolean;
}


function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
  danger = false,
}: MenuItemProps) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>

      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, danger && styles.dangerText]}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        ) : null}
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const {
    user,
    isLoading,
    isAuthenticated,
    logout,
  } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              router.replace("/auth/login");
            } catch (error) {
              Alert.alert(
                "Logout Failed",
                error instanceof Error
                  ? error.message
                  : "Unable to logout. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  if (!isAuthenticated || !user) {
    return (
      <View style={styles.guestContainer}>
        <Text style={styles.guestIcon}>👋</Text>

        <Text style={styles.title}>Welcome to 99</Text>

        <Text style={styles.subtitle}>
          Login to access your account, orders and addresses.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.primaryButtonText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.secondaryButtonText}>
            Create Account
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}> 
      <ScrollView style={styles.container} 
      contentContainerStyle={styles.content} 
      showsVerticalScrollIndicator={false}
      >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.welcomeText}>Welcome back 👋</Text>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      {/* User Information */}
      <Text style={styles.sectionTitle}>User Information</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{user.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>

        {user.phone ? (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user.phone}</Text>
          </View>
        ) : null}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Account Type</Text>
          <Text style={styles.infoValue}>{user.role}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email Status</Text>
          <Text
            style={[
              styles.infoValue,
              user.isEmailVerified
                ? styles.verified
                : styles.notVerified,
            ]}
          >
            {user.isEmailVerified ? "Verified" : "Not Verified"}
          </Text>
        </View>
      </View>

      {/* My Activity */}
      <Text style={styles.sectionTitle}>My Activity</Text>

      <View style={styles.menuCard}>
        <MenuItem
          icon="📦"
          title="My Orders"
          subtitle="View and manage your orders"
          onPress={() => router.push("/orders")}
        />

        <View style={styles.menuDivider} />

        <MenuItem
          icon="📍"
          title="My Addresses"
          subtitle="Manage your delivery addresses"
          onPress={() => router.push("/address")}
        />

        <View style={styles.menuDivider} />

        <MenuItem
            icon="❤️"
            title="Wishlist"
            subtitle="Your saved products"
            onPress={() => router.push("/wishlist")}
          />
      </View>

      {/* Help & Support */}
      <Text style={styles.sectionTitle}>Help & Support</Text>

      <View style={styles.menuCard}>
        <MenuItem
          icon="❓"
          title="Support & FAQ"
          subtitle="Get answers to common questions"
          onPress={() => router.push("/support-faq")}
        />

        <View style={styles.menuDivider} />

        <MenuItem
            icon="📞"
            title="Contact Us"
            subtitle="Need help? Contact our team"
            onPress={() => router.push("/contact-us")}
          />
      </View>

      {/* Legal */}
      <Text style={styles.sectionTitle}>Legal</Text>

      <View style={styles.menuCard}>
        <MenuItem
            icon="📜"
            title="Terms & Conditions"
            onPress={() => router.push("/terms-conditions")}
          />

          <View style={styles.menuDivider} />

          <MenuItem
            icon="🔒"
            title="Privacy Policy"
            onPress={() => router.push("/privacy-policy")}
          />
      </View>

      {/* Account */}
      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.menuCard}>
      <View style={styles.menuDivider} />
        <MenuItem
          icon="🚪"
          title="Logout"
          onPress={handleLogout}
          danger
        />
      </View>

      <Text style={styles.version}>99 App • Version 1.0.0</Text>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
     backgroundColor: "#F2F6FF",
  },

  container: {
    flex: 1,
     backgroundColor: "#F2F6FF",
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  headerInfo: {
    flex: 1,
  },

  welcomeText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 3,
  },

  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  userEmail: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  /* Section */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 6,
    marginBottom: 10,
  },

  /* User information */
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 18,
  },

  infoRow: {
  flexDirection: "row",
  alignItems: "center",
  minHeight: 48,
  paddingVertical: 7,
},

infoLabel: {
  width: 105,
  fontSize: 13,
  color: "#6B7280",
},

infoValue: {
  flex: 1,
  fontSize: 13,
  fontWeight: "600",
  color: "#111827",
  textAlign: "right",
},

  verified: {
    color: "#16A34A",
  },

  notVerified: {
    color: "#DC2626",
  },

  /* Menu */
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 18,
    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 66,
    paddingVertical: 10,
  },

  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  iconText: {
    fontSize: 19,
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  menuSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 3,
  },

  arrow: {
    fontSize: 24,
    color: "#9CA3AF",
    marginLeft: 8,
  },

  menuDivider: {
    height: 1,
     backgroundColor: "#F2F6FF",
  },

  dangerText: {
    color: "#DC2626",
  },

  /* Buttons */
  primaryButton: {
    backgroundColor: "#111827",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#111827",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },

  /* Guest */
  guestContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F8FAFC",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
  },

  guestIcon: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 28,
  },

  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
    marginBottom: 8,
  },
});
