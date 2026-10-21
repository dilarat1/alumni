/**
 * ApplicationFactory
 * Generates realistic candidate application records using the Factory Design Pattern.
 */
class ApplicationFactory {
  static candidateNames = [
    { first: 'Dilara', last: 'Toraman' },
    { first: 'Emre', last: 'Yılmaz' },
    { first: 'Ayşe', last: 'Kaya' },
    { first: 'Can', last: 'Demir' },
    { first: 'Zeynep', last: 'Öztürk' },
    { first: 'Burak', last: 'Çelik' },
    { first: 'Selin', last: 'Arslan' },
    { first: 'Mert', last: 'Koç' }
  ];

  static statuses = ['Pending', 'Reviewing', 'Accepted', 'Rejected'];

  static getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generates a single mock application for a job posting.
   */
  static createOne(jobPostingId = 1, overrides = {}) {
    const candidate = this.getRandomElement(this.candidateNames);
    const slug = `${candidate.first.toLowerCase()}.${candidate.last.toLowerCase()}`
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c');
    const applicant_name = `${candidate.first} ${candidate.last}`;
    const applicant_email = `${slug}@example.com`;
    const resume_url = `https://github.com/${slug}`;
    const status = this.getRandomElement(this.statuses);
    const cover_letter = `Dear Hiring Manager, I am writing to express my strong enthusiasm for this position at your organization. Having graduated in Computer Science with practical experience in modern web stacks, I look forward to contributing effectively to your engineering goals.`;

    return {
      job_posting_id: jobPostingId,
      applicant_name,
      applicant_email,
      resume_url,
      cover_letter,
      status,
      ...overrides
    };
  }

  /**
   * Generates multiple mock applications.
   */
  static createMany(count = 5, jobPostingId = 1, overrides = {}) {
    const applications = [];
    for (let i = 0; i < count; i++) {
      applications.push(this.createOne(jobPostingId, overrides));
    }
    return applications;
  }
}

module.exports = ApplicationFactory;
