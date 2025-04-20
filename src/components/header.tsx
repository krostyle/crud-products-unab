import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full bg-gray-800 text-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Productos</h1>
      {pathname !== '/' && (
        <Link href="/">
          <Button variant="secondary">Volver al Home</Button>
        </Link>
      )}
    </header>
  );
}
