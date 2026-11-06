import { cookies, headers } from 'next/headers';

export default async function DocNotFound() {
    const headerStore = await headers();
    const cookieStore = await cookies();
    const headerLocale = headerStore.get('x-locale');
    const locale =
        headerLocale === 'en' ||
        (!headerLocale && cookieStore.get('emlinked_locale')?.value === 'en')
            ? 'en'
            : 'nl';

    const copy =
        locale === 'en'
            ? {
                  title: 'Page not found',
                  body: "This manual page doesn't exist yet in Sanity.",
              }
            : {
                  title: 'Pagina niet gevonden',
                  body: 'Deze handleiding bestaat nog niet in Sanity.',
              };

    return (
        <div className='space-y-6'>
            <div className='border-b border-teal pb-2'>
                <h1 className='font-display text-2xl font-bold tracking-tight text-navy-900'>
                    {copy.title}
                </h1>
                <p className='text-sm text-navy-700 mt-2'>{copy.body}</p>
            </div>
        </div>
    );
}
