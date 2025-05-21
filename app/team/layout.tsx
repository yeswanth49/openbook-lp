import NavLayout from "@/components/nav-layout"

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavLayout>
      {children}
    </NavLayout>
  )
} 