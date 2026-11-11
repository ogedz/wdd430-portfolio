import { Suspense } from 'react';
import { connection } from 'next/server';
import ProjectSearch from '@/components/ProjectSearch';
import ProjectList from '@/components/ProjectList';
import { fetchFilteredProjects } from '@/lib/projects-db';

// 1. The component that does the actual searching
async function ProjectsList({ query, currentPage }: { query: string; currentPage: number }) {
  await connection();
  const projects = await fetchFilteredProjects(query, currentPage);

  if (projects.length === 0) {
    return <p className="text-white mt-4">No projects found matching "{query}"</p>;
  }

  return <ProjectList projects={projects} />;
}

// 2. The component that reads the search params
async function ProjectsContent(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Suspense fallback={<div className="h-12 w-full max-w-md bg-gray-200 animate-pulse rounded-lg mb-6"></div>}>
        <ProjectSearch />
      </Suspense>
      
      <Suspense fallback={<div className="animate-pulse h-40 bg-gray-600 rounded-xl mt-4"></div>}>
        <ProjectsList query={query} currentPage={currentPage} />
      </Suspense>
    </>
  );
}

// 3. The main page that renders instantly (with a skeleton while waiting)
export default function ProjectsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  return (
    <main className="container mx-auto px-4 py-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-white">Projects</h1>
      
      {/* Wrap the whole thing in Suspense to silence the runtime data warning */}
      <Suspense fallback={<div className="text-white animate-pulse">Loading projects...</div>}>
        <ProjectsContent searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}