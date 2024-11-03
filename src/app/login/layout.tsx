import AuthLayout from "@/components/layout/login/AuthLayout";


export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
