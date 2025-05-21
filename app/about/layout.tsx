import NavLayout from "@/components/nav-layout"

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavLayout>
      {children}
    </NavLayout>
  )
} 