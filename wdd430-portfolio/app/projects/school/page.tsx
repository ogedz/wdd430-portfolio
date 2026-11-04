import { getProjects } from '@/lib/projects-db';

export default async function SchoolProjects() {
  const projects = getProjects('school');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">School Projects</h2>
      <ul className="space-y-4">
        {projects.map(p => (
          <li key={p.id} className="border p-4 rounded bg-white text-gray-900">
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-gray-900">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}