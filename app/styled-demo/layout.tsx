import NavLayout from "@/components/nav-layout"

export default function StyledDemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavLayout>
      {children}
    </NavLayout>
  )
} 