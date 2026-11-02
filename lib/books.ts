export type BookFormat = 'Hardcover' | 'Paperback' | 'Audiobook' | 'E-Book'

export type Book = {
  id: string
  title: string
  author: string
  isbn: string
  genres: string[]
  rating: number
  year: number
  pages: number
  match: number
  format: BookFormat
  description: string
  reason: string
}

export function coverUrl(isbn: string) {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`
}

const list: Book[] = [
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '9780441172719',
    genres: ['Sci-Fi', 'Epic', 'Classic'],
    rating: 4.7,
    year: 1965,
    pages: 688,
    match: 98,
    format: 'Paperback',
    description:
      'On the desert planet Arrakis, young Paul Atreides is thrust into a deadly war over the most precious substance in the universe — and a destiny greater than he could imagine.',
    reason:
      'You loved the world-building in The Hobbit and rated two epic sagas 5 stars this year. Dune pairs that sweeping scope with political intrigue you tend to highlight.',
  },
  {
    id: 'midnight-library',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    isbn: '9780525559474',
    genres: ['Contemporary', 'Fantasy', 'Philosophical'],
    rating: 4.3,
    year: 2020,
    pages: 304,
    match: 94,
    format: 'Hardcover',
    description:
      'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    reason:
      'Your notes on Atomic Habits focus on choices and identity. This novel explores the same questions through a warm, hopeful story.',
  },
  {
    id: 'the-hobbit',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    genres: ['Fantasy', 'Adventure', 'Classic'],
    rating: 4.8,
    year: 1937,
    pages: 300,
    match: 99,
    format: 'Paperback',
    description:
      'Bilbo Baggins is a hobbit who enjoys a comfortable life — until the wizard Gandalf and a company of dwarves sweep him away on a quest for treasure guarded by the dragon Smaug.',
    reason: 'A cornerstone of your reading taste — the book that started your fantasy streak.',
  },
  {
    id: 'name-of-the-wind',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    isbn: '9780756404741',
    genres: ['Fantasy', 'Coming of Age'],
    rating: 4.6,
    year: 2007,
    pages: 662,
    match: 96,
    format: 'Paperback',
    description:
      'Kvothe, a legendary figure now living as an innkeeper, tells the true story of his life — from a gifted child of traveling players to the most notorious wizard his world has ever seen.',
    reason:
      'Readers who loved The Hobbit rate this lyrical, character-driven fantasy 4.7 on average. Its storyteller framing mirrors the tone you enjoyed.',
  },
  {
    id: 'fellowship',
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928210',
    genres: ['Fantasy', 'Epic', 'Classic'],
    rating: 4.7,
    year: 1954,
    pages: 432,
    match: 97,
    format: 'Paperback',
    description:
      'Frodo Baggins inherits a ring of terrible power and sets out with eight companions on a perilous journey to destroy it in the fires of Mount Doom.',
    reason: 'The natural next step after The Hobbit — same world, same author, bigger stakes.',
  },
  {
    id: 'game-of-thrones',
    title: 'A Game of Thrones',
    author: 'George R.R. Martin',
    isbn: '9780553593716',
    genres: ['Fantasy', 'Political', 'Epic'],
    rating: 4.5,
    year: 1996,
    pages: 835,
    match: 91,
    format: 'Paperback',
    description:
      'Noble families vie for control of the Iron Throne of the Seven Kingdoms of Westeros, while an ancient threat stirs beyond the Wall.',
    reason:
      'You enjoy large casts and morally complex characters. This is the most-read epic among people with your shelf.',
  },
  {
    id: 'mistborn',
    title: 'Mistborn: The Final Empire',
    author: 'Brandon Sanderson',
    isbn: '9780765311788',
    genres: ['Fantasy', 'Heist'],
    rating: 4.6,
    year: 2006,
    pages: 541,
    match: 93,
    format: 'Paperback',
    description:
      'In a world where ash falls from the sky, a street thief discovers she has rare powers and joins a crew planning the ultimate heist against an immortal emperor.',
    reason: 'Fast-paced fantasy with a brilliant magic system — perfect after a classic quest.',
  },
  {
    id: 'zorba',
    title: 'Zorba the Greek',
    author: 'Nikos Kazantzakis',
    isbn: '9780684825540',
    genres: ['Classic', 'Literary Fiction', 'Greek'],
    rating: 4.2,
    year: 1946,
    pages: 320,
    match: 89,
    format: 'Paperback',
    description:
      'A reserved young intellectual meets the exuberant Alexis Zorba on Crete, and learns to embrace life with passion, music, and fearless joy.',
    reason: 'Trending #1 across Athens and Thessaloniki this month — a Greek classic you have not read yet.',
  },
  {
    id: 'shadow-of-the-wind',
    title: 'The Shadow of the Wind',
    author: 'Carlos Ruiz Zafón',
    isbn: '9780143034902',
    genres: ['Mystery', 'Historical Fiction'],
    rating: 4.6,
    year: 2001,
    pages: 487,
    match: 95,
    format: 'Paperback',
    description:
      'In post-war Barcelona, a boy discovers a mysterious book in the Cemetery of Forgotten Books — and someone is systematically destroying every copy.',
    reason: 'A love letter to books themselves. Your Historical Fiction picks make this a strong match.',
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9780735211292',
    genres: ['Self-Improvement', 'Psychology'],
    rating: 4.4,
    year: 2018,
    pages: 320,
    match: 92,
    format: 'Hardcover',
    description:
      'A proven framework for improving every day. Learn how tiny changes in behavior compound into remarkable results.',
    reason: 'You set a weekly reading goal — this book is the playbook for sticking to it.',
  },
  {
    id: 'circe',
    title: 'Circe',
    author: 'Madeline Miller',
    isbn: '9780316556347',
    genres: ['Mythology', 'Fantasy', 'Greek'],
    rating: 4.5,
    year: 2018,
    pages: 400,
    match: 94,
    format: 'Paperback',
    description:
      'The banished witch daughter of Helios reclaims her story on the island of Aiaia, crossing paths with gods, monsters, and Odysseus himself.',
    reason: 'Greek mythology reimagined — hugely popular with readers in Greece right now.',
  },
  {
    id: 'odyssey',
    title: 'The Odyssey',
    author: 'Homer',
    isbn: '9780140268867',
    genres: ['Classic', 'Epic', 'Greek'],
    rating: 4.3,
    year: -700,
    pages: 560,
    match: 88,
    format: 'Paperback',
    description:
      'Odysseus spends ten years fighting his way home from Troy, facing monsters, gods, and temptations, while his wife Penelope holds off a horde of suitors.',
    reason: 'The original adventure epic — the ancestor of every quest story you love.',
  },
  {
    id: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    isbn: '9780593135204',
    genres: ['Sci-Fi', 'Adventure'],
    rating: 4.8,
    year: 2021,
    pages: 496,
    match: 97,
    format: 'Audiobook',
    description:
      'Ryland Grace wakes up alone on a spaceship with no memory — and the fate of humanity depends on him solving an impossible scientific mystery.',
    reason: 'The audiobook narration by Ray Porter is award-winning — perfect for your commute listening hours.',
  },
  {
    id: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    isbn: '9780062316097',
    genres: ['History', 'Non-Fiction'],
    rating: 4.4,
    year: 2011,
    pages: 464,
    match: 90,
    format: 'Audiobook',
    description:
      'A brief history of humankind — how Homo sapiens came to dominate the Earth, from the Cognitive Revolution to the present day.',
    reason: 'Big-picture non-fiction that pairs nicely with your Self-Improvement reads.',
  },
  {
    id: 'educated',
    title: 'Educated',
    author: 'Tara Westover',
    isbn: '9780399590504',
    genres: ['Memoir', 'Non-Fiction'],
    rating: 4.5,
    year: 2018,
    pages: 352,
    match: 87,
    format: 'E-Book',
    description:
      'Born to survivalists in the mountains of Idaho, Tara Westover never set foot in a classroom until age seventeen — then went on to earn a PhD from Cambridge.',
    reason: 'An inspiring true story of transformation — matches your interest in personal growth.',
  },
  {
    id: 'alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '9780062315007',
    genres: ['Philosophical', 'Fable'],
    rating: 4.1,
    year: 1988,
    pages: 208,
    match: 86,
    format: 'E-Book',
    description:
      'Santiago, an Andalusian shepherd boy, travels to the Egyptian desert in search of treasure, and discovers the wisdom of listening to his heart.',
    reason: 'A short, quotable journey story — ideal for a weekend e-read.',
  },
  {
    id: 'thinking-fast-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    isbn: '9780374533557',
    genres: ['Psychology', 'Non-Fiction'],
    rating: 4.2,
    year: 2011,
    pages: 499,
    match: 88,
    format: 'Audiobook',
    description:
      'Nobel laureate Daniel Kahneman explains the two systems that drive the way we think — and how they shape our judgments and decisions.',
    reason: 'Goes deeper into the psychology behind the habits you are building.',
  },
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    genres: ['Dystopian', 'Classic'],
    rating: 4.6,
    year: 1949,
    pages: 328,
    match: 90,
    format: 'Paperback',
    description:
      'Winston Smith works for the Ministry of Truth in a totalitarian state where Big Brother is always watching — until he dares to rebel.',
    reason: 'A must-read classic loved by readers with your taste.',
  },
  {
    id: 'song-of-achilles',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    isbn: '9780062060624',
    genres: ['Mythology', 'Romance', 'Greek'],
    rating: 4.6,
    year: 2011,
    pages: 416,
    match: 93,
    format: 'Paperback',
    description:
      'A tale of gods, kings, immortal fame, and the human heart — the story of Achilles and Patroclus retold with breathtaking beauty.',
    reason: 'Lyrical Greek mythology retelling — a favorite among readers in Greece.',
  },
  {
    id: 'evelyn-hugo',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    isbn: '9781501161933',
    genres: ['Historical Fiction', 'Romance'],
    rating: 4.5,
    year: 2017,
    pages: 400,
    match: 89,
    format: 'Paperback',
    description:
      'Aging Hollywood icon Evelyn Hugo finally tells the truth about her glamorous and scandalous life to an unknown magazine reporter.',
    reason: 'Your Historical Fiction pick with the highest community rating this month.',
  },
  {
    id: 'crawdads',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    isbn: '9780735219090',
    genres: ['Mystery', 'Literary Fiction'],
    rating: 4.4,
    year: 2018,
    pages: 384,
    match: 85,
    format: 'Paperback',
    description:
      'For years, rumors of the "Marsh Girl" haunted Barkley Cove. When a local man is found dead, the town immediately suspects Kya Clark.',
    reason: 'Atmospheric mystery with a strong sense of place — like The Shadow of the Wind.',
  },
]

export const books: Record<string, Book> = Object.fromEntries(list.map((b) => [b.id, b]))
export const allBooks = list

const pick = (ids: string[]) => ids.map((id) => books[id])

export const featuredBook = books['dune']

export const homeRows = [
  {
    id: 'because-hobbit',
    title: 'Because You Read The Hobbit',
    books: pick(['name-of-the-wind', 'fellowship', 'game-of-thrones', 'mistborn', 'odyssey']),
  },
  {
    id: 'trending-greece',
    title: 'Top Books Trending in Greece',
    books: pick(['zorba', 'shadow-of-the-wind', 'atomic-habits', 'circe', 'song-of-achilles']),
    ranked: true,
  },
  {
    id: 'audio-ebooks',
    title: 'Recommended Audiobooks & E-Books',
    books: pick(['project-hail-mary', 'sapiens', 'educated', 'alchemist', 'thinking-fast-slow']),
  },
]

export const currentlyReading = { book: books['atomic-habits'], page: 142 }
export const recentlyRead = pick(['the-hobbit', '1984', 'song-of-achilles', 'alchemist', 'educated'])
export const defaultWishlist = ['midnight-library', 'evelyn-hugo', 'crawdads', 'project-hail-mary', 'circe', 'sapiens']
export const lastRead = books['the-hobbit']

export function similarBooks(book: Book, count = 5) {
  return list
    .filter((b) => b.id !== book.id && b.genres.some((g) => book.genres.includes(g)))
    .sort((a, b) => b.match - a.match)
    .slice(0, count)
}
