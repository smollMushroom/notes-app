export function formatDate(withTimestamp = false) {
  const date = new Date();
  const dayName = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    "Jum'at",
    'Sabtu',
    'Minggu',
  ];
  const monthName = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const dayNumber = date.getDate()
  const day = dayName[date.getDay()];
  const month = monthName[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  
  if(withTimestamp){
    return `${day}, ${dayNumber} ${month} ${year} | ${hour}:${minutes}:${second}`;
  }

  return `${day}, ${dayNumber} ${month} ${year}`;
}
