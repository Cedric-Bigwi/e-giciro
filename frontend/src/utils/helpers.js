export function formatRWF(amount) {
  if (amount === null || amount === undefined) return '—';
  return new Intl.NumberFormat('en-RW', { maximumFractionDigits: 0 }).format(amount) + ' RWF';
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  const intervals = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60]
  ];
  for (const [label, secs] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

export function categoryLabel(value) {
  const map = {
    rice: 'Rice',
    cooking_oil: 'Cooking Oil',
    sugar: 'Sugar',
    maize_flour: 'Maize Flour',
    other: 'Other'
  };
  return map[value] || value;
}

export function roleLabel(value) {
  const map = {
    consumer: 'Consumer',
    shop_owner: 'Shop Owner',
    wholesaler: 'Wholesaler',
    manufacturer: 'Manufacturer',
    admin: 'Admin'
  };
  return map[value] || value;
}
