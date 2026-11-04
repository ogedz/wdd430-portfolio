import { getProjects } from '@/lib/projects-db';

export default async function OpenSourceProjects() {
  // Fetching directly from the database logic (Server Component)
  // You can also fetch from your API route: await fetch('http://localhost:3000/api/projects?type=opensource')
  const projects = getProjects('opensource'); 

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Open Source Projects</h2>
      <ul className="space-y-4">
        {projects.map(p => (
          <li key={p.id} className="border p-4 rounded bg-white text-gray-900">
            <h3 className="font-bold text-gray-900">{p.title}</h3>
            <p className="text-gray-600">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}