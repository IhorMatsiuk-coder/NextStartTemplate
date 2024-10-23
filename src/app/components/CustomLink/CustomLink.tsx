import Link from 'next/link';

interface ICustomLinkProps {
  title: string;
  path: string;
  href: string;
}

const CustomLink = ({ title, path, href }: ICustomLinkProps) => {
  return (
    <Link
      style={{ textDecoration: 'none', color: path === href ? '#706080' : 'white' }}
      href={href}
    >
      {title}
    </Link>
  );
};

export default CustomLink;
