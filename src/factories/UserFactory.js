/**
 * UserFactory
 * Generates realistic mock user records using the Factory Design Pattern.
 */
class UserFactory {
  static firstNames = ['ahmet', 'mehmet', 'ayse', 'fatma', 'can', 'zeynep', 'burak', 'elif', 'mert', 'selin', 'deniz', 'cem'];
  static lastNames = ['yilmaz', 'kaya', 'demir', 'celik', 'sahin', 'yildiz', 'ozdemir', 'arslan', 'dogan', 'koc'];
  static domains = ['gmail.com', 'alumni.edu.tr', 'yahoo.com', 'outlook.com', 'company.com'];

  static getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a single mock user object.
   */
  static createOne(overrides = {}) {
    const firstName = this.getRandomElement(this.firstNames);
    const lastName = this.getRandomElement(this.lastNames);
    const randomSuffix = this.getRandomNumber(10, 999);
    const username = `${firstName}_${lastName}${randomSuffix}`;
    const email = `${firstName}.${lastName}${randomSuffix}@${this.getRandomElement(this.domains)}`;
    const phone = `555-${this.getRandomNumber(100, 999)}-${this.getRandomNumber(1000, 9999)}`;

    return {
      username,
      email,
      password: 'password123',
      phone,
      ...overrides
    };
  }

  /**
   * Generates multiple mock user objects.
   */
  static createMany(count = 10, overrides = {}) {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(this.createOne(overrides));
    }
    return users;
  }
}

module.exports = UserFactory;
