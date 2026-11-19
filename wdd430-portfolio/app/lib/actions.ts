'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ProjectFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  technologies: z.string().min(2, 'Add at least one technology.'),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    technologies?: string[];
  };
  message?: string | null;
};

export async function createProject(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = ProjectFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create project.',
    };
  }

  const { title, description, technologies } = validatedFields.data;

  try {
    await sql`
      INSERT INTO projects (title, description, technologies)
      VALUES (${title}, ${description}, ${technologies})
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to create project.' };
  }

  revalidatePath('/projects');
  redirect('/projects');
  
  return prevState; 
}