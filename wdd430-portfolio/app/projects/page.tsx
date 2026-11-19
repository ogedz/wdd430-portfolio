import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link'; // <-- Added Link import
import ProjectSearch from '@/components/ProjectSearch';
import ProjectList from '@/components/ProjectList';
import { fetchFilteredProjects } from '@/lib/projects-db';

async function ProjectsList({ query, currentPage }: { query: string; currentPage: number }) {
  await connection();
  const projects = await fetchFilteredProjects(query, currentPage);

  if (projects.length === 0) {
    return <p className="text-white mt-4">No projects found matching "{query}"</p>;
  }

  return <ProjectList projects={projects} />;
}

// We wrap the data fetching in Suspense directly here
async function SearchResults({ searchParams }: { searchParams?: Promise<{ query?: string; page?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || '';
  const currentPage = Number(resolvedParams?.page) || 1;

  return <ProjectsList query={query} currentPage={currentPage} />;
}

export default function ProjectsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  return (
    <main className="container mx-auto px-4 py-8 text-gray-900">
      
      {/* Changed this section to include the flexbox and the button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <Link 
          href="/projects/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-md"
        >
          + Create Project
        </Link>
      </div>
      
      <ProjectSearch />
      
      <Suspense fallback={<div className="animate-pulse h-40 bg-gray-600 rounded-xl mt-4"></div>}>
        <SearchResults searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}