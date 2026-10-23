/**
 * JobPostingFactory
 * Generates realistic job vacancy records using the Factory Design Pattern.
 */
class JobPostingFactory {
  static positions = [
    { title: 'Senior Backend Engineer (Node.js)', req: '3+ years experience with Node.js, Express, Docker, and MySQL/PostgreSQL.' },
    { title: 'Frontend Developer (React / Next.js)', req: 'Proficiency in TypeScript, React, Next.js, and CSS/Tailwind.' },
    { title: 'Junior Data Analyst', req: 'Experience with SQL, Python (pandas), and BI visualization tools.' },
    { title: 'Software Engineering Intern', req: 'Computer Science or Engineering student/recent graduate. C++ or Node.js knowledge.' },
    { title: 'DevOps & Cloud Infrastructure Specialist', req: 'Hands-on experience with Docker, Kubernetes, AWS/GCP, and CI/CD pipelines.' },
    { title: 'Mobile Application Developer (Flutter)', req: 'Proven track record of publishing Flutter/Dart apps on App Store and Play Store.' },
    { title: 'AI & Machine Learning Engineer', req: 'Strong background in PyTorch/TensorFlow, LLMs, and Python data pipelines.' },
    { title: 'Full Stack JavaScript Engineer', req: 'Full stack proficiency with Node.js, Express, React, and relational database systems.' }
  ];

  static companies = [
    { name: 'Trendyol Group', email: 'careers@trendyol.com' },
    { name: 'Getir Tech', email: 'tech-jobs@getir.com' },
    { name: 'Hepsiburada', email: 'hr@hepsiburada.com' },
    { name: 'Baykar Tech', email: 'intern@baykartech.com' },
    { name: 'Papara', email: 'talent@papara.com' },
    { name: 'Insider', email: 'jobs@useinsider.com' },
    { name: 'Peak Games', email: 'careers@peak.com' },
    { name: 'Garanti BBVA Technology', email: 'ik@garantibbvateknoloji.com.tr' }
  ];

  static locations = [
    'Istanbul (Hybrid)',
    'Istanbul (Remote)',
    'Istanbul (On-site)',
    'Ankara (On-site)',
    'Izmir (Hybrid)',
    'Remote (Turkey)',
    'Remote (Global)'
  ];

  static types = ['Full-time', 'Full-time', 'Full-time', 'Hybrid', 'Remote', 'Internship'];

  static salaries = [
    '₺70,000 - ₺95,000 / month',
    '₺95,000 - ₺130,000 / month',
    '₺130,000 - ₺175,000 / month',
    '₺50,000 - ₺70,000 / month',
    'Competitive Stipend'
  ];

  static getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generates a single mock job posting.
   */
  static createOne(userId = null, overrides = {}) {
    if (typeof userId === 'object' && userId !== null) {
      overrides = userId;
      userId = overrides.user_id || null;
    }
    const pos = this.getRandomElement(this.positions);
    const comp = this.getRandomElement(this.companies);
    const location = this.getRandomElement(this.locations);
    const type = this.getRandomElement(this.types);
    const salary = this.getRandomElement(this.salaries);

    return {
      user_id: userId,
      title: pos.title,
      company: comp.name,
      location,
      type,
      description: `Join ${comp.name} to contribute to our mission-critical engineering initiatives and innovative web products. We offer flexible work arrangements, continuous learning budgets, and an inclusive engineering culture.`,
      requirements: pos.req,
      salary,
      contact_email: comp.email,
      ...overrides
    };
  }

  /**
   * Generates multiple mock job postings.
   */
  static createMany(count = 5, userId = null, overrides = {}) {
    if (typeof userId === 'object' && userId !== null) {
      overrides = userId;
      userId = overrides.user_id || null;
    }
    const postings = [];
    for (let i = 0; i < count; i++) {
      postings.push(this.createOne(userId, overrides));
    }
    return postings;
  }
}

module.exports = JobPostingFactory;
