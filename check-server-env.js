console.log("=== SERVER ENV CHECK ===");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "SET" : "NOT SET");
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "SET" : "NOT SET");
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL || "NOT SET");
console.log("NODE_ENV:", process.env.NODE_ENV || "NOT SET");

// Проверяем длину и корректность
if (process.env.GOOGLE_CLIENT_ID) {
  console.log("Client ID length:", process.env.GOOGLE_CLIENT_ID.length);
  console.log("Contains 'hpqi63qj':", process.env.GOOGLE_CLIENT_ID.includes('hpqi63qj'));
}
if (process.env.GOOGLE_CLIENT_SECRET) {
  console.log("Client Secret length:", process.env.GOOGLE_CLIENT_SECRET.length);
}
if (process.env.NEXTAUTH_SECRET) {
  console.log("NEXTAUTH_SECRET length:", process.env.NEXTAUTH_SECRET.length);
}
