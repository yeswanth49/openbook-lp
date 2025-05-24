import React from 'react';

export default function Page() {
  return (
    <main className="p-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Section One</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>

      <div className="flex items-center text-gray-400">
        <span className="flex-grow border-t border-gray-300" />
        <span className="mx-4">+</span>
        <span className="flex-grow border-t border-gray-300" />
      </div>

      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Section Two</h1>
        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>
      </section>
    </main>
  );
} 