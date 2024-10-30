'use server';

import Company from '@/app/models/companies-model';

const addCompany = async (company: FormData) => {
  try {
    const title = company.get('title');
    const description = company.get('description');

    const newPost = new Company({ title, description });
    return newPost.save();
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

export { addCompany };
