import { Brain } from 'lucide-react';
import React from 'react';

function Logo() {
  return (
    <a href="/" className="flex items-center ">
      <Brain className="h-24 w-36 stroke-amber-500 stroke-[1.5]" />
      <p className="text-orange-500 stroke-amber-500 text-2xl">BrainBot</p>
    </a>
  );
}

export default Logo;
