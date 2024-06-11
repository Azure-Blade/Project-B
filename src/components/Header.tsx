import React from 'react';

export default function Header() {
  return (
    <header className='h-16'>
      <nav className='flex justify-end gap-5 p-4'>
        <a href='/blogs'>Blogs</a>
        <a href='/login'>Login</a>
        <a href='/register'>Register</a>
        <a href='/about'>About</a>
        <a href='/newsletter'>Newsletter</a>
      </nav>
    </header>
  );
}
