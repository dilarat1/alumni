/**
 * AnnouncementFactory
 * Generates realistic mock announcements using the Factory Design Pattern.
 */
class AnnouncementFactory {
  static titles = [
    'Annual Alumni Networking Dinner',
    'Spring Tech Career Fair 2026',
    'Startup Pitch Day & Mentorship Sessions',
    'Alumni Association Sports Tournament',
    'Guest Speaker: AI and the Future of Engineering',
    'Global Graduate Scholarship Applications Open',
    'Winter Coding Bootcamp for Fresh Graduates',
    'Campus Library Digital Archive Access for Alumni'
  ];

  static categories = ['Event', 'Career', 'Mentorship', 'General'];
  static authors = ['Rectorate', 'Alumni Relations Office', 'Career Development Center', 'Engineering Faculty Dean'];

  static getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a single mock announcement.
   */
  static createOne(overrides = {}) {
    const title = this.getRandomElement(this.titles);
    const category = this.getRandomElement(this.categories);
    const author = this.getRandomElement(this.authors);
    const content = `We cordially invite all alumni and university community members to participate in the ${title}. Detailed schedule and RSVP forms are available on the portal.`;

    return {
      title,
      content,
      category,
      author,
      ...overrides
    };
  }

  /**
   * Generates multiple mock announcements.
   */
  static createMany(count = 5, overrides = {}) {
    const announcements = [];
    for (let i = 0; i < count; i++) {
      announcements.push(this.createOne(overrides));
    }
    return announcements;
  }
}

module.exports = AnnouncementFactory;
