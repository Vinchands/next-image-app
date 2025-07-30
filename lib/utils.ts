import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  
  if (!name) return 'NN'
  
  const cleanName = name.trim();
  
  if (cleanName.includes(' ') || cleanName.includes('_') || cleanName.includes('-')) {
    const parts = cleanName.split(/[\s_-]+/);
    return parts.map(part => part[0]?.toUpperCase()).join('');
  }
  
  const camelCaseParts = cleanName.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])/g);
  if (camelCaseParts && camelCaseParts.length > 1) {
    return camelCaseParts.map(part => part[0].toUpperCase()).join('');
  }
  
  return cleanName.slice(0, 2).toUpperCase();
}

export function generateUniqueUsername(name: string) {
  const n = name.trim().toLowerCase().replace(/\s+/g, '-')
  const t = performance.now().toString(36).replace('.', '').slice(-5)
  const r = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).slice(-5)
  return `${n}-${t}${r}`
}
