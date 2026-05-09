import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnWatch = nextUrl.pathname.startsWith("/watch");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnProfile = nextUrl.pathname.startsWith("/profile");

      const isProtected = isOnDashboard || isOnWatch || isOnProfile;

      if (isOnAdmin) {
        const role = (auth?.user as { role?: string })?.role;
        if (!isLoggedIn || role !== "admin") {
          return Response.redirect(new URL("/login", nextUrl));
        }
        return true;
      }

      if (isProtected) {
        if (isLoggedIn) return true;
        return false;
      }

      return true;
    },
  },
};
