import Link from 'next/link';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container mx-auto px-4 py-8">
      <nav className="mb-8 border-b pb-4 flex gap-4">
        <Link href="/projects" className="text-blue-600 hover:underline">Overview</Link> |{' '}
        <Link href="/projects/opensource" className="text-blue-600 hover:underline">Open Source</Link> |{' '}
        <Link href="/projects/school" className="text-blue-600 hover:underline">School</Link>
      </nav>
      {children}
    </section>
  );
}