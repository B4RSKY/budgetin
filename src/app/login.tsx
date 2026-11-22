import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function LoginScreen() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [callsign, setCallsign] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAuth = async () => {
    const cleanEmail = email.trim();
    const cleanCallsign = callsign.trim();

    if (!cleanEmail || !password) {
      setErrorMsg("Email dan kata sandi wajib diisi.");
      return;
    }

    if (isRegistering && !cleanCallsign) {
      setErrorMsg("Nama panggilan wajib diisi saat mendaftar.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Kata sandi minimal 6 karakter.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      setSuccessMsg(null);

      if (isRegistering) {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            data: {
              callsign: cleanCallsign,
              role: "user",
            },
          },
        });

        if (error) throw error;

        setSuccessMsg("Pendaftaran berhasil! Mengalihkan ke Beranda...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });

        if (error) throw error;
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan autentikasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.badge}>DOMPETKU CLOUD</Text>
          <Text style={styles.title}>
            {isRegistering ? "Daftar Akun Baru" : "Selamat Datang"}
          </Text>
          <Text style={styles.subtitle}>
            {isRegistering
              ? "Buat akun untuk mencadangkan catatan keuangan Anda di cloud"
              : "Masuk untuk mengakses catatan keuangan pribadi Anda"}
          </Text>
        </View>

        <View style={styles.card}>
          {isRegistering && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>NAMA PANGGILAN</Text>
              <TextInput
                style={styles.input}
                placeholder="Contoh: Budi Santoso"
                placeholderTextColor="#94A3B8"
                value={callsign}
                onChangeText={setCallsign}
                editable={!loading}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ALAMAT EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="nama@email.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>KATA SANDI</Text>
            <TextInput
              style={styles.input}
              placeholder="Minimal 6 karakter"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          </View>

          {errorMsg && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          )}

          {successMsg && (
            <View style={styles.successBox}>
              <Text style={styles.successText}>{successMsg}</Text>
            </View>
          )}

          <Pressable
            style={[styles.primaryButton, loading && styles.buttonDisabled]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {isRegistering ? "Daftar Sekarang" : "Masuk ke Aplikasi"}
              </Text>
            )}
          </Pressable>

          <Pressable
            style={styles.switchButton}
            disabled={loading}
            onPress={() => {
              setIsRegistering(!isRegistering);
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
          >
            <Text style={styles.switchText}>
              {isRegistering
                ? "Sudah punya akun? Masuk di sini"
                : "Belum punya akun? Daftar di sini"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  badge: {
    fontSize: 12,
    fontWeight: "700",
    color: "#15803D",
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0F172A",
  },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "500",
  },
  successBox: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  successText: {
    color: "#15803D",
    fontSize: 13,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "#15803D",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: "#86EFAC",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  switchButton: {
    marginTop: 18,
    alignItems: "center",
  },
  switchText: {
    color: "#15803D",
    fontSize: 13,
    fontWeight: "600",
  },
});
