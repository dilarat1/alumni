/**
 * AlumniFactory
 * Generates realistic mock alumni records using the Factory Design Pattern.
 */
class AlumniFactory {
  static firstNames = ['Dilara', 'Emre', 'Burak', 'Selin', 'Ece', 'Kaan', 'Gizem', 'Onur', 'Buse', 'Tolga', 'Melis', 'Arda'];
  static lastNames = ['Toraman', 'Aydin', 'Yilmaz', 'Kurt', 'Ozkan', 'Polat', 'Tekin', 'Aksoy', 'Guler', 'Simsek'];
  static departments = [
    'Bilgisayar Mühendisliği',
    'Yazılım Mühendisliği',
    'Elektrik-Elektronik Mühendisliği',
    'Endüstri Mühendisliği',
    'Yönetim Bilişim Sistemleri',
    'İşletme',
    'İktisat',
    'Hukuk',
    'Mimarlık'
  ];
  static domains = ['ogr.iu.edu.tr', 'alumni.org', 'gmail.com', 'techcorp.io'];

  static getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a single mock alumni record.
   */
  static createOne(overrides = {}) {
    const firstName = this.getRandomElement(this.firstNames);
    const lastName = this.getRandomElement(this.lastNames);
    const department = this.getRandomElement(this.departments);
    const graduationYear = this.getRandomNumber(2016, 2025);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${this.getRandomNumber(10, 99)}@${this.getRandomElement(this.domains)}`;

    return {
      first_name: firstName,
      last_name: lastName,
      email,
      department,
      graduation_year: graduationYear,
      ...overrides
    };
  }

  /**
   * Generates multiple mock alumni records.
   */
  static createMany(count = 10, overrides = {}) {
    const alumni = [];
    for (let i = 0; i < count; i++) {
      alumni.push(this.createOne(overrides));
    }
    return alumni;
  }
}

module.exports = AlumniFactory;
