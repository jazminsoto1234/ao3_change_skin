import { Editor } from '@/components/editor/Editor';
import { AuthErrorBanner } from '@/components/auth/AuthErrorBanner';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ auth_error?: string }>;
}) {
  const { auth_error } = await searchParams;

  return (
    <>
      <AuthErrorBanner show={auth_error === '1'} />
      <Editor />
    </>
  );
}
