import NavLayout from "@/components/nav-layout"

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavLayout>
      {children}
    </NavLayout>
  )
} 