export function generateStaticParams() { return [{ courseId: "1" }, { courseId: "2" }, { courseId: "3" }]; }
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
