/**
 * Announcement Model (Homework)
 * In-memory storage without database connection.
 * Implements full CRUD operations.
 */
class AnnouncementModel {
  constructor() {
    this.announcements = [
      {
        id: 1,
        title: 'Alumni Homecoming Day 2026',
        content: 'Join us on campus for our annual alumni reunion event with networking sessions and workshops.',
        category: 'Event',
        author: 'Rectorate',
        created_at: new Date('2026-10-01T10:00:00.000Z')
      },
      {
        id: 2,
        title: 'Tech Career Fair Registrations Open',
        content: 'Top tech companies are recruiting our graduates. Register before October 15th.',
        category: 'Career',
        author: 'Career Center',
        created_at: new Date('2026-10-03T12:30:00.000Z')
      },
      {
        id: 3,
        title: 'Mentorship Program Kickoff',
        content: 'Connect with experienced alumni mentors in your industry. Applications are now live.',
        category: 'Mentorship',
        author: 'Alumni Association',
        created_at: new Date('2026-10-05T09:15:00.000Z')
      }
    ];
    this.nextId = 4;
  }

  // READ (All)
  getAll() {
    return [...this.announcements];
  }

  // READ (One by ID)
  getById(id) {
    const item = this.announcements.find(a => a.id === parseInt(id));
    return item ? { ...item } : null;
  }

  // CREATE
  create(data) {
    const { title, content, category, author } = data;
    const newItem = {
      id: this.nextId++,
      title: title || 'Untitled Announcement',
      content: content || '',
      category: category || 'General',
      author: author || 'Admin',
      created_at: new Date()
    };
    this.announcements.unshift(newItem);
    return newItem;
  }

  // UPDATE (Full - PUT)
  update(id, data) {
    const index = this.announcements.findIndex(a => a.id === parseInt(id));
    if (index === -1) return null;

    const { title, content, category, author } = data;
    this.announcements[index] = {
      ...this.announcements[index],
      title: title || this.announcements[index].title,
      content: content || this.announcements[index].content,
      category: category || this.announcements[index].category,
      author: author || this.announcements[index].author
    };
    return { ...this.announcements[index] };
  }

  // PATCH (Partial)
  patch(id, partialData) {
    const index = this.announcements.findIndex(a => a.id === parseInt(id));
    if (index === -1) return null;

    const allowed = ['title', 'content', 'category', 'author'];
    allowed.forEach(field => {
      if (partialData[field] !== undefined) {
        this.announcements[index][field] = partialData[field];
      }
    });
    return { ...this.announcements[index] };
  }

  // DELETE
  delete(id) {
    const index = this.announcements.findIndex(a => a.id === parseInt(id));
    if (index === -1) return false;
    this.announcements.splice(index, 1);
    return true;
  }
}

module.exports = new AnnouncementModel();
