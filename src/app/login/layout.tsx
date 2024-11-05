import AuthLayout from "@/components/Login/AuthLayout";


export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
