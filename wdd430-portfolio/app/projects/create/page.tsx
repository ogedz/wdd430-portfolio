'use client';

import { useActionState } from 'react';
import { createProject, type State } from '@/app/lib/actions';
import Link from 'next/link';

const initialState: State = { message: null, errors: {} };

export default function CreateProjectPage() {
  const [state, formAction, isPending] = useActionState(createProject, initialState);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      
      <form action={formAction} className="space-y-4 bg-white p-6 rounded shadow text-gray-900">
        <div>
          <label htmlFor="title" className="block font-medium">Title</label>
          <input id="title" name="title" aria-describedby="title-error" className="w-full border p-2 rounded" />
          <div id="title-error" aria-live="polite">
            {state.errors?.title?.map(err => <p key={err} className="text-red-500 text-sm mt-1">{err}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea id="description" name="description" aria-describedby="desc-error" className="w-full border p-2 rounded" />
          <div id="desc-error" aria-live="polite">
            {state.errors?.description?.map(err => <p key={err} className="text-red-500 text-sm mt-1">{err}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="technologies" className="block font-medium">Technologies (comma separated)</label>
          <input id="technologies" name="technologies" aria-describedby="tech-error" className="w-full border p-2 rounded" />
          <div id="tech-error" aria-live="polite">
            {state.errors?.technologies?.map(err => <p key={err} className="text-red-500 text-sm mt-1">{err}</p>)}
          </div>
        </div>

        {state.message && <p className="text-red-600 font-bold">{state.message}</p>}

        <div className="flex gap-4">
          <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
            {isPending ? 'Saving...' : 'Save Project'}
          </button>
          <Link href="/projects" className="bg-gray-200 px-4 py-2 rounded">Cancel</Link>
        </div>
      </form>
    </div>
  );
}