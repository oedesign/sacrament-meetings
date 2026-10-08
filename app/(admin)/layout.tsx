import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import SignOutButton from '@/components/SignOutButton';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <>
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Bishopric Management
            </p>
            <p className="text-xs text-gray-500">
              Signed in as {session.user.name}
            </p>
          </div>

          <SignOutButton />
        </div>
      </div>

      {children}
    </>
  );
}
